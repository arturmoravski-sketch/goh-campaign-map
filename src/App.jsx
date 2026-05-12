import React, { useMemo, useState } from "react";

const initialProvinces = [
  { id: "east_prussia", name: "Восточная Пруссия", sector: "Север", type: "база", owner: "germany", x: 7, y: 18, points: 0, bonus: "База Германии" },
  { id: "baltics", name: "Прибалтика", sector: "Север", type: "лес/города", owner: "ussr", x: 22, y: 13, points: 1, bonus: "Северное направление" },
  { id: "pskov", name: "Псков", sector: "Север", type: "город", owner: "ussr", x: 37, y: 12, points: 1, bonus: "Узел дорог" },
  { id: "luga", name: "Луга", sector: "Север", type: "лес/укрепления", owner: "ussr", x: 51, y: 10, points: 1, bonus: "+500 обороне" },
  { id: "leningrad", name: "Ленинград", sector: "Север", type: "крупный город", owner: "ussr", x: 66, y: 8, points: 4, bonus: "Ключевая точка" },
  { id: "karelia", name: "Карелия", sector: "Север", type: "лес/озёра", owner: "ussr", x: 78, y: 4, points: 1, bonus: "Трудная местность" },

  { id: "brest", name: "Брест", sector: "Центр", type: "крепость", owner: "germany", x: 9, y: 42, points: 1, bonus: "+500 обороне" },
  { id: "bialystok", name: "Белосток", sector: "Центр", type: "поле/узел", owner: "germany", x: 18, y: 32, points: 1, bonus: "Дорожный узел" },
  { id: "minsk", name: "Минск", sector: "Центр", type: "крупный город", owner: "ussr", x: 31, y: 35, points: 1, bonus: "+300 снабжение" },
  { id: "vitebsk", name: "Витебск", sector: "Центр", type: "город/лес", owner: "ussr", x: 44, y: 29, points: 1, bonus: "Переход к Смоленску" },
  { id: "smolensk", name: "Смоленск", sector: "Центр", type: "город/узел", owner: "ussr", x: 58, y: 32, points: 2, bonus: "Быстрое движение" },
  { id: "rzhev", name: "Ржев", sector: "Центр", type: "укрепрайон", owner: "ussr", x: 69, y: 25, points: 1, bonus: "+500 обороне" },
  { id: "kalinin", name: "Калинин", sector: "Центр", type: "город", owner: "ussr", x: 78, y: 24, points: 1, bonus: "Подступ к Москве" },
  { id: "moscow", name: "Москва", sector: "Центр", type: "столица", owner: "ussr", x: 82, y: 38, points: 5, bonus: "Главная цель" },
  { id: "mogilev", name: "Могилёв", sector: "Центр", type: "город", owner: "ussr", x: 43, y: 43, points: 1, bonus: "Оборонительная линия" },
  { id: "gomel", name: "Гомель", sector: "Центр", type: "лес/река", owner: "ussr", x: 49, y: 55, points: 1, bonus: "Связь центр-юг" },
  { id: "bryansk", name: "Брянск", sector: "Центр", type: "лес/укрепрайон", owner: "ussr", x: 64, y: 52, points: 1, bonus: "Лесная оборона" },
  { id: "orel", name: "Орёл", sector: "Центр", type: "поле/город", owner: "ussr", x: 76, y: 56, points: 1, bonus: "Южный подступ" },

  { id: "lviv", name: "Львов", sector: "Юг", type: "город", owner: "germany", x: 8, y: 66, points: 1, bonus: "База Германии" },
  { id: "ternopil", name: "Тернополь", sector: "Юг", type: "поле/город", owner: "ussr", x: 19, y: 69, points: 1, bonus: "Западная Украина" },
  { id: "zhytomyr", name: "Житомир", sector: "Юг", type: "лес/поле", owner: "ussr", x: 31, y: 64, points: 1, bonus: "Путь на Киев" },
  { id: "kyiv", name: "Киев", sector: "Юг", type: "крупный город/река", owner: "ussr", x: 43, y: 66, points: 3, bonus: "+500 обороне" },
  { id: "cherkasy", name: "Черкассы", sector: "Юг", type: "река/переправа", owner: "ussr", x: 53, y: 74, points: 1, bonus: "Переправа" },
  { id: "poltava", name: "Полтава", sector: "Юг", type: "поле", owner: "ussr", x: 66, y: 72, points: 1, bonus: "Открытый бой" },
  { id: "kharkiv", name: "Харьков", sector: "Юг", type: "большой город", owner: "ussr", x: 78, y: 70, points: 2, bonus: "+300 промышленность" },
  { id: "dnipro", name: "Днепропетровск", sector: "Юг", type: "промышленный город/река", owner: "ussr", x: 63, y: 84, points: 1, bonus: "+300 промышленность" },
  { id: "zaporizhzhia", name: "Запорожье", sector: "Юг", type: "река/индустрия", owner: "ussr", x: 73, y: 88, points: 1, bonus: "Днепр" },
  { id: "odessa", name: "Одесса", sector: "Юг", type: "порт/город", owner: "ussr", x: 30, y: 91, points: 1, bonus: "+300 порт" },
  { id: "crimea", name: "Крым", sector: "Юг", type: "полуостров/укрепрайон", owner: "ussr", x: 58, y: 96, points: 2, bonus: "+500 обороне" },
  { id: "rostov", name: "Ростов", sector: "Юг", type: "город/ворота на Кавказ", owner: "ussr", x: 88, y: 88, points: 2, bonus: "Стратегическая точка" },
];

