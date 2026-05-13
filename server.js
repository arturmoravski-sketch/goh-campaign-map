import { createReadStream, existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize, resolve } from "node:path";

const port = Number(process.env.PORT || 4174);
const rootDir = resolve(".");
const distDir = join(rootDir, "dist");
const savePath = join(rootDir, "campaign-save.json");
const clients = new Set();

let campaignState = await loadSavedState();

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);

    if (req.method === "GET" && url.pathname === "/api/health") {
      return sendJson(res, 200, { ok: true, hasState: Boolean(campaignState) });
    }

    if (req.method === "GET" && url.pathname === "/api/state") {
      return handleState(req, res, url);
    }

    if (req.method === "GET" && url.pathname === "/api/events") {
      return handleEvents(req, res, url);
    }

    if (req.method === "POST" && url.pathname === "/api/init") {
      return handleInit(req, res);
    }

    if (req.method === "POST" && url.pathname === "/api/action") {
      return handleAction(req, res);
    }

    if (req.method === "OPTIONS") {
      res.writeHead(204, corsHeaders());
      return res.end();
    }

    return serveStatic(url.pathname, res);
  } catch (error) {
    console.error(error);
    return sendJson(res, 500, { ok: false, error: "server_error" });
  }
});

server.listen(port, "0.0.0.0", () => {
  console.log(`GOH campaign server: http://0.0.0.0:${port}`);
});

async function loadSavedState() {
  try {
    const raw = await readFile(savePath, "utf8");
    return normalizeState(JSON.parse(raw));
  } catch {
    return null;
  }
}

async function saveState() {
  if (!campaignState) return;
  await mkdir(rootDir, { recursive: true });
  await writeFile(savePath, JSON.stringify(campaignState, null, 2), "utf8");
}

async function handleState(req, res, url) {
  if (!campaignState) return sendJson(res, 404, { ok: false, error: "campaign_not_initialized" });
  const side = normalizeSide(url.searchParams.get("side"));
  return sendJson(res, 200, { ok: true, state: filterStateForSide(campaignState, side) });
}

function handleEvents(req, res, url) {
  const side = normalizeSide(url.searchParams.get("side"));
  res.writeHead(200, {
    ...corsHeaders(),
    "Content-Type": "text/event-stream; charset=utf-8",
    "Cache-Control": "no-cache, no-transform",
    Connection: "keep-alive",
  });
  const client = { res, side };
  clients.add(client);
  sendEvent(client);
  req.on("close", () => clients.delete(client));
}

async function handleInit(req, res) {
  const body = await readJson(req);
  if (!campaignState || body.force) {
    campaignState = normalizeState(body.state);
    await saveState();
    broadcastState();
  }
  return sendJson(res, 200, { ok: true });
}

async function handleAction(req, res) {
  if (!campaignState) return sendJson(res, 409, { ok: false, error: "campaign_not_initialized" });
  const body = await readJson(req);
  const side = normalizeSide(body.side);
  const payload = body.payload || {};

  switch (body.type) {
    case "setTurn":
      campaignState.turn = Math.max(1, Number(payload.turn) || campaignState.turn || 1);
      break;
    case "updateProvince":
      campaignState.provinces = campaignState.provinces.map((province) => (
        province.id === payload.id ? { ...province, ...(payload.patch || {}) } : province
      ));
      break;
    case "updateArmy":
      campaignState.armies = campaignState.armies.map((army) => (
        army.id === payload.id && army.side === side ? { ...army, ...(payload.patch || {}) } : army
      ));
      break;
    case "setUnitRows":
      campaignState.unitRows = [
        ...campaignState.unitRows.filter((row) => row.side !== side),
        ...(Array.isArray(payload.unitRows) ? payload.unitRows.map((row) => ({ ...row, side })) : []),
      ];
      break;
    case "clearBattleLog":
      campaignState.battleLog = [];
      break;
    case "reset":
      campaignState = normalizeState(payload.state);
      break;
    case "addBattle":
      addBattleOnServer(payload.battleForm || {}, side);
      break;
    default:
      return sendJson(res, 400, { ok: false, error: "unknown_action" });
  }

  campaignState.updatedAt = new Date().toISOString();
  await saveState();
  broadcastState();
  return sendJson(res, 200, { ok: true });
}