const links = [
  ["east_prussia", "baltics"], ["east_prussia", "bialystok"],
  ["baltics", "pskov"], ["baltics", "vitebsk"], ["baltics", "bialystok"],
  ["pskov", "luga"], ["pskov", "vitebsk"],
  ["luga", "leningrad"], ["luga", "kalinin"],
  ["leningrad", "karelia"],

  ["brest", "bialystok"], ["brest", "minsk"], ["brest", "lviv"],
  ["bialystok", "minsk"],
  ["minsk", "vitebsk"], ["minsk", "mogilev"], ["minsk", "zhytomyr"],
  ["vitebsk", "smolensk"], ["vitebsk", "mogilev"],
  ["smolensk", "mogilev"], ["smolensk", "rzhev"], ["smolensk", "bryansk"], ["smolensk", "moscow"],
  ["rzhev", "kalinin"], ["rzhev", "moscow"],
  ["kalinin", "moscow"],
  ["moscow", "bryansk"], ["moscow", "orel"],
  ["mogilev", "gomel"],
  ["gomel", "bryansk"], ["gomel", "kyiv"], ["gomel", "cherkasy"],
  ["bryansk", "orel"],
  ["orel", "poltava"], ["orel", "kharkiv"],

  ["lviv", "ternopil"], ["lviv", "zhytomyr"],
  ["ternopil", "zhytomyr"], ["ternopil", "odessa"],
  ["zhytomyr", "kyiv"],
  ["kyiv", "cherkasy"], ["kyiv", "poltava"],
  ["cherkasy", "poltava"], ["cherkasy", "dnipro"],
  ["poltava", "kharkiv"], ["poltava", "dnipro"],
  ["kharkiv", "dnipro"], ["kharkiv", "rostov"],
  ["dnipro", "zaporizhzhia"], ["dnipro", "crimea"],
  ["zaporizhzhia", "crimea"], ["zaporizhzhia", "rostov"], ["zaporizhzhia", "odessa"],
  ["odessa", "crimea"],
];

const initialArmies = [
  { id: "G1", name: "Группа Север", side: "germany", province: "east_prussia", strength: 2 },
  { id: "G2", name: "Группа Центр", side: "germany", province: "brest", strength: 3 },
  { id: "G3", name: "Группа Юг", side: "germany", province: "lviv", strength: 2 },
  { id: "GR", name: "Резерв", side: "germany", province: "bialystok", strength: 1 },
  { id: "S1", name: "Северный фронт", side: "ussr", province: "pskov", strength: 2 },
  { id: "S2", name: "Западный фронт", side: "ussr", province: "minsk", strength: 3 },
  { id: "S3", name: "Юго-Западный фронт", side: "ussr", province: "kyiv", strength: 2 },
  { id: "SR", name: "Резерв Ставки", side: "ussr", province: "moscow", strength: 1 },
];

const ownerConfig = {
  germany: { label: "Германия", dot: "bg-zinc-800", text: "text-zinc-950", fill: "bg-zinc-300", border: "border-zinc-700", marker: "bg-zinc-900 text-white" },
  ussr: { label: "СССР", dot: "bg-red-700", text: "text-red-950", fill: "bg-red-200", border: "border-red-700", marker: "bg-red-700 text-white" },
  neutral: { label: "Нейтрально", dot: "bg-slate-400", text: "text-slate-700", fill: "bg-slate-100", border: "border-slate-300", marker: "bg-slate-500 text-white" },
};

const mapImageUrl = "/maps/eastern-front-1941.jpg";

const mapCoordinates = {
  east_prussia: { x: 24, y: 42 },
  baltics: { x: 36, y: 30 },
  pskov: { x: 48, y: 38 },
  luga: { x: 57, y: 26 },
  leningrad: { x: 59, y: 20 },
  karelia: { x: 64, y: 10 },
  brest: { x: 29, y: 51 },
  bialystok: { x: 31, y: 44 },
  minsk: { x: 44, y: 45 },
  vitebsk: { x: 56, y: 39 },
  smolensk: { x: 68, y: 42 },
  rzhev: { x: 70, y: 31 },
  kalinin: { x: 80, y: 30 },
  moscow: { x: 86, y: 36 },
  mogilev: { x: 52, y: 48 },
  gomel: { x: 58, y: 53 },
  bryansk: { x: 76, y: 51 },
  orel: { x: 82, y: 49 },
  lviv: { x: 34, y: 65 },
  ternopil: { x: 40, y: 67 },
  zhytomyr: { x: 49, y: 61 },
  kyiv: { x: 60, y: 61 },
  cherkasy: { x: 59, y: 67 },
  poltava: { x: 73, y: 65 },
  kharkiv: { x: 82, y: 63 },
  dnipro: { x: 80, y: 73 },
  zaporizhzhia: { x: 81, y: 77 },
  odessa: { x: 61, y: 84 },
  crimea: { x: 74, y: 89 },
  rostov: { x: 91, y: 77 },
};

function applyMapCoordinates(provinceList) {
  return provinceList.map((province) => ({
    ...province,
    ...(mapCoordinates[province.id] || {}),
  }));
}

const campaignStartProvinces = applyMapCoordinates(initialProvinces);

function calcBudget(strength) {
  return { 1: 3500, 2: 5000, 3: 7000, 4: 9000 }[Number(strength)] || 3500;
}

const unitCategories = ["Пехота", "Поддержка", "ПТО", "Броня", "Артиллерия", "Снабжение", "Другое"];

const initialUnitRows = [
  { id: "unit-g-1", side: "germany", category: "Пехота", name: "Пехотное отделение", cost: 0, count: 1 },
  { id: "unit-g-2", side: "germany", category: "ПТО", name: "Pak / ПТО", cost: 0, count: 1 },
  { id: "unit-s-1", side: "ussr", category: "Пехота", name: "Стрелковое отделение", cost: 0, count: 1 },
  { id: "unit-s-2", side: "ussr", category: "Броня", name: "Танк / САУ", cost: 0, count: 1 },
];

function getNeighbors(provinceId, allLinks = links) {
  const result = new Set();
  allLinks.forEach(([a, b]) => {
    if (a === provinceId) result.add(b);
    if (b === provinceId) result.add(a);
  });
  return [...result];
}

function calculateVictoryPoints(provinceList) {
  return provinceList.reduce((acc, p) => {
    acc[p.owner] = (acc[p.owner] || 0) + (p.points || 0);
    return acc;
  }, { germany: 0, ussr: 0, neutral: 0 });
}

function runSelfTests() {
  const provinceIds = new Set(initialProvinces.map((p) => p.id));
  const armyIds = new Set(initialArmies.map((a) => a.id));
  const errors = [];

  if (initialProvinces.length !== 30) errors.push(`Ожидалось 30 провинций, получено ${initialProvinces.length}`);
  if (calcBudget(1) !== 3500) errors.push("calcBudget(1) должен быть 3500");
  if (calcBudget(4) !== 9000) errors.push("calcBudget(4) должен быть 9000");
  if (!getNeighbors("minsk").includes("brest")) errors.push("Минск должен быть связан с Брестом");
  if (!getNeighbors("minsk").includes("vitebsk")) errors.push("Минск должен быть связан с Витебском");

  links.forEach(([a, b]) => {
    if (!provinceIds.has(a)) errors.push(`Связь содержит неизвестную провинцию: ${a}`);
    if (!provinceIds.has(b)) errors.push(`Связь содержит неизвестную провинцию: ${b}`);
  });

  initialArmies.forEach((army) => {
    if (!provinceIds.has(army.province)) errors.push(`Армия ${army.id} стоит в неизвестной провинции ${army.province}`);
    if (!armyIds.has(army.id)) errors.push(`Неизвестная армия: ${army.id}`);
    if (![1, 2, 3, 4].includes(army.strength)) errors.push(`У армии ${army.id} неправильная сила: ${army.strength}`);
  });

  const vp = calculateVictoryPoints(initialProvinces);
  if (vp.ussr <= vp.germany) errors.push("На старте СССР должен иметь больше победных очков, потому что контролирует большую часть карты");

  return { ok: errors.length === 0, errors };
}