function addBattleOnServer(battleForm, side) {
  const attacker = campaignState.armies.find((army) => army.id === battleForm.attacker);
  const defender = campaignState.armies.find((army) => army.id === battleForm.defender);
  const province = campaignState.provinces.find((item) => item.id === battleForm.province);
  if (!attacker || !defender || !province) return;

  const crisisRules = getCampaignCrisisRules(campaignState.turn || 1);
  const battleArmies = [attacker, defender];
  const sovietArmy = battleArmies.find((army) => army.side === "ussr");
  const germanArmy = battleArmies.find((army) => army.side === "germany");
  const sovietBudget = sovietArmy
    ? (crisisRules.ussrBudgetCap ? Math.min(calcBudget(sovietArmy.strength), crisisRules.ussrBudgetCap) : calcBudget(sovietArmy.strength))
    : null;
  const germanBudget = germanArmy ? calcBudget(germanArmy.strength) : null;
  const campaignNotes = [
    `Кризис: ${crisisRules.phase}`,
    sovietBudget ? `СССР: ${getModPresetForBudget(sovietBudget)}` : null,
    germanBudget ? `Германия: ${getModPresetForBudget(germanBudget)}` : null,
    battleForm.encircled ? "Окружение: советская группа получает +1 потерю силы при поражении." : null,
    battleForm.blitzAdvance && battleForm.winner === "germany" ? "Блицкриг: Германия может занять 1 пустую соседнюю провинцию." : null,
  ].filter(Boolean);

  campaignState.battleLog = [{
    id: Date.now(),
    turn: campaignState.turn || 1,
    province: province.name,
    attacker: battleForm.attacker,
    defender: battleForm.defender,
    winner: battleForm.winner,
    losses: battleForm.losses,
    note: battleForm.note || "",
    budget: `${getModPresetForBudget(sovietBudget)} / ${getModPresetForBudget(germanBudget)}`,
    crisisPhase: crisisRules.phase,
    campaignNotes,
    submittedBy: side,
  }, ...campaignState.battleLog];

  campaignState.provinces = campaignState.provinces.map((item) => (
    item.id === province.id ? { ...item, owner: battleForm.winner } : item
  ));

  const loserId = battleForm.winner === "germany" ? battleForm.defender : battleForm.attacker;
  campaignState.armies = campaignState.armies.map((army) => {
    if (army.id !== loserId) return army;
    const normalLoss = { "тяжёлые": 1, "разгром": 2 }[battleForm.losses] || 0;
    const encirclementLoss = battleForm.encircled && army.side === "ussr" ? 1 : 0;
    const strengthLoss = normalLoss + encirclementLoss;
    if (strengthLoss <= 0) return army;
    return { ...army, strength: Math.max(1, army.strength - strengthLoss) };
  });
}

function filterStateForSide(state, side) {
  const ownProvinceIds = state.armies.filter((army) => army.side === side).map((army) => army.province);
  const reconProvinceIds = new Set(ownProvinceIds);
  ownProvinceIds.forEach((provinceId) => getNeighbors(provinceId, state.links).forEach((neighborId) => reconProvinceIds.add(neighborId)));

  return {
    ...state,
    armies: state.armies
      .filter((army) => army.side === side || reconProvinceIds.has(army.province))
      .map((army) => {
        if (army.side === side) return army;
        return {
          id: army.id,
          side: army.side,
          province: army.province,
          name: "Контакт",
          strength: null,
          hidden: true,
        };
      }),
    unitRows: state.unitRows.filter((row) => row.side === side),
    playerSide: side,
    serverFiltered: true,
  };
}

function normalizeState(state = {}) {
  return {
    provinces: Array.isArray(state.provinces) ? state.provinces : [],
    links: Array.isArray(state.links) ? state.links : [],
    armies: Array.isArray(state.armies) ? state.armies : [],
    battleLog: Array.isArray(state.battleLog) ? state.battleLog : [],
    unitRows: Array.isArray(state.unitRows) ? state.unitRows : [],
    turn: Math.max(1, Number(state.turn) || 1),
    updatedAt: state.updatedAt || new Date().toISOString(),
  };
}

function getNeighbors(provinceId, allLinks = []) {
  const result = new Set();
  allLinks.forEach(([a, b]) => {
    if (a === provinceId) result.add(b);
    if (b === provinceId) result.add(a);
  });
  return [...result];
}

function calcBudget(strength) {
  return { 1: 3500, 2: 5000, 3: 7000, 4: 9000, 5: 11000 }[Number(strength)] || 3500;
}

function getModPresetForBudget(budget) {
  if (!budget) return "Без лимита";
  if (budget <= 2500) return "GOH 2500 ЛС";
  if (budget <= 3500) return "GOH 3500 ЛС";
  if (budget <= 5000) return "GOH 5000 ЛС";
  if (budget <= 7000) return "GOH 7000 ЛС";
  if (budget <= 9000) return "GOH 9000 ЛС";
  return "GOH 11000 ЛС";
}

function getCampaignCrisisRules(turn) {
  if (turn <= 2) return { phase: "Шок начала войны", ussrBudgetCap: 3500 };
  if (turn <= 4) return { phase: "Восстановление управления", ussrBudgetCap: 5000 };
  return { phase: "Стабилизация фронта", ussrBudgetCap: null };
}

async function readJson(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
}

function broadcastState() {
  clients.forEach(sendEvent);
}

function sendEvent(client) {
  if (!campaignState) {
    client.res.write("event: waiting\ndata: {}\n\n");
    return;
  }
  client.res.write(`data: ${JSON.stringify({ state: filterStateForSide(campaignState, client.side) })}\n\n`);
}

function sendJson(res, status, data) {
  res.writeHead(status, { ...corsHeaders(), "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(data));
}

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

function normalizeSide(side) {
  return side === "ussr" ? "ussr" : "germany";
}

function serveStatic(pathname, res) {
  let filePath = pathname === "/" ? join(distDir, "index.html") : join(distDir, pathname);
  filePath = normalize(filePath);

  if (!filePath.startsWith(distDir)) {
    res.writeHead(403);
    return res.end("Forbidden");
  }

  if (!existsSync(filePath)) {
    filePath = join(distDir, "index.html");
  }

  if (!existsSync(filePath)) {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    return res.end("Сначала выполните npm run build, потом npm run network.");
  }

  res.writeHead(200, { "Content-Type": mimeTypes[extname(filePath)] || "application/octet-stream" });
  createReadStream(filePath).pipe(res);
}