const testResult = runSelfTests();
if (!testResult.ok) {
  console.warn("GOH Campaign Map self-tests failed:", testResult.errors);
}

function Icon({ children }) {
  return <span className="inline-flex h-5 w-5 items-center justify-center text-base leading-none">{children}</span>;
}

function Panel({ children, className = "" }) {
  return <div className={`rounded-3xl border border-stone-300 bg-white shadow-sm ${className}`}>{children}</div>;
}

function PanelBody({ children, className = "" }) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}

function AppButton({ children, onClick, variant = "solid", className = "", type = "button" }) {
  const variants = {
    solid: "bg-stone-900 text-white hover:bg-stone-800 border-stone-900",
    outline: "bg-white text-stone-900 hover:bg-stone-100 border-stone-300",
    danger: "bg-red-700 text-white hover:bg-red-800 border-red-700",
  };
  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-2xl border px-3 py-2 text-sm font-semibold transition ${variants[variant] || variants.solid} ${className}`}
    >
      {children}
    </button>
  );
}

export default function GOHCampaignMap() {
  const [provinces, setProvinces] = useState(campaignStartProvinces);
  const [armies, setArmies] = useState(initialArmies);
  const [selectedProvinceId, setSelectedProvinceId] = useState("minsk");
  const [turn, setTurn] = useState(1);
  const [battleLog, setBattleLog] = useState([]);
  const [battleForm, setBattleForm] = useState({ province: "minsk", attacker: "G2", defender: "S2", winner: "germany", losses: "средние", note: "" });
  const [unitCalculator, setUnitCalculator] = useState({ side: "germany", strength: 3 });
  const [unitRows, setUnitRows] = useState(initialUnitRows);
  const [message, setMessage] = useState("");

  const byId = useMemo(() => Object.fromEntries(provinces.map((p) => [p.id, p])), [provinces]);
  const selectedProvince = byId[selectedProvinceId] || provinces[0];
  const provinceArmies = armies.filter((a) => a.province === selectedProvince?.id);
  const connectedIds = useMemo(() => getNeighbors(selectedProvinceId), [selectedProvinceId]);
  const victoryPoints = useMemo(() => calculateVictoryPoints(provinces), [provinces]);
  const calculatorRows = useMemo(() => unitRows.filter((row) => row.side === unitCalculator.side), [unitRows, unitCalculator.side]);
  const calculatorBudget = calcBudget(unitCalculator.strength);
  const calculatorTotal = useMemo(
    () => calculatorRows.reduce((sum, row) => sum + (Number(row.cost) || 0) * (Number(row.count) || 0), 0),
    [calculatorRows],
  );
  const calculatorRemaining = calculatorBudget - calculatorTotal;

  function updateProvince(id, patch) {
    setProvinces((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  }

  function updateArmy(id, patch) {
    setArmies((prev) => prev.map((a) => (a.id === id ? { ...a, ...patch } : a)));
  }

  function updateUnitRow(id, patch) {
    setUnitRows((prev) => prev.map((row) => (row.id === id ? { ...row, ...patch } : row)));
  }

  function addUnitRow() {
    setUnitRows((prev) => [
      ...prev,
      { id: `unit-${Date.now()}`, side: unitCalculator.side, category: "Пехота", name: "", cost: 0, count: 1 },
    ]);
  }

  function removeUnitRow(id) {
    setUnitRows((prev) => prev.filter((row) => row.id !== id));
  }

  function clearUnitRowsForSide() {
    setUnitRows((prev) => prev.filter((row) => row.side !== unitCalculator.side));
  }

  function resetCampaign() {
    setProvinces(campaignStartProvinces);
    setArmies(initialArmies);
    setBattleLog([]);
    setUnitRows(initialUnitRows);
    setTurn(1);
    setSelectedProvinceId("minsk");
    setBattleForm({ province: "minsk", attacker: "G2", defender: "S2", winner: "germany", losses: "средние", note: "" });
    setMessage("Кампания сброшена.");
  }

  function saveCampaign() {
    try {
      const data = { provinces, armies, battleLog, turn, unitRows };
      window.localStorage.setItem("goh_campaign_save_v02", JSON.stringify(data));
      setMessage("Кампания сохранена в браузере.");
    } catch (error) {
      setMessage("Не удалось сохранить кампанию. Возможно, браузер запретил localStorage.");
    }
  }

  function loadCampaign() {
    try {
      const raw = window.localStorage.getItem("goh_campaign_save_v02") || window.localStorage.getItem("goh_campaign_save_v01");
      if (!raw) {
        setMessage("Сохранение не найдено.");
        return;
      }
      const data = JSON.parse(raw);
      setProvinces(Array.isArray(data.provinces) ? applyMapCoordinates(data.provinces) : campaignStartProvinces);
      setArmies(Array.isArray(data.armies) ? data.armies : initialArmies);
      setBattleLog(Array.isArray(data.battleLog) ? data.battleLog : []);
      setUnitRows(Array.isArray(data.unitRows) ? data.unitRows : initialUnitRows);
      setTurn(Number(data.turn) || 1);
      setMessage("Кампания загружена.");
    } catch (error) {
      setMessage("Не удалось загрузить сохранение.");
    }
  }

  function addBattle() {
    const attacker = armies.find((a) => a.id === battleForm.attacker);
    const defender = armies.find((a) => a.id === battleForm.defender);
    const province = byId[battleForm.province];

    if (!province || !attacker || !defender) {
      setMessage("Проверь провинцию, атакующего и обороняющегося.");
      return;
    }

    const entry = {
      id: Date.now(),
      turn,
      province: province.name,
      attacker: battleForm.attacker,
      defender: battleForm.defender,
      winner: battleForm.winner,
      losses: battleForm.losses,
      note: battleForm.note,
      budget: `${calcBudget(attacker.strength)} / ${calcBudget(defender.strength)}`,
    };

    setBattleLog((prev) => [entry, ...prev]);
    updateProvince(province.id, { owner: battleForm.winner });

    const loserId = battleForm.winner === "germany" ? battleForm.defender : battleForm.attacker;
    const loser = armies.find((a) => a.id === loserId);
    if (loser && ["тяжёлые", "разгром"].includes(battleForm.losses)) {
      updateArmy(loser.id, { strength: Math.max(1, loser.strength - (battleForm.losses === "разгром" ? 2 : 1)) });
    }

    setBattleForm((prev) => ({ ...prev, note: "" }));
    setMessage("Бой записан. Контроль провинции обновлён.");
  }

  function moveArmy(armyId, provinceId) {
    updateArmy(armyId, { province: provinceId });
    setSelectedProvinceId(provinceId);
  }

  return (
    <div className="min-h-screen bg-stone-100 p-4 text-stone-950 md:p-6">
      <div className="mx-auto max-w-7xl space-y-4">
        <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight md:text-4xl"><Icon>🗺️</Icon> Gates of Hell — оперативная карта</h1>
            <p className="mt-1 text-stone-600">Карта кампании вне игры: двигайте армии, меняйте контроль провинций и записывайте результаты боёв.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <AppButton onClick={() => setTurn((t) => t + 1)}>Ход {turn} →</AppButton>
            <AppButton onClick={saveCampaign} variant="outline"><Icon>💾</Icon>Сохранить</AppButton>
            <AppButton onClick={loadCampaign} variant="outline">Загрузить</AppButton>
            <AppButton onClick={resetCampaign} variant="outline"><Icon>↩️</Icon>Сброс</AppButton>
          </div>
        </header>

        {message && <div className="rounded-2xl border border-amber-300 bg-amber-50 px-4 py-2 text-sm text-amber-900">{message}</div>}
        {!testResult.ok && (
          <div className="rounded-2xl border border-red-300 bg-red-50 px-4 py-2 text-sm text-red-900">
            Ошибка внутренних тестов: {testResult.errors.join("; ")}
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,820px)_390px] xl:items-start">
          <Panel className="overflow-hidden">
            <PanelBody className="p-3 md:p-5">
              <div className="relative mx-auto aspect-[1240/1645] w-full max-w-[720px] overflow-hidden rounded-2xl border border-stone-400 bg-stone-200 shadow-inner">
                <img src={mapImageUrl} alt="" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-stone-50/10" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,.16)_1px,transparent_0)] bg-[length:22px_22px] opacity-15" />
                <svg className="pointer-events-none absolute inset-0 z-10 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {links.map(([a, b]) => {
                    const pa = byId[a];
                    const pb = byId[b];
                    if (!pa || !pb) return null;
                    const active = a === selectedProvinceId || b === selectedProvinceId;
                    return <line key={`${a}-${b}`} x1={pa.x} y1={pa.y} x2={pb.x} y2={pb.y} stroke={active ? "rgba(20,20,20,.8)" : "rgba(45,40,35,.42)"} strokeWidth={active ? 0.45 : 0.28} strokeDasharray={active ? "" : "1 1"} />;
                  })}
                </svg>

                {provinces.map((p) => {
                  const isSelected = p.id === selectedProvinceId;
                  const armiesHere = armies.filter((a) => a.province === p.id);
                  const cfg = ownerConfig[p.owner] || ownerConfig.neutral;
                  return (
                    <button
                      key={p.id}
                      onClick={() => {
                        setSelectedProvinceId(p.id);
                        setBattleForm((bf) => ({ ...bf, province: p.id }));
                      }}
                      className={`absolute min-w-[72px] max-w-[118px] -translate-x-1/2 -translate-y-1/2 rounded-lg border-2 bg-opacity-90 px-1.5 py-1 text-left shadow-md backdrop-blur-[1px] transition hover:z-30 hover:scale-110 ${cfg.fill} ${cfg.border} ${isSelected ? "z-30 ring-2 ring-amber-400" : "z-20"}`}
                      style={{ left: `${p.x}%`, top: `${p.y}%` }}
                    >
                      <div className="flex items-center gap-1">
                        <span className={`h-2.5 w-2.5 rounded-full ${cfg.dot}`} />
                        <span className="text-[10px] font-bold leading-tight">{p.name}</span>
                      </div>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {armiesHere.map((a) => (
                          <span key={a.id} className={`rounded-full px-1.5 py-0.5 text-[9px] font-black ${a.side === "germany" ? ownerConfig.germany.marker : ownerConfig.ussr.marker}`}>{a.id}:{a.strength}</span>
                        ))}
                      </div>
                    </button>
                  );
                })}

                <div className="absolute bottom-3 left-3 z-40 flex max-w-[calc(100%-1.5rem)] flex-wrap gap-2 rounded-xl border bg-white/90 p-2 text-xs shadow-sm backdrop-blur">
                  <span className="flex items-center gap-1"><span className="h-3 w-3 rounded-full bg-red-700" /> СССР</span>
                  <span className="flex items-center gap-1"><span className="h-3 w-3 rounded-full bg-zinc-800" /> Германия</span>
                  <span className="flex items-center gap-1"><Icon>⚑</Icon> число = сила группы</span>
                </div>
              </div>
            </PanelBody>
          </Panel>

          <div className="space-y-4">
            <Panel>
              <PanelBody className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h2 className="text-xl font-bold">{selectedProvince.name}</h2>
                    <p className="text-sm text-stone-600">{selectedProvince.sector} · {selectedProvince.type}</p>
                  </div>
                  <span className={`rounded-full px-2 py-1 text-xs font-bold ${ownerConfig[selectedProvince.owner].fill} ${ownerConfig[selectedProvince.owner].text}`}>{ownerConfig[selectedProvince.owner].label}</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(ownerConfig).map(([key, cfg]) => (
                    <AppButton key={key} variant={selectedProvince.owner === key ? "solid" : "outline"} className="px-2 py-1 text-xs" onClick={() => updateProvince(selectedProvince.id, { owner: key })}>{cfg.label}</AppButton>
                  ))}
                </div>
                <div className="rounded-2xl border bg-stone-50 p-3 text-sm">
                  <div><b>Бонус:</b> {selectedProvince.bonus}</div>
                  <div><b>Победные очки:</b> {selectedProvince.points}</div>
                  <div><b>Соседи:</b> {connectedIds.map((id) => byId[id]?.name).filter(Boolean).join(", ") || "нет"}</div>
                </div>
              </PanelBody>
            </Panel>

            <Panel>
              <PanelBody className="space-y-3">
                <h3 className="flex items-center gap-2 font-bold"><Icon>🛡️</Icon> Армии в провинции</h3>
                {provinceArmies.length === 0 && <p className="text-sm text-stone-500">В этой провинции нет армий.</p>}
                {provinceArmies.map((a) => (
                  <div key={a.id} className="space-y-2 rounded-2xl border bg-white p-3">
                    <div className="flex items-center justify-between">
                      <b className={a.side === "germany" ? "text-zinc-900" : "text-red-800"}>{a.id} — {a.name}</b>
                      <span className="text-sm">Сила: {a.strength}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <select className="rounded-xl border px-2 py-1 text-sm" value={a.province} onChange={(e) => moveArmy(a.id, e.target.value)}>
                        {provinces.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                      </select>
                      <select className="rounded-xl border px-2 py-1 text-sm" value={a.strength} onChange={(e) => updateArmy(a.id, { strength: Number(e.target.value) })}>
                        {[1, 2, 3, 4].map((n) => <option key={n} value={n}>Сила {n} · {calcBudget(n)} очков</option>)}
                      </select>
                    </div>
                  </div>
                ))}
              </PanelBody>
            </Panel>

            <Panel>
              <PanelBody className="space-y-3">
                <h3 className="flex items-center gap-2 font-bold"><Icon>⚔️</Icon> Добавить результат боя</h3>
                <div className="grid grid-cols-2 gap-2">
                  <select className="col-span-2 rounded-xl border px-2 py-2 text-sm" value={battleForm.province} onChange={(e) => setBattleForm({ ...battleForm, province: e.target.value })}>
                    {provinces.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>
                  <select className="rounded-xl border px-2 py-2 text-sm" value={battleForm.attacker} onChange={(e) => setBattleForm({ ...battleForm, attacker: e.target.value })}>
                    {armies.map((a) => <option key={a.id} value={a.id}>{a.id} · {a.name}</option>)}
                  </select>
                  <select className="rounded-xl border px-2 py-2 text-sm" value={battleForm.defender} onChange={(e) => setBattleForm({ ...battleForm, defender: e.target.value })}>
                    {armies.map((a) => <option key={a.id} value={a.id}>{a.id} · {a.name}</option>)}
                  </select>
                  <select className="rounded-xl border px-2 py-2 text-sm" value={battleForm.winner} onChange={(e) => setBattleForm({ ...battleForm, winner: e.target.value })}>
                    <option value="germany">Победила Германия</option>
                    <option value="ussr">Победил СССР</option>
                  </select>
                  <select className="rounded-xl border px-2 py-2 text-sm" value={battleForm.losses} onChange={(e) => setBattleForm({ ...battleForm, losses: e.target.value })}>
                    <option>лёгкие</option>
                    <option>средние</option>
                    <option>тяжёлые</option>
                    <option>разгром</option>
                  </select>
                  <input className="col-span-2 rounded-xl border px-3 py-2 text-sm" placeholder="Примечание" value={battleForm.note} onChange={(e) => setBattleForm({ ...battleForm, note: e.target.value })} />
                </div>
                <AppButton onClick={addBattle} className="w-full"><Icon>＋</Icon>Записать бой</AppButton>
              </PanelBody>
            </Panel>

            <Panel>
              <PanelBody className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-bold">Калькулятор отряда</h3>
                  <span className={`rounded-full px-2 py-1 text-xs font-bold ${calculatorRemaining < 0 ? "bg-red-100 text-red-800" : "bg-emerald-100 text-emerald-800"}`}>
                    {calculatorRemaining >= 0 ? `Осталось ${calculatorRemaining}` : `Перебор ${Math.abs(calculatorRemaining)}`}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    className="rounded-xl border px-2 py-2 text-sm"
                    value={unitCalculator.side}
                    onChange={(e) => setUnitCalculator((prev) => ({ ...prev, side: e.target.value }))}
                  >
                    <option value="germany">Германия</option>
                    <option value="ussr">СССР</option>
                  </select>
                  <select
                    className="rounded-xl border px-2 py-2 text-sm"
                    value={unitCalculator.strength}
                    onChange={(e) => setUnitCalculator((prev) => ({ ...prev, strength: Number(e.target.value) }))}
                  >
                    {[1, 2, 3, 4].map((n) => <option key={n} value={n}>Сила {n} · {calcBudget(n)}</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div className="rounded-2xl bg-stone-100 p-3">
                    <div className="text-xs text-stone-500">Бюджет</div>
                    <div className="text-lg font-black">{calculatorBudget}</div>
                  </div>
                  <div className="rounded-2xl bg-stone-100 p-3">
                    <div className="text-xs text-stone-500">Набрано</div>
                    <div className="text-lg font-black">{calculatorTotal}</div>
                  </div>
                  <div className={`rounded-2xl p-3 ${calculatorRemaining < 0 ? "bg-red-100 text-red-900" : "bg-emerald-100 text-emerald-900"}`}>
                    <div className="text-xs opacity-75">Баланс</div>
                    <div className="text-lg font-black">{calculatorRemaining}</div>
                  </div>
                </div>
                <div className="space-y-2">
                  {calculatorRows.length === 0 && <p className="rounded-2xl border bg-stone-50 p-3 text-sm text-stone-500">Пока нет юнитов.</p>}
                  {calculatorRows.map((row) => (
                    <div key={row.id} className="rounded-2xl border bg-white p-3">
                      <div className="grid grid-cols-[1fr_auto] gap-2">
                        <input
                          className="rounded-xl border px-2 py-2 text-sm"
                          placeholder="Название юнита"
                          value={row.name}
                          onChange={(e) => updateUnitRow(row.id, { name: e.target.value })}
                        />
                        <button
                          type="button"
                          className="h-10 w-10 rounded-xl border text-sm font-black hover:bg-stone-100"
                          onClick={() => removeUnitRow(row.id)}
                          aria-label="Удалить юнит"
                        >
                          ×
                        </button>
                      </div>
                      <div className="mt-2 grid grid-cols-4 gap-2">
                        <select
                          className="col-span-2 rounded-xl border px-2 py-2 text-sm"
                          value={row.category}
                          onChange={(e) => updateUnitRow(row.id, { category: e.target.value })}
                        >
                          {unitCategories.map((category) => <option key={category}>{category}</option>)}
                        </select>
                        <input
                          className="rounded-xl border px-2 py-2 text-sm"
                          type="number"
                          min="0"
                          step="50"
                          placeholder="Цена"
                          value={row.cost}
                          onChange={(e) => updateUnitRow(row.id, { cost: Number(e.target.value) })}
                          aria-label="Цена"
                        />
                        <input
                          className="rounded-xl border px-2 py-2 text-sm"
                          type="number"
                          min="0"
                          placeholder="шт."
                          value={row.count}
                          onChange={(e) => updateUnitRow(row.id, { count: Number(e.target.value) })}
                          aria-label="Количество"
                        />
                      </div>
                      <div className="mt-2 text-right text-xs font-bold text-stone-600">
                        {(Number(row.cost) || 0) * (Number(row.count) || 0)} очков
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <AppButton onClick={addUnitRow} variant="outline">Добавить юнит</AppButton>
                  <AppButton onClick={clearUnitRowsForSide} variant="outline">Очистить сторону</AppButton>
                </div>
              </PanelBody>
            </Panel>

            <Panel>
              <PanelBody>
                <h3 className="mb-2 font-bold">Победные очки</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-2xl bg-red-100 p-3"><div className="text-sm text-red-800">СССР</div><div className="text-2xl font-black">{victoryPoints.ussr}</div></div>
                  <div className="rounded-2xl bg-zinc-200 p-3"><div className="text-sm text-zinc-800">Германия</div><div className="text-2xl font-black">{victoryPoints.germany}</div></div>
                </div>
              </PanelBody>
            </Panel>
          </div>
        </div>

        <Panel>
          <PanelBody>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-xl font-bold">Журнал боёв</h2>
              <AppButton variant="outline" onClick={() => setBattleLog([])}><Icon>🗑️</Icon>Очистить</AppButton>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left">
                    <th className="p-2">Ход</th><th className="p-2">Провинция</th><th className="p-2">Атака</th><th className="p-2">Оборона</th><th className="p-2">Победитель</th><th className="p-2">Бюджет</th><th className="p-2">Потери</th><th className="p-2">Примечание</th>
                  </tr>
                </thead>
                <tbody>
                  {battleLog.length === 0 && <tr><td className="p-3 text-stone-500" colSpan={8}>Пока боёв нет.</td></tr>}
                  {battleLog.map((b) => (
                    <tr key={b.id} className="border-b hover:bg-stone-50">
                      <td className="p-2">{b.turn}</td>
                      <td className="p-2 font-semibold">{b.province}</td>
                      <td className="p-2">{b.attacker}</td>
                      <td className="p-2">{b.defender}</td>
                      <td className="p-2">{ownerConfig[b.winner]?.label}</td>
                      <td className="p-2">{b.budget}</td>
                      <td className="p-2">{b.losses}</td>
                      <td className="p-2">{b.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </PanelBody>
        </Panel>
      </div>
    </div>
  );
}
