import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  commonDoctrine,
  getCatalogUnits,
  getDoctrineOptions,
  guideSource,
  guideUnitCatalog,
  unitCategories,
} from "./unitCatalog";

const initialProvinces = [
  { id: "east_prussia", name: "Восточная Пруссия", sector: "Север", type: "база", owner: "germany", x: 7, y: 18, points: 0, bonus: "База Германии" },
  { id: "konigsberg", name: "Кёнигсберг", sector: "Польша", type: "порт/база", owner: "germany", x: 18, y: 40, points: 1, bonus: "База Восточной Пруссии" },
  { id: "gdansk", name: "Гданьск", sector: "Польша", type: "порт/город", owner: "germany", x: 11, y: 42, points: 1, bonus: "+300 порт" },
  { id: "torun", name: "Торунь", sector: "Польша", type: "город/переправа", owner: "germany", x: 11, y: 50, points: 0, bonus: "Висла" },
  { id: "poznan", name: "Познань", sector: "Польша", type: "город/узел", owner: "germany", x: 8, y: 51, points: 1, bonus: "Западный узел" },
  { id: "warsaw", name: "Варшава", sector: "Польша", type: "крупный город", owner: "germany", x: 23, y: 51, points: 2, bonus: "Генерал-губернаторство" },
  { id: "lodz", name: "Лодзь", sector: "Польша", type: "промышленный город", owner: "germany", x: 12, y: 54, points: 1, bonus: "+300 промышленность" },
  { id: "radom", name: "Радом", sector: "Польша", type: "город/узел", owner: "germany", x: 16, y: 56, points: 0, bonus: "Связь Варшава-Краков" },
  { id: "lublin", name: "Люблин", sector: "Польша", type: "город/узел", owner: "germany", x: 29, y: 61, points: 1, bonus: "Подступ к Бресту и Львову" },
  { id: "krakow", name: "Краков", sector: "Польша", type: "город/узел", owner: "germany", x: 13, y: 63, points: 1, bonus: "Южный узел" },
  { id: "wroclaw", name: "Бреслау", sector: "Польша", type: "город/узел", owner: "germany", x: 4, y: 58, points: 1, bonus: "Западный тыл" },
  { id: "baltics", name: "Таллин", sector: "Север", type: "порт/город", owner: "ussr", x: 41, y: 24, points: 1, bonus: "+300 порт" },
  { id: "riga", name: "Рига", sector: "Север", type: "порт/город", owner: "ussr", x: 30, y: 25, points: 1, bonus: "+300 порт" },
  { id: "daugavpils", name: "Двинск", sector: "Север", type: "переход/река", owner: "ussr", x: 43, y: 33, points: 0, bonus: "Западная Двина" },
  { id: "pskov", name: "Псков", sector: "Север", type: "город", owner: "ussr", x: 37, y: 12, points: 1, bonus: "Узел дорог" },
  { id: "velikie_luki", name: "Великие Луки", sector: "Север", type: "переход/лес", owner: "ussr", x: 58, y: 34, points: 0, bonus: "Связка север-центр" },
  { id: "luga", name: "Луга", sector: "Север", type: "лес/укрепления", owner: "ussr", x: 51, y: 10, points: 1, bonus: "+500 обороне" },
  { id: "novgorod", name: "Новгород", sector: "Север", type: "город/река", owner: "ussr", x: 64, y: 27, points: 1, bonus: "Подступ к Ленинграду" },
  { id: "leningrad", name: "Ленинград", sector: "Север", type: "крупный город", owner: "ussr", x: 66, y: 8, points: 4, bonus: "Ключевая точка" },
  { id: "tikhvin", name: "Тихвин", sector: "Север", type: "переход/лес", owner: "ussr", x: 72, y: 22, points: 0, bonus: "Северная развилка" },
  { id: "karelia", name: "Карелия", sector: "Север", type: "лес/озёра", owner: "ussr", x: 78, y: 4, points: 1, bonus: "Трудная местность" },

  { id: "brest", name: "Брест", sector: "Центр", type: "крепость", owner: "ussr", x: 9, y: 42, points: 1, bonus: "+500 обороне" },
  { id: "bialystok", name: "Белосток", sector: "Центр", type: "поле/узел", owner: "ussr", x: 18, y: 32, points: 1, bonus: "Дорожный узел" },
  { id: "vilnius", name: "Вильнюс", sector: "Центр", type: "город/узел", owner: "ussr", x: 37, y: 38, points: 1, bonus: "Балтийский узел" },
  { id: "minsk", name: "Минск", sector: "Центр", type: "крупный город", owner: "ussr", x: 31, y: 35, points: 1, bonus: "+300 снабжение" },
  { id: "orsha", name: "Орша", sector: "Центр", type: "город/узел", owner: "ussr", x: 61, y: 43, points: 1, bonus: "Дорога на Смоленск" },
  { id: "vitebsk", name: "Витебск", sector: "Центр", type: "город/лес", owner: "ussr", x: 44, y: 29, points: 1, bonus: "Переход к Смоленску" },
  { id: "smolensk", name: "Смоленск", sector: "Центр", type: "город/узел", owner: "ussr", x: 58, y: 32, points: 2, bonus: "Быстрое движение" },
  { id: "rzhev", name: "Ржев", sector: "Центр", type: "укрепрайон", owner: "ussr", x: 69, y: 25, points: 1, bonus: "+500 обороне" },
  { id: "kalinin", name: "Калинин", sector: "Центр", type: "город", owner: "ussr", x: 78, y: 24, points: 1, bonus: "Подступ к Москве" },
  { id: "vyazma", name: "Вязьма", sector: "Центр", type: "город/узел", owner: "ussr", x: 75, y: 41, points: 1, bonus: "Московское направление" },
  { id: "moscow", name: "Москва", sector: "Центр", type: "столица", owner: "ussr", x: 82, y: 38, points: 5, bonus: "Главная цель" },
  { id: "kaluga", name: "Калуга", sector: "Центр", type: "переход/город", owner: "ussr", x: 83, y: 46, points: 0, bonus: "Южный обход Москвы" },
  { id: "tula", name: "Тула", sector: "Центр", type: "город/промышленность", owner: "ussr", x: 87, y: 48, points: 1, bonus: "+300 промышленность" },
  { id: "mogilev", name: "Могилёв", sector: "Центр", type: "город", owner: "ussr", x: 43, y: 43, points: 1, bonus: "Оборонительная линия" },
  { id: "gomel", name: "Гомель", sector: "Центр", type: "лес/река", owner: "ussr", x: 49, y: 55, points: 1, bonus: "Связь центр-юг" },
  { id: "bryansk", name: "Брянск", sector: "Центр", type: "лес/укрепрайон", owner: "ussr", x: 64, y: 52, points: 1, bonus: "Лесная оборона" },
  { id: "orel", name: "Орёл", sector: "Центр", type: "поле/город", owner: "ussr", x: 76, y: 56, points: 1, bonus: "Южный подступ" },
  { id: "mtcensk", name: "Мценск", sector: "Центр", type: "город/дорога", owner: "ussr", x: 86, y: 50, points: 0, bonus: "Дорога Орёл-Тула" },
  { id: "kursk", name: "Курск", sector: "Центр", type: "город/узел", owner: "ussr", x: 82, y: 57, points: 1, bonus: "Связь центр-юг" },

  { id: "lviv", name: "Львов", sector: "Юг", type: "город", owner: "ussr", x: 8, y: 66, points: 1, bonus: "Западная Украина" },
  { id: "ternopil", name: "Тернополь", sector: "Юг", type: "поле/город", owner: "ussr", x: 19, y: 69, points: 1, bonus: "Западная Украина" },
  { id: "zhytomyr", name: "Житомир", sector: "Юг", type: "лес/поле", owner: "ussr", x: 31, y: 64, points: 1, bonus: "Путь на Киев" },
  { id: "vinnytsia", name: "Винница", sector: "Юг", type: "переход/город", owner: "ussr", x: 49, y: 68, points: 0, bonus: "Правобережный узел" },
  { id: "kyiv", name: "Киев", sector: "Юг", type: "крупный город/река", owner: "ussr", x: 43, y: 66, points: 3, bonus: "+500 обороне" },
  { id: "chernihiv", name: "Чернигов", sector: "Юг", type: "переход/река", owner: "ussr", x: 64, y: 57, points: 0, bonus: "Десна" },
  { id: "uman", name: "Умань", sector: "Юг", type: "переход/поле", owner: "ussr", x: 54, y: 71, points: 0, bonus: "Южная развилка" },
  { id: "cherkasy", name: "Черкассы", sector: "Юг", type: "река/переправа", owner: "ussr", x: 53, y: 74, points: 1, bonus: "Переправа" },
  { id: "poltava", name: "Полтава", sector: "Юг", type: "поле", owner: "ussr", x: 66, y: 72, points: 1, bonus: "Открытый бой" },
  { id: "kharkiv", name: "Харьков", sector: "Юг", type: "большой город", owner: "ussr", x: 78, y: 70, points: 2, bonus: "+300 промышленность" },
  { id: "kryvyi_rih", name: "Кривой Рог", sector: "Юг", type: "промышленный узел", owner: "ussr", x: 70, y: 75, points: 1, bonus: "+300 промышленность" },
  { id: "dnipro", name: "Днепропетровск", sector: "Юг", type: "промышленный город/река", owner: "ussr", x: 63, y: 84, points: 1, bonus: "+300 промышленность" },
  { id: "zaporizhzhia", name: "Запорожье", sector: "Юг", type: "река/индустрия", owner: "ussr", x: 73, y: 88, points: 1, bonus: "Днепр" },
  { id: "mykolaiv", name: "Николаев", sector: "Юг", type: "порт/город", owner: "ussr", x: 64, y: 80, points: 1, bonus: "+300 порт" },
  { id: "odessa", name: "Одесса", sector: "Юг", type: "порт/город", owner: "ussr", x: 30, y: 91, points: 1, bonus: "+300 порт" },
  { id: "melitopol", name: "Мелитополь", sector: "Юг", type: "переход/степь", owner: "ussr", x: 81, y: 83, points: 0, bonus: "Путь в Крым" },
  { id: "crimea", name: "Крым", sector: "Юг", type: "полуостров/укрепрайон", owner: "ussr", x: 58, y: 96, points: 2, bonus: "+500 обороне" },
  { id: "sevastopol", name: "Севастополь", sector: "Юг", type: "порт/крепость", owner: "ussr", x: 74, y: 94, points: 1, bonus: "+500 обороне" },
  { id: "stalino", name: "Сталино", sector: "Юг", type: "промышленный город", owner: "ussr", x: 87, y: 69, points: 1, bonus: "+300 промышленность" },
  { id: "rostov", name: "Ростов", sector: "Юг", type: "город/ворота на Кавказ", owner: "ussr", x: 88, y: 88, points: 2, bonus: "Стратегическая точка" },
];

const links = [
  ["east_prussia", "konigsberg"], ["east_prussia", "bialystok"], ["east_prussia", "vilnius"],
  ["konigsberg", "gdansk"], ["konigsberg", "bialystok"], ["konigsberg", "vilnius"],
  ["gdansk", "torun"], ["gdansk", "poznan"],
  ["torun", "poznan"], ["torun", "warsaw"], ["torun", "lodz"],
  ["poznan", "wroclaw"], ["poznan", "lodz"],
  ["wroclaw", "lodz"], ["wroclaw", "krakow"],
  ["warsaw", "bialystok"], ["warsaw", "brest"], ["warsaw", "lodz"], ["warsaw", "radom"], ["warsaw", "lublin"],
  ["lodz", "radom"], ["lodz", "krakow"],
  ["radom", "lublin"], ["radom", "krakow"],
  ["lublin", "brest"], ["lublin", "lviv"], ["lublin", "krakow"],
  ["krakow", "lviv"],
  ["baltics", "riga"], ["baltics", "pskov"], ["baltics", "leningrad"],
  ["riga", "daugavpils"], ["riga", "vilnius"],
  ["daugavpils", "pskov"], ["daugavpils", "vitebsk"], ["daugavpils", "vilnius"],
  ["pskov", "luga"], ["pskov", "velikie_luki"], ["pskov", "novgorod"],
  ["velikie_luki", "vitebsk"], ["velikie_luki", "rzhev"], ["velikie_luki", "smolensk"],
  ["luga", "leningrad"], ["luga", "novgorod"],
  ["novgorod", "leningrad"], ["novgorod", "tikhvin"], ["novgorod", "kalinin"],
  ["tikhvin", "leningrad"], ["tikhvin", "kalinin"],
  ["leningrad", "karelia"],

  ["brest", "bialystok"], ["brest", "minsk"], ["brest", "lviv"],
  ["bialystok", "vilnius"], ["bialystok", "minsk"],
  ["vilnius", "minsk"],
  ["minsk", "orsha"], ["minsk", "mogilev"], ["minsk", "zhytomyr"],
  ["vitebsk", "orsha"], ["vitebsk", "mogilev"],
  ["orsha", "smolensk"], ["orsha", "mogilev"],
  ["smolensk", "mogilev"], ["smolensk", "rzhev"], ["smolensk", "vyazma"], ["smolensk", "bryansk"],
  ["rzhev", "kalinin"], ["rzhev", "vyazma"], ["rzhev", "moscow"],
  ["kalinin", "moscow"],
  ["vyazma", "moscow"], ["vyazma", "kaluga"], ["vyazma", "bryansk"],
  ["moscow", "kaluga"], ["moscow", "tula"],
  ["kaluga", "tula"], ["kaluga", "bryansk"],
  ["tula", "mtcensk"], ["tula", "kursk"],
  ["mogilev", "gomel"],
  ["gomel", "bryansk"], ["gomel", "chernihiv"],
  ["bryansk", "orel"], ["bryansk", "kursk"],
  ["orel", "mtcensk"], ["orel", "kursk"],
  ["mtcensk", "kursk"],
  ["kursk", "kharkiv"], ["kursk", "poltava"],

  ["lviv", "ternopil"], ["lviv", "zhytomyr"],
  ["ternopil", "zhytomyr"], ["ternopil", "vinnytsia"],
  ["zhytomyr", "kyiv"], ["zhytomyr", "vinnytsia"],
  ["vinnytsia", "kyiv"], ["vinnytsia", "uman"],
  ["kyiv", "chernihiv"], ["kyiv", "cherkasy"], ["kyiv", "poltava"],
  ["chernihiv", "cherkasy"], ["chernihiv", "poltava"],
  ["uman", "cherkasy"], ["uman", "mykolaiv"], ["uman", "odessa"],
  ["cherkasy", "poltava"], ["cherkasy", "kryvyi_rih"], ["cherkasy", "dnipro"],
  ["poltava", "kharkiv"], ["poltava", "dnipro"], ["poltava", "kryvyi_rih"],
  ["kharkiv", "dnipro"], ["kharkiv", "stalino"],
  ["kryvyi_rih", "dnipro"], ["kryvyi_rih", "mykolaiv"], ["kryvyi_rih", "zaporizhzhia"],
  ["dnipro", "zaporizhzhia"], ["dnipro", "melitopol"],
  ["zaporizhzhia", "melitopol"], ["zaporizhzhia", "stalino"],
  ["mykolaiv", "odessa"], ["mykolaiv", "melitopol"],
  ["melitopol", "crimea"], ["melitopol", "rostov"],
  ["crimea", "sevastopol"],
  ["stalino", "rostov"],
];

const initialArmies = [
  { id: "G1", name: "Группа Север", side: "germany", front: "germany_north", province: "konigsberg", strength: 2 },
  { id: "G2", name: "Группа Центр", side: "germany", front: "germany_center", province: "warsaw", strength: 3 },
  { id: "G3", name: "Группа Юг", side: "germany", front: "germany_south", province: "lublin", strength: 2 },
  { id: "GR", name: "Резерв", side: "germany", front: "germany_reserve", province: "krakow", strength: 1 },
  { id: "S1", name: "Северный фронт", side: "ussr", front: "ussr_north", province: "pskov", strength: 2 },
  { id: "S2", name: "Западный фронт", side: "ussr", front: "ussr_west", province: "minsk", strength: 3 },
  { id: "S3", name: "Юго-Западный фронт", side: "ussr", front: "ussr_southwest", province: "kyiv", strength: 2 },
  { id: "SR", name: "Резерв Ставки", side: "ussr", front: "ussr_stavka", province: "moscow", strength: 1 },
];

const strengthLevels = [1, 2, 3, 4, 5];
const calculatorBudgetOptions = [
  { value: 2500, label: "Кризис · 2500" },
  ...strengthLevels.map((strength) => ({ value: calcBudget(strength), label: `Сила ${strength} · ${calcBudget(strength)}` })),
];

const ownerConfig = {
  germany: { label: "Германия", dot: "bg-zinc-800", text: "text-zinc-950", fill: "bg-zinc-300", border: "border-zinc-700", marker: "bg-zinc-900 text-white" },
  ussr: { label: "СССР", dot: "bg-red-700", text: "text-red-950", fill: "bg-red-200", border: "border-red-700", marker: "bg-red-700 text-white" },
  neutral: { label: "Нейтрально", dot: "bg-slate-400", text: "text-slate-700", fill: "bg-slate-100", border: "border-slate-300", marker: "bg-slate-500 text-white" },
};

const playerSides = ["germany", "ussr"];
const frontSlots = {
  germany: [
    { id: "germany_north", label: "Север" },
    { id: "germany_center", label: "Центр" },
    { id: "germany_south", label: "Юг" },
    { id: "germany_reserve", label: "Резерв" },
  ],
  ussr: [
    { id: "ussr_north", label: "Северный" },
    { id: "ussr_west", label: "Западный" },
    { id: "ussr_southwest", label: "Юго-Западный" },
    { id: "ussr_stavka", label: "Ставка" },
  ],
};
const armyFrontById = Object.fromEntries(initialArmies.map((army) => [army.id, army.front]));
const frontLabelById = Object.fromEntries(Object.values(frontSlots).flat().map((front) => [front.id, front.label]));

const mapImageUrl = "/maps/eastern-front-1941.jpg";

const mapCoordinates = {
  east_prussia: { x: 22, y: 43 },
  konigsberg: { x: 22, y: 39 },
  gdansk: { x: 16, y: 40 },
  torun: { x: 15, y: 50 },
  poznan: { x: 8, y: 51 },
  warsaw: { x: 24, y: 51 },
  lodz: { x: 12, y: 54 },
  radom: { x: 16, y: 56 },
  lublin: { x: 30, y: 60 },
  krakow: { x: 13, y: 63 },
  wroclaw: { x: 4, y: 58 },
  baltics: { x: 38, y: 18 },
  riga: { x: 35, y: 30 },
  daugavpils: { x: 40, y: 40 },
  pskov: { x: 50, y: 27 },
  velikie_luki: { x: 57, y: 40 },
  luga: { x: 54, y: 22 },
  novgorod: { x: 63, y: 24 },
  leningrad: { x: 59, y: 16 },
  tikhvin: { x: 65, y: 18 },
  karelia: { x: 62, y: 6 },
  brest: { x: 30, y: 54 },
  bialystok: { x: 28, y: 49 },
  vilnius: { x: 39, y: 41 },
  minsk: { x: 46, y: 46 },
  orsha: { x: 57, y: 43 },
  vitebsk: { x: 56, y: 40 },
  smolensk: { x: 65, y: 42 },
  rzhev: { x: 64, y: 34 },
  kalinin: { x: 80, y: 31 },
  vyazma: { x: 72, y: 43 },
  moscow: { x: 84, y: 36 },
  kaluga: { x: 78, y: 42 },
  tula: { x: 85, y: 44 },
  mogilev: { x: 57, y: 46 },
  gomel: { x: 57, y: 53 },
  bryansk: { x: 73, y: 50 },
  orel: { x: 81, y: 49 },
  mtcensk: { x: 89, y: 48 },
  kursk: { x: 81, y: 55 },
  lviv: { x: 30, y: 66 },
  ternopil: { x: 34, y: 68 },
  zhytomyr: { x: 49, y: 64 },
  vinnytsia: { x: 46, y: 68 },
  kyiv: { x: 57, y: 63 },
  chernihiv: { x: 57, y: 58 },
  uman: { x: 48, y: 70 },
  cherkasy: { x: 60, y: 67 },
  poltava: { x: 72, y: 67 },
  kharkiv: { x: 84, y: 64 },
  kryvyi_rih: { x: 71, y: 75 },
  dnipro: { x: 77, y: 72 },
  zaporizhzhia: { x: 78, y: 76 },
  mykolaiv: { x: 62, y: 79 },
  odessa: { x: 57, y: 83 },
  melitopol: { x: 74, y: 79 },
  crimea: { x: 72, y: 87 },
  sevastopol: { x: 71, y: 92 },
  stalino: { x: 85, y: 74 },
  rostov: { x: 97, y: 78 },
};

const markerLabelOffsets = {
  daugavpils: { x: -2.5, y: -2.2 },
  vilnius: { x: -3.5, y: 1.2 },
  vitebsk: { x: -4.8, y: -2.4 },
  orsha: { x: -5.2, y: 1.2 },
  smolensk: { x: 4.8, y: -0.6 },
  mogilev: { x: -4.6, y: 3.2 },
  velikie_luki: { x: -4.4, y: -2.2 },
  vyazma: { x: 4.3, y: 1.6 },
  bryansk: { x: -3.6, y: 1.4 },
  orel: { x: 3.3, y: 1.1 },
  mtcensk: { x: 4.2, y: -1.1 },
  vinnytsia: { x: -3.5, y: 2.2 },
  cherkasy: { x: 3.3, y: 1.6 },
  kryvyi_rih: { x: -3.2, y: 1.2 },
  zaporizhzhia: { x: 3.6, y: 0.9 },
};

function applyMapCoordinates(provinceList) {
  return provinceList.map((province) => ({
    ...province,
    ...(mapCoordinates[province.id] || {}),
  }));
}

const campaignStartProvinces = applyMapCoordinates(initialProvinces);

function mergeCampaignProvinces(provinceList) {
  const savedById = new Map(provinceList.map((province) => [province.id, province]));
  return campaignStartProvinces.map((baseProvince) => {
    const savedProvince = savedById.get(baseProvince.id);
    return {
      ...baseProvince,
      ...(savedProvince || {}),
      ...(mapCoordinates[baseProvince.id] || {}),
    };
  });
}

function calcBudget(strength) {
  return { 1: 3500, 2: 5000, 3: 7000, 4: 9000, 5: 11000 }[Number(strength)] || 3500;
}

function getGarrisonBudget(province) {
  if (!province || province.owner === "neutral") return null;
  const text = `${province.name} ${province.type} ${province.bonus}`.toLowerCase();
  if (["moscow", "leningrad", "kyiv"].includes(province.id) || province.points >= 4) return 7000;
  if (province.points >= 2 || /крепость|укреп|крупный|столица|ключ/.test(text)) return 5000;
  if (province.points >= 1 || /город|узел|порт|переправа|река/.test(text)) return 3500;
  return 2500;
}

function getGarrisonRules(province) {
  const budget = getGarrisonBudget(province);
  if (!budget) return [];
  if (budget >= 7000) return ["столичная/ключевая оборона", "полноценная пехота, ПТО и артиллерия по договоренности"];
  if (budget >= 5000) return ["усиленный гарнизон", "пехота, ПТО, минометы, укрепления; редкая броня по договоренности"];
  if (budget >= 3500) return ["обычный гарнизон", "пехота, пулеметы, минометы, ПТО; максимум легкая броня"];
  return ["слабый гарнизон", "пехота, пулеметы, легкие минометы; без танков и тяжелой артиллерии"];
}

function getGarrisonId(provinceId) {
  return `garrison:${provinceId}`;
}

function getGarrisonProvinceId(garrisonId) {
  return String(garrisonId || "").startsWith("garrison:") ? String(garrisonId).slice("garrison:".length) : null;
}

function makeGarrisonDefender(province) {
  const budget = getGarrisonBudget(province);
  if (!budget) return null;
  return {
    id: getGarrisonId(province.id),
    name: `Гарнизон ${province.name}`,
    side: province.owner,
    province: province.id,
    strength: null,
    budget,
    front: `${province.owner}_garrison`,
    garrison: true,
  };
}

function getBattleBudget(army, crisisRules) {
  if (!army) return null;
  const baseBudget = army.garrison ? army.budget : calcBudget(army.strength);
  if (army.side === "ussr" && crisisRules.ussrBudgetCap) return Math.min(baseBudget, crisisRules.ussrBudgetCap);
  return baseBudget;
}

function getFrontIdsForSide(side) {
  return (frontSlots[side] || []).map((front) => front.id);
}

function getArmyFront(army) {
  return army.front || armyFrontById[army.id] || `${army.side}_unassigned`;
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
  if (turn <= 2) {
    return {
      phase: "Шок начала войны",
      tone: "border-red-300 bg-red-50 text-red-950",
      ussrBudgetCap: 3500,
      reservePreset: "GOH 2500 ЛС",
      germanyInitiative: "Блицкриг: после победы можно занять 1 пустую соседнюю провинцию.",
      ussrRules: [
        "СССР: максимум 3500 ЛС на бой, окружённые группы лучше играть на 2500 ЛС.",
        "КВ запрещены; Т-34 максимум 1 штука и только по договорённости.",
        "Тяжёлая артиллерия запрещена.",
        "Авиация СССР запрещена: самолёты есть в моде, но кризисом кампании не используются.",
        "Быстрое движение на оперативной карте запрещено.",
        "При поражении окружённая группа теряет +1 дополнительный уровень силы.",
      ],
      germanyRules: [
        "Германия использует обычный бюджет по силе группы.",
        "Авиация Германии доступна во всех доктринах: разведка, лёгкий удар, тяжёлый удар.",
        "Можно атаковать агрессивнее и развивать успех после победы.",
      ],
    };
  }

  if (turn <= 4) {
    return {
      phase: "Восстановление управления",
      tone: "border-amber-300 bg-amber-50 text-amber-950",
      ussrBudgetCap: 5000,
      reservePreset: "GOH 3500 ЛС",
      germanyInitiative: "Инициатива Германии сохраняется, но без бесплатного второго продвижения.",
      ussrRules: [
        "СССР: максимум 5000 ЛС на бой.",
        "Можно взять 1 Т-34; КВ только как редкий сценарный юнит.",
        "Авиация СССР ограничена: 1 лёгкий удар или разведка; Ил-2 только как редкий сценарный вызов.",
        "ПТО и миномёты доступны без дополнительных ограничений.",
        "Штраф на движение снимается.",
      ],
      germanyRules: [
        "Германия всё ещё выбирает темп операции.",
        "Авиация Германии доступна, но без бесплатного преимущества сверх бюджета боя.",
        "Блицкриг-бонус уже не даёт автоматического второго шага.",
      ],
    };
  }

  return {
    phase: "Стабилизация фронта",
    tone: "border-emerald-300 bg-emerald-50 text-emerald-950",
    ussrBudgetCap: null,
    reservePreset: null,
    germanyInitiative: "Обычная кампания: продвижение только по результату боя и правилам карты.",
    ussrRules: [
      "СССР использует обычные бюджеты по силе группы.",
      "Доступны полноценные силы по выбранному году и доктрине.",
      "Авиация СССР доступна во всех доктринах: разведка, лёгкий удар, тяжёлый удар.",
      "Можно вводить резервы и применять оборонительные бонусы провинций.",
    ],
    germanyRules: [
      "Германия играет без стартового блицкриг-бонуса.",
      "Авиация Германии остаётся доступной во всех доктринах по правилам мода.",
      "Преимущество теперь нужно поддерживать победами на карте.",
    ],
  };
}

function makeUnitRow(unit, id = `unit-${Date.now()}`) {
  return {
    id,
    side: unit.side,
    doctrine: unit.doctrine,
    category: unit.category,
    name: unit.name,
    cost: unit.cost,
    resource: unit.resource,
    command: unit.command,
    count: 1,
  };
}

const initialUnitRows = [
  makeUnitRow(guideUnitCatalog.find((unit) => unit.id === "g-inf-rifleman"), "unit-g-1"),
  makeUnitRow(guideUnitCatalog.find((unit) => unit.id === "g-tank-pz3e"), "unit-g-2"),
  makeUnitRow(guideUnitCatalog.find((unit) => unit.id === "s-inf-rifleman"), "unit-s-1"),
  makeUnitRow(guideUnitCatalog.find((unit) => unit.id === "s-tank-t26-1933"), "unit-s-2"),
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

  if (initialProvinces.length !== 60) errors.push(`Ожидалось 60 провинций, получено ${initialProvinces.length}`);
  if (calcBudget(1) !== 3500) errors.push("calcBudget(1) должен быть 3500");
  if (calcBudget(4) !== 9000) errors.push("calcBudget(4) должен быть 9000");
  if (calcBudget(5) !== 11000) errors.push("calcBudget(5) должен быть 11000");
  if (!guideUnitCatalog.some((unit) => unit.id === "g-tank-pz3e" && unit.cost === 340)) errors.push("В справочнике должна быть цена Pz.Kpfw III Ausf.E");
  if (!guideUnitCatalog.some((unit) => unit.id === "s-tank-t26-1933" && unit.cost === 245)) errors.push("В справочнике должна быть цена Т-26 обр. 1933 г.");
  if (!guideUnitCatalog.some((unit) => unit.id === "g-d-pak36" && unit.resource === "ОД")) errors.push("Доктринные вызовы должны считаться в ОД");
  if (!getNeighbors("minsk").includes("brest")) errors.push("Минск должен быть связан с Брестом");
  if (!getNeighbors("minsk").includes("orsha")) errors.push("Минск должен быть связан с Оршей");
  if (!getNeighbors("orsha").includes("smolensk")) errors.push("Орша должна быть связана со Смоленском");
  if (!getNeighbors("warsaw").includes("brest")) errors.push("Варшава должна быть связана с Брестом");
  if (!getNeighbors("lublin").includes("lviv")) errors.push("Люблин должен быть связан со Львовом");
  if (!getNeighbors("mtcensk").includes("orel")) errors.push("Мценск должен быть связан с Орлом");
  if (!getNeighbors("melitopol").includes("crimea")) errors.push("Мелитополь должен быть связан с Крымом");
  ["brest", "bialystok", "lviv"].forEach((id) => {
    const province = initialProvinces.find((item) => item.id === id);
    if (province?.owner !== "ussr") errors.push(`${province?.name || id} должен быть советским на старте 22 июня 1941`);
  });

  initialProvinces.forEach((province) => {
    if (!mapCoordinates[province.id]) errors.push(`Для провинции нет координат карты: ${province.id}`);
  });

  links.forEach(([a, b]) => {
    if (!provinceIds.has(a)) errors.push(`Связь содержит неизвестную провинцию: ${a}`);
    if (!provinceIds.has(b)) errors.push(`Связь содержит неизвестную провинцию: ${b}`);
  });

  initialArmies.forEach((army) => {
    if (!provinceIds.has(army.province)) errors.push(`Армия ${army.id} стоит в неизвестной провинции ${army.province}`);
    if (!armyIds.has(army.id)) errors.push(`Неизвестная армия: ${army.id}`);
    if (!strengthLevels.includes(army.strength)) errors.push(`У армии ${army.id} неправильная сила: ${army.strength}`);
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

function AppButton({ children, onClick, variant = "solid", className = "", type = "button", disabled = false }) {
  const variants = {
    solid: "bg-stone-900 text-white hover:bg-stone-800 border-stone-900",
    outline: "bg-white text-stone-900 hover:bg-stone-100 border-stone-300",
    danger: "bg-red-700 text-white hover:bg-red-800 border-red-700",
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-2xl border px-3 py-2 text-sm font-semibold transition ${variants[variant] || variants.solid} ${disabled ? "cursor-not-allowed opacity-50" : ""} ${className}`}
    >
      {children}
    </button>
  );
}

export default function GOHCampaignMap() {
  const [provinces, setProvinces] = useState(campaignStartProvinces);
  const [armies, setArmies] = useState(initialArmies);
  const [playerSide, setPlayerSide] = useState("germany");
  const [controlledFronts, setControlledFronts] = useState(getFrontIdsForSide("germany"));
  const [selectedProvinceId, setSelectedProvinceId] = useState("minsk");
  const [turn, setTurn] = useState(1);
  const [battleLog, setBattleLog] = useState([]);
  const [battleRequests, setBattleRequests] = useState([]);
  const [battleForm, setBattleForm] = useState({ province: "minsk", attacker: "G2", defender: "S2", winner: "germany", losses: "средние", note: "", encircled: false, blitzAdvance: false });
  const [unitCalculator, setUnitCalculator] = useState({ side: "germany", strength: 3, budget: 7000, doctrine: "Универсальная", unitId: "g-u-riflemen" });
  const [unitRows, setUnitRows] = useState(initialUnitRows);
  const [message, setMessage] = useState("");
  const [networkEnabled, setNetworkEnabled] = useState(false);
  const [networkStatus, setNetworkStatus] = useState("Сеть выключена.");
  const networkEnabledRef = useRef(false);
  const importFileRef = useRef(null);

  const byId = useMemo(() => Object.fromEntries(provinces.map((p) => [p.id, p])), [provinces]);
  const selectedProvince = byId[selectedProvinceId] || provinces[0];
  const provinceArmies = armies.filter((a) => a.province === selectedProvince?.id);
  const controlledFrontSet = useMemo(() => new Set(controlledFronts), [controlledFronts]);
  const controlledArmies = useMemo(
    () => armies.filter((army) => army.side === playerSide && controlledFrontSet.has(getArmyFront(army))),
    [armies, playerSide, controlledFrontSet],
  );
  const ownProvinceIds = useMemo(() => controlledArmies.map((army) => army.province), [controlledArmies]);
  const reconProvinceIds = useMemo(() => {
    const ids = new Set(ownProvinceIds);
    ownProvinceIds.forEach((id) => getNeighbors(id).forEach((neighborId) => ids.add(neighborId)));
    return ids;
  }, [ownProvinceIds]);
  const visibleProvinceArmies = provinceArmies.filter((army) => army.side === playerSide && controlledFrontSet.has(getArmyFront(army)));
  const alliedProvinceArmies = provinceArmies.filter((army) => army.side === playerSide && !controlledFrontSet.has(getArmyFront(army)));
  const selectedEnemyContacts = provinceArmies.filter((army) => army.side !== playerSide && reconProvinceIds.has(selectedProvince?.id));
  const connectedIds = useMemo(() => getNeighbors(selectedProvinceId), [selectedProvinceId]);
  const victoryPoints = useMemo(() => calculateVictoryPoints(provinces), [provinces]);
  const doctrineOptions = useMemo(() => getDoctrineOptions(unitCalculator.side), [unitCalculator.side]);
  const catalogUnits = useMemo(
    () => getCatalogUnits(unitCalculator.side, unitCalculator.doctrine),
    [unitCalculator.side, unitCalculator.doctrine],
  );
  const selectedCatalogUnit = catalogUnits.find((unit) => unit.id === unitCalculator.unitId) || catalogUnits[0];
  const calculatorRows = useMemo(() => unitRows.filter((row) => row.side === unitCalculator.side), [unitRows, unitCalculator.side]);
  const calculatorBudget = Number(unitCalculator.budget) || calcBudget(unitCalculator.strength);
  const calculatorTotal = useMemo(
    () => calculatorRows.reduce((sum, row) => {
      if ((row.resource || "ЛС") !== "ЛС") return sum;
      return sum + (Number(row.cost) || 0) * (Number(row.count) || 0);
    }, 0),
    [calculatorRows],
  );
  const calculatorDoctrineTotal = useMemo(
    () => calculatorRows.reduce((sum, row) => {
      if ((row.resource || "ЛС") !== "ОД") return sum;
      return sum + (Number(row.cost) || 0) * (Number(row.count) || 0);
    }, 0),
    [calculatorRows],
  );
  const calculatorCommandTotal = useMemo(
    () => calculatorRows.reduce((sum, row) => sum + (Number(row.command) || 0) * (Number(row.count) || 0), 0),
    [calculatorRows],
  );
  const calculatorRemaining = calculatorBudget - calculatorTotal;
  const crisisRules = useMemo(() => getCampaignCrisisRules(turn), [turn]);
  const battleAttacker = armies.find((army) => army.id === battleForm.attacker);
  const selectedGarrisonProvinceId = getGarrisonProvinceId(battleForm.defender);
  const selectedGarrisonDefender = selectedGarrisonProvinceId ? makeGarrisonDefender(byId[selectedGarrisonProvinceId]) : null;
  const battleDefender = armies.find((army) => army.id === battleForm.defender) || selectedGarrisonDefender;
  const visibleBattleArmies = useMemo(
    () => armies.filter((army) => (army.side === playerSide && controlledFrontSet.has(getArmyFront(army))) || reconProvinceIds.has(army.province)),
    [armies, playerSide, controlledFrontSet, reconProvinceIds],
  );
  const battleProvince = byId[battleForm.province] || selectedProvince;
  const battleNeighborIds = useMemo(() => getNeighbors(battleForm.province), [battleForm.province]);
  const battleReachIds = useMemo(() => new Set([battleForm.province, ...battleNeighborIds]), [battleForm.province, battleNeighborIds]);
  const battleAttackers = useMemo(
    () => visibleBattleArmies.filter((army) => (
      army.side === playerSide
      && controlledFrontSet.has(getArmyFront(army))
      && battleReachIds.has(army.province)
    )),
    [visibleBattleArmies, playerSide, controlledFrontSet, battleReachIds],
  );
  const battleArmyDefenders = useMemo(
    () => visibleBattleArmies.filter((army) => army.side !== playerSide && army.province === battleForm.province),
    [visibleBattleArmies, playerSide, battleForm.province],
  );
  const battleGarrisonDefender = useMemo(() => {
    if (!battleProvince || battleProvince.owner === "neutral" || battleProvince.owner === playerSide) return null;
    const ownerArmyExists = armies.some((army) => army.side === battleProvince.owner && army.province === battleProvince.id);
    if (ownerArmyExists) return null;
    return makeGarrisonDefender(battleProvince);
  }, [armies, battleProvince, playerSide]);
  const battleDefenders = useMemo(
    () => (battleGarrisonDefender ? [...battleArmyDefenders, battleGarrisonDefender] : battleArmyDefenders),
    [battleArmyDefenders, battleGarrisonDefender],
  );
  const battleAttackerIsValid = battleAttackers.some((army) => army.id === battleForm.attacker);
  const battleDefenderIsValid = battleDefenders.some((army) => army.id === battleForm.defender);
  const battleCanSubmit = Boolean(
    battleProvince
    && battleAttackerIsValid
    && battleDefenderIsValid
    && battleForm.attacker !== battleForm.defender,
  );
  const battleRouteText = useMemo(() => {
    if (!battleAttackers.length) return "Нет своей армии в этой провинции или рядом с ней.";
    if (!battleDefenders.length) return "В выбранной провинции нет видимого вражеского контакта.";
    if (!battleAttackerIsValid || !battleDefenderIsValid) return "Выбери доступную армию и контакт для этой провинции.";
    const attackerProvince = byId[battleAttacker?.province];
    if (!attackerProvince || !battleProvince) return "Проверь направление атаки.";
    if (attackerProvince.id === battleProvince.id) return `Бой в ${battleProvince.name}: армия уже в провинции.`;
    return `Атака из ${attackerProvince.name} на ${battleProvince.name}.`;
  }, [battleAttackers.length, battleDefenders.length, battleAttackerIsValid, battleDefenderIsValid, byId, battleAttacker, battleProvince]);
  const battleArmies = [battleAttacker, battleDefender].filter(Boolean);
  const sovietBattleArmy = battleArmies.find((army) => army.side === "ussr");
  const germanBattleArmy = battleArmies.find((army) => army.side === "germany");
  const sovietBaseBudget = sovietBattleArmy ? (sovietBattleArmy.garrison ? sovietBattleArmy.budget : calcBudget(sovietBattleArmy.strength)) : null;
  const sovietRecommendedBudget = getBattleBudget(sovietBattleArmy, crisisRules);
  const germanRecommendedBudget = getBattleBudget(germanBattleArmy, crisisRules);
  const garrisonRules = battleDefender?.garrison ? getGarrisonRules(battleProvince) : [];

  const battleBriefingText = useMemo(() => {
    const attackerProvince = byId[battleAttacker?.province];
    const defenderProvince = byId[battleDefender?.province];
    return [
      `GOH Campaign: подготовка боя, ход ${turn}`,
      `Провинция: ${battleProvince?.name || "не выбрана"} (${battleProvince?.sector || "?"}, ${battleProvince?.type || "?"})`,
      battleAttacker ? `Атакующий: ${ownerConfig[battleAttacker.side]?.label} / ${battleAttacker.id} ${battleAttacker.name} / сила ${battleAttacker.strength} / ${attackerProvince?.name || "?"}` : "Атакующий: не выбран",
      battleDefender ? `Оборона: ${ownerConfig[battleDefender.side]?.label} / ${battleDefender.garrison ? battleDefender.name : `${battleDefender.id} ${battleDefender.name}`} / ${battleDefender.garrison ? getModPresetForBudget(battleDefender.budget) : `сила ${battleDefender.strength}`} / ${defenderProvince?.name || "?"}` : "Оборона: не выбрана",
      `Бюджет Германии: ${germanRecommendedBudget ? getModPresetForBudget(germanRecommendedBudget) : "не выбран"}`,
      `Бюджет СССР: ${sovietRecommendedBudget ? getModPresetForBudget(sovietRecommendedBudget) : "не выбран"}`,
      `Кризис 1941: ${crisisRules.phase}`,
      battleDefender?.garrison ? `Гарнизон: ${garrisonRules.join("; ")}` : null,
      `Итог после боя: победитель ${ownerConfig[battleForm.winner]?.label || "?"}, потери ${battleForm.losses}`,
      battleForm.encircled ? "Особое правило: окружение" : null,
      battleForm.blitzAdvance ? "Особое правило: блицкриг-шаг" : null,
      battleForm.note ? `Заметка: ${battleForm.note}` : null,
    ].filter(Boolean).join("\n");
  }, [byId, battleAttacker, battleDefender, battleForm, battleProvince, crisisRules.phase, garrisonRules, germanRecommendedBudget, sovietRecommendedBudget, turn]);

  useEffect(() => {
    networkEnabledRef.current = networkEnabled;
  }, [networkEnabled]);

  useEffect(() => {
    if (battleAttackers.some((army) => army.id === battleForm.attacker)) return;
    setBattleForm((prev) => ({ ...prev, attacker: battleAttackers[0]?.id || "" }));
  }, [battleAttackers, battleForm.attacker]);

  useEffect(() => {
    if (battleDefenders.some((army) => army.id === battleForm.defender)) return;
    setBattleForm((prev) => ({ ...prev, defender: battleDefenders[0]?.id || "" }));
  }, [battleDefenders, battleForm.defender]);

  useEffect(() => {
    if (!networkEnabled) return undefined;
    const frontQuery = encodeURIComponent(controlledFronts.join(","));
    const events = new EventSource(`/api/events?side=${playerSide}&fronts=${frontQuery}`);
    events.onopen = () => setNetworkStatus(`Подключено: ${ownerConfig[playerSide].label}`);
    events.onerror = () => setNetworkStatus("Связь с сервером потеряна. Проверь npm run network.");
    events.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.state) applyNetworkState(data.state);
    };
    return () => events.close();
  }, [networkEnabled, playerSide, controlledFronts]);

  function getCampaignSnapshot() {
    return { provinces, links, armies, battleLog, battleRequests, turn, unitRows };
  }

  function normalizeCampaignSnapshot(source) {
    const state = source?.campaign || source?.state || source || {};
    return {
      provinces: Array.isArray(state.provinces) ? mergeCampaignProvinces(state.provinces) : campaignStartProvinces,
      links,
      armies: Array.isArray(state.armies) ? state.armies.map((army) => ({ ...army, front: getArmyFront(army) })) : initialArmies,
      battleLog: Array.isArray(state.battleLog) ? state.battleLog : [],
      battleRequests: Array.isArray(state.battleRequests) ? state.battleRequests : [],
      turn: Number(state.turn) || 1,
      unitRows: Array.isArray(state.unitRows)
        ? state.unitRows.map((row) => ({ doctrine: commonDoctrine, resource: "ЛС", command: 0, ...row }))
        : initialUnitRows,
    };
  }

  function applyCampaignSnapshot(source, successMessage, syncNetwork = false) {
    const next = normalizeCampaignSnapshot(source);
    setProvinces(next.provinces);
    setArmies(next.armies);
    setBattleLog(next.battleLog);
    setBattleRequests(next.battleRequests);
    setUnitRows(next.unitRows);
    setTurn(next.turn);
    setSelectedProvinceId((current) => (next.provinces.some((province) => province.id === current) ? current : "minsk"));
    if (syncNetwork) sendNetworkAction("reset", { state: next });
    if (successMessage) setMessage(successMessage);
  }

  function applyNetworkState(state) {
    applyCampaignSnapshot(state, "", false);
  }

  async function connectNetwork() {
    try {
      setNetworkStatus("Подключаемся к серверу...");
      const initResponse = await fetch("/api/init", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ state: getCampaignSnapshot() }),
      });
      if (!initResponse.ok) throw new Error("init_failed");
      const stateResponse = await fetch(`/api/state?side=${playerSide}&fronts=${encodeURIComponent(controlledFronts.join(","))}`);
      if (!stateResponse.ok) throw new Error("state_failed");
      const data = await stateResponse.json();
      if (data.state) applyNetworkState(data.state);
      setNetworkEnabled(true);
      setNetworkStatus(`Подключено: ${ownerConfig[playerSide].label}`);
    } catch (error) {
      setNetworkEnabled(false);
      setNetworkStatus("Сервер не найден. Запусти npm run build, затем npm run network.");
    }
  }

  function disconnectNetwork() {
    setNetworkEnabled(false);
    setNetworkStatus("Сеть выключена.");
  }

  async function sendNetworkAction(type, payload = {}) {
    if (!networkEnabledRef.current) return false;
    try {
      const response = await fetch("/api/action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, side: playerSide, fronts: controlledFronts, payload }),
      });
      if (!response.ok) throw new Error(type);
      return true;
    } catch (error) {
      setNetworkStatus("Не удалось отправить действие на сервер.");
      return false;
    }
  }

  function updateProvince(id, patch) {
    sendNetworkAction("updateProvince", { id, patch });
    setProvinces((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  }

  function updateArmy(id, patch) {
    sendNetworkAction("updateArmy", { id, patch });
    setArmies((prev) => prev.map((a) => (a.id === id ? { ...a, ...patch } : a)));
  }

  function selectPlayerSide(side) {
    setPlayerSide(side);
    const nextFronts = getFrontIdsForSide(side);
    setControlledFronts(nextFronts);
    selectUnitSide(side);
    const nextFrontSet = new Set(nextFronts);
    const nextOwnProvinceIds = armies.filter((army) => army.side === side && nextFrontSet.has(getArmyFront(army))).map((army) => army.province);
    const nextReconProvinceIds = new Set(nextOwnProvinceIds);
    nextOwnProvinceIds.forEach((id) => getNeighbors(id).forEach((neighborId) => nextReconProvinceIds.add(neighborId)));
    const ownArmy = armies.find((army) => army.side === side && nextFrontSet.has(getArmyFront(army)));
    const contactArmy = armies.find((army) => army.side !== side && nextReconProvinceIds.has(army.province));
    setBattleForm((prev) => ({
      ...prev,
      attacker: ownArmy?.id || prev.attacker,
      defender: contactArmy?.id || prev.defender,
      winner: side,
    }));
  }

  function toggleControlledFront(frontId) {
    setControlledFronts((prev) => {
      if (prev.includes(frontId) && prev.length > 1) return prev.filter((id) => id !== frontId);
      if (prev.includes(frontId)) return prev;
      return [...prev, frontId];
    });
  }

  function selectAllFrontsForCurrentSide() {
    setControlledFronts(getFrontIdsForSide(playerSide));
  }

  function formatArmyOption(army) {
    const provinceName = byId[army.province]?.name || "неизвестно";
    if (army.garrison) return `Гарнизон · ${provinceName} (${getModPresetForBudget(army.budget)})`;
    if (army.side === playerSide) return `${army.id} · ${army.name} (${provinceName})`;
    return `Контакт · ${provinceName}`;
  }

  function updateUnitRow(id, patch) {
    commitUnitRows((prev) => prev.map((row) => (row.id === id ? { ...row, ...patch } : row)));
  }

  function commitUnitRows(updater) {
    setUnitRows((prev) => {
      const next = updater(prev);
      sendNetworkAction("setUnitRows", { unitRows: next.filter((row) => row.side === unitCalculator.side) });
      return next;
    });
  }

  function selectUnitSide(side) {
    const nextDoctrine = getDoctrineOptions(side).includes(unitCalculator.doctrine) ? unitCalculator.doctrine : commonDoctrine;
    const nextUnits = getCatalogUnits(side, nextDoctrine);
    setUnitCalculator((prev) => ({ ...prev, side, doctrine: nextDoctrine, unitId: nextUnits[0]?.id || "" }));
  }

  function selectDoctrine(doctrine) {
    const nextUnits = getCatalogUnits(unitCalculator.side, doctrine);
    setUnitCalculator((prev) => ({ ...prev, doctrine, unitId: nextUnits[0]?.id || "" }));
  }

  function addCatalogUnit() {
    if (!selectedCatalogUnit) return;
    commitUnitRows((prev) => [...prev, makeUnitRow(selectedCatalogUnit, `unit-${selectedCatalogUnit.id}-${Date.now()}`)]);
  }

  function addUnitRow() {
    commitUnitRows((prev) => [
      ...prev,
      { id: `unit-${Date.now()}`, side: unitCalculator.side, doctrine: unitCalculator.doctrine, category: "Пехота", name: "", cost: 0, resource: "ЛС", command: 0, count: 1 },
    ]);
  }

  function removeUnitRow(id) {
    commitUnitRows((prev) => prev.filter((row) => row.id !== id));
  }

  function clearUnitRowsForSide() {
    commitUnitRows((prev) => prev.filter((row) => row.side !== unitCalculator.side));
  }

  function nextTurn() {
    setTurn((prev) => {
      const next = prev + 1;
      sendNetworkAction("setTurn", { turn: next });
      return next;
    });
  }

  function resetCampaign() {
    const resetState = { provinces: campaignStartProvinces, links, armies: initialArmies, battleLog: [], battleRequests: [], turn: 1, unitRows: initialUnitRows };
    setProvinces(resetState.provinces);
    setArmies(resetState.armies);
    setBattleLog(resetState.battleLog);
    setBattleRequests(resetState.battleRequests);
    setUnitRows(resetState.unitRows);
    setUnitCalculator({ side: "germany", strength: 3, budget: 7000, doctrine: "Универсальная", unitId: "g-u-riflemen" });
    setTurn(resetState.turn);
    setSelectedProvinceId("minsk");
    setBattleForm({ province: "minsk", attacker: "G2", defender: "S2", winner: "germany", losses: "средние", note: "", encircled: false, blitzAdvance: false });
    sendNetworkAction("reset", { state: resetState });
    setMessage("Кампания сброшена.");
  }

  function saveCampaign() {
    try {
      const data = getCampaignSnapshot();
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
      applyCampaignSnapshot(data, "Кампания загружена.", networkEnabledRef.current);
    } catch (error) {
      setMessage("Не удалось загрузить сохранение.");
    }
  }

  function exportCampaign() {
    try {
      const exportedAt = new Date().toISOString();
      const payload = {
        app: "goh-campaign-map",
        version: 1,
        exportedAt,
        campaign: getCampaignSnapshot(),
      };
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `goh-campaign-turn-${turn}-${exportedAt.slice(0, 10)}.json`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      setMessage("Кампания экспортирована в JSON-файл.");
    } catch (error) {
      setMessage("Не удалось экспортировать кампанию.");
    }
  }

  function openImportDialog() {
    importFileRef.current?.click();
  }

  async function importCampaignFile(event) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    try {
      const raw = await file.text();
      const data = JSON.parse(raw);
      applyCampaignSnapshot(data, `Кампания импортирована из файла ${file.name}.`, networkEnabledRef.current);
    } catch (error) {
      setMessage("Не удалось импортировать файл кампании. Проверь JSON-файл.");
    }
  }

  async function copyBattleBriefing() {
    try {
      await navigator.clipboard.writeText(battleBriefingText);
      setMessage("Брифинг боя скопирован.");
    } catch (error) {
      setMessage("Не удалось скопировать брифинг боя.");
    }
  }

  function addBattle() {
    if (!battleCanSubmit) {
      setMessage(`Нельзя создать бой: ${battleRouteText}`);
      return;
    }

    if (networkEnabledRef.current) {
      sendNetworkAction("submitBattleRequest", { battleForm });
      setBattleForm((prev) => ({ ...prev, note: "", encircled: false, blitzAdvance: false }));
      setMessage("Заявка на бой отправлена второй стороне.");
      return;
    }

    const attacker = armies.find((a) => a.id === battleForm.attacker);
    const defender = battleDefender;
    const province = byId[battleForm.province];

    if (!province || !attacker || !defender) {
      setMessage("Проверь провинцию, атакующего и обороняющегося.");
      return;
    }

    const battleArmies = [attacker, defender];
    const sovietArmy = battleArmies.find((army) => army.side === "ussr");
    const germanArmy = battleArmies.find((army) => army.side === "germany");
    const sovietBudget = getBattleBudget(sovietArmy, crisisRules);
    const germanBudget = getBattleBudget(germanArmy, crisisRules);
    const campaignNotes = [
      `Кризис: ${crisisRules.phase}`,
      sovietBudget ? `СССР: ${getModPresetForBudget(sovietBudget)}` : null,
      germanBudget ? `Германия: ${getModPresetForBudget(germanBudget)}` : null,
      defender.garrison ? `Гарнизон: ${getGarrisonRules(province).join("; ")}` : null,
      battleForm.encircled ? "Окружение: советская группа получает +1 потерю силы при поражении." : null,
      battleForm.blitzAdvance && battleForm.winner === "germany" ? "Блицкриг: Германия может занять 1 пустую соседнюю провинцию." : null,
    ].filter(Boolean);

    const entry = {
      id: Date.now(),
      turn,
      province: province.name,
      attacker: battleForm.attacker,
      defender: defender.garrison ? defender.name : battleForm.defender,
      winner: battleForm.winner,
      losses: battleForm.losses,
      note: battleForm.note,
      budget: `${getModPresetForBudget(sovietBudget)} / ${getModPresetForBudget(germanBudget)}`,
      crisisPhase: crisisRules.phase,
      campaignNotes,
    };

    setBattleLog((prev) => [entry, ...prev]);
    updateProvince(province.id, { owner: battleForm.winner });
    if (battleForm.winner === attacker.side) {
      updateArmy(attacker.id, { province: province.id });
    }

    const loserId = battleForm.winner === "germany" ? battleForm.defender : battleForm.attacker;
    const loser = armies.find((a) => a.id === loserId);
    if (loser) {
      const normalLoss = { тяжёлые: 1, разгром: 2 }[battleForm.losses] || 0;
      const encirclementLoss = battleForm.encircled && loser.side === "ussr" ? 1 : 0;
      const strengthLoss = normalLoss + encirclementLoss;
      if (strengthLoss > 0) {
        updateArmy(loser.id, { strength: Math.max(1, loser.strength - strengthLoss) });
      }
    }

    setBattleForm((prev) => ({ ...prev, note: "", encircled: false, blitzAdvance: false }));
    setMessage("Бой записан. Контроль провинции обновлён.");
  }

  function moveArmy(armyId, provinceId) {
    updateArmy(armyId, { province: provinceId });
    setSelectedProvinceId(provinceId);
  }

  function confirmBattleRequest(id) {
    sendNetworkAction("confirmBattleRequest", { id });
    setMessage("Заявка подтверждена. Сервер обновит карту и журнал.");
  }

  function rejectBattleRequest(id) {
    sendNetworkAction("rejectBattleRequest", { id });
    setMessage("Заявка отклонена.");
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
            <AppButton onClick={nextTurn}>Ход {turn} →</AppButton>
            <AppButton onClick={saveCampaign} variant="outline"><Icon>💾</Icon>Сохранить</AppButton>
            <AppButton onClick={loadCampaign} variant="outline">Загрузить</AppButton>
            <AppButton onClick={exportCampaign} variant="outline">Экспорт</AppButton>
            <AppButton onClick={openImportDialog} variant="outline">Импорт</AppButton>
            <AppButton onClick={resetCampaign} variant="outline"><Icon>↩️</Icon>Сброс</AppButton>
          </div>
        </header>
        <input
          ref={importFileRef}
          type="file"
          accept="application/json,.json"
          className="hidden"
          onChange={importCampaignFile}
        />

        <Panel>
          <PanelBody className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="font-bold">Сторона игрока</h2>
              <p className="text-sm text-stone-600">Туман войны скрывает точный состав противника. В соседних с вашими армиями провинциях видны только контакты.</p>
            </div>
            <div className="space-y-2 md:w-[390px]">
              <div className="grid grid-cols-2 gap-2">
                {playerSides.map((side) => (
                  <AppButton
                    key={side}
                    variant={playerSide === side ? "solid" : "outline"}
                    onClick={() => selectPlayerSide(side)}
                  >
                    {ownerConfig[side].label}
                  </AppButton>
                ))}
              </div>
              <div className="rounded-2xl border bg-white p-2">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span className="text-xs font-bold uppercase text-stone-500">Фронты под управлением</span>
                  <button type="button" className="text-xs font-semibold text-stone-600 underline-offset-4 hover:underline" onClick={selectAllFrontsForCurrentSide}>
                    Взять все
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {(frontSlots[playerSide] || []).map((front) => (
                    <button
                      key={front.id}
                      type="button"
                      onClick={() => toggleControlledFront(front.id)}
                      className={`rounded-xl border px-2 py-1.5 text-sm font-semibold transition ${controlledFronts.includes(front.id) ? "border-stone-900 bg-stone-900 text-white" : "border-stone-300 bg-white text-stone-700 hover:bg-stone-100"}`}
                    >
                      {front.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-[1fr_auto] gap-2">
                <div className={`rounded-2xl border px-3 py-2 text-sm ${networkEnabled ? "border-emerald-300 bg-emerald-50 text-emerald-900" : "border-stone-300 bg-white text-stone-600"}`}>
                  {networkStatus}
                </div>
                <AppButton onClick={networkEnabled ? disconnectNetwork : connectNetwork} variant={networkEnabled ? "outline" : "solid"}>
                  {networkEnabled ? "Отключить" : "Сеть"}
                </AppButton>
              </div>
            </div>
          </PanelBody>
        </Panel>

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
                  {provinces.map((p) => {
                    const offset = markerLabelOffsets[p.id];
                    if (!offset) return null;
                    const labelX = p.x + offset.x;
                    const labelY = p.y + offset.y;
                    return (
                      <line
                        key={`${p.id}-label-offset`}
                        x1={p.x}
                        y1={p.y}
                        x2={labelX}
                        y2={labelY}
                        stroke="rgba(25,25,25,.62)"
                        strokeWidth="0.24"
                      />
                    );
                  })}
                </svg>

                {provinces.map((p) => {
                  const isSelected = p.id === selectedProvinceId;
                  const offset = markerLabelOffsets[p.id] || { x: 0, y: 0 };
                  const labelX = p.x + offset.x;
                  const labelY = p.y + offset.y;
                  const armiesHere = armies.filter((a) => a.province === p.id);
                  const ownArmiesHere = armiesHere.filter((army) => army.side === playerSide && controlledFrontSet.has(getArmyFront(army)));
                  const alliedArmiesHere = armiesHere.filter((army) => army.side === playerSide && !controlledFrontSet.has(getArmyFront(army)));
                  const enemyContactCount = armiesHere.filter((army) => army.side !== playerSide).length;
                  const showEnemyContact = enemyContactCount > 0 && reconProvinceIds.has(p.id);
                  const showAlliedContact = alliedArmiesHere.length > 0;
                  const isCompact = !isSelected && ownArmiesHere.length === 0 && !showEnemyContact && !showAlliedContact && p.points === 0 && p.type.includes("переход");
                  const cfg = ownerConfig[p.owner] || ownerConfig.neutral;
                  const markerSizeClass = isCompact ? "min-w-[46px] max-w-[84px] rounded-md px-1 py-0.5" : "min-w-[72px] max-w-[118px] rounded-lg px-1.5 py-1";
                  const dotSizeClass = isCompact ? "h-2 w-2" : "h-2.5 w-2.5";
                  const labelSizeClass = isCompact ? "text-[9px]" : "text-[10px]";
                  return (
                    <button
                      key={p.id}
                      onClick={() => {
                        setSelectedProvinceId(p.id);
                        setBattleForm((bf) => ({ ...bf, province: p.id }));
                      }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 border-2 bg-opacity-90 text-left shadow-md backdrop-blur-[1px] transition hover:z-30 hover:scale-110 ${markerSizeClass} ${cfg.fill} ${cfg.border} ${isSelected ? "z-30 ring-2 ring-amber-400" : "z-20"}`}
                      style={{ left: `${labelX}%`, top: `${labelY}%` }}
                    >
                      <div className="flex items-center gap-1">
                        <span className={`${dotSizeClass} rounded-full ${cfg.dot}`} />
                        <span className={`${labelSizeClass} font-bold leading-tight`}>{p.name}</span>
                      </div>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {ownArmiesHere.map((a) => (
                          <span key={a.id} className={`rounded-full px-1.5 py-0.5 text-[9px] font-black ${ownerConfig[playerSide].marker}`}>{a.id}:{a.strength}</span>
                        ))}
                        {showEnemyContact && (
                          <span className="rounded-full bg-amber-200 px-1.5 py-0.5 text-[9px] font-black text-amber-950">контакт</span>
                        )}
                        {showAlliedContact && (
                          <span className="rounded-full bg-sky-100 px-1.5 py-0.5 text-[9px] font-black text-sky-900">союзник</span>
                        )}
                      </div>
                    </button>
                  );
                })}

                <div className="absolute bottom-3 left-3 z-40 flex max-w-[calc(100%-1.5rem)] flex-wrap gap-2 rounded-xl border bg-white/90 p-2 text-xs shadow-sm backdrop-blur">
                  <span className="flex items-center gap-1"><span className="h-3 w-3 rounded-full bg-red-700" /> СССР</span>
                  <span className="flex items-center gap-1"><span className="h-3 w-3 rounded-full bg-zinc-800" /> Германия</span>
                  <span className="flex items-center gap-1"><span className="h-3 w-3 rounded-full bg-amber-300" /> контакт</span>
                  <span className="flex items-center gap-1"><span className="h-3 w-3 rounded-full bg-sky-200" /> союзник</span>
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
                {visibleProvinceArmies.length === 0 && selectedEnemyContacts.length === 0 && <p className="text-sm text-stone-500">В этой провинции нет видимых армий.</p>}
                {selectedEnemyContacts.length > 0 && (
                  <div className="rounded-2xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-950">
                    <b>Вражеский контакт</b>
                    <div className="mt-1 text-xs">Состав и сила скрыты туманом войны. Точный отряд раскрывается только после боя или разведки.</div>
                  </div>
                )}
                {alliedProvinceArmies.length > 0 && (
                  <div className="rounded-2xl border border-sky-200 bg-sky-50 p-3 text-sm text-sky-950">
                    <b>Союзный фронт</b>
                    <div className="mt-1 text-xs">Армия вашей стороны находится здесь, но этот фронт сейчас не выбран для управления.</div>
                  </div>
                )}
                {visibleProvinceArmies.map((a) => (
                  <div key={a.id} className="space-y-2 rounded-2xl border bg-white p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <b className={a.side === "germany" ? "text-zinc-900" : "text-red-800"}>{a.id} — {a.name}</b>
                        <div className="text-xs text-stone-500">{frontLabelById[getArmyFront(a)] || "Фронт"}</div>
                      </div>
                      <span className="text-sm">Сила: {a.strength}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <select className="rounded-xl border px-2 py-1 text-sm" value={a.province} onChange={(e) => moveArmy(a.id, e.target.value)}>
                        {provinces.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                      </select>
                      <select className="rounded-xl border px-2 py-1 text-sm" value={a.strength} onChange={(e) => updateArmy(a.id, { strength: Number(e.target.value) })}>
                        {strengthLevels.map((n) => <option key={n} value={n}>Сила {n} · {calcBudget(n)} очков</option>)}
                      </select>
                    </div>
                  </div>
                ))}
              </PanelBody>
            </Panel>

            <Panel>
              <PanelBody className="space-y-3">
                <h3 className="flex items-center gap-2 font-bold"><Icon>⚔️</Icon> {networkEnabled ? "Создать заявку на бой" : "Добавить результат боя"}</h3>
                <div className="grid grid-cols-2 gap-2">
                  <select className="col-span-2 rounded-xl border px-2 py-2 text-sm" value={battleForm.province} onChange={(e) => setBattleForm({ ...battleForm, province: e.target.value })}>
                    {provinces.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>
                  <select className="rounded-xl border px-2 py-2 text-sm" value={battleAttackerIsValid ? battleForm.attacker : ""} onChange={(e) => setBattleForm({ ...battleForm, attacker: e.target.value })}>
                    {battleAttackers.length === 0 && <option value="">Нет армии рядом</option>}
                    {battleAttackers.map((a) => <option key={a.id} value={a.id}>{formatArmyOption(a)}</option>)}
                  </select>
                  <select className="rounded-xl border px-2 py-2 text-sm" value={battleDefenderIsValid ? battleForm.defender : ""} onChange={(e) => setBattleForm({ ...battleForm, defender: e.target.value })}>
                    {battleDefenders.length === 0 && <option value="">Нет контакта или гарнизона</option>}
                    {battleDefenders.map((a) => <option key={a.id} value={a.id}>{formatArmyOption(a)}</option>)}
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
                  <label className="flex items-center gap-2 rounded-xl border bg-white px-3 py-2 text-sm">
                    <input
                      type="checkbox"
                      checked={battleForm.encircled}
                      onChange={(e) => setBattleForm({ ...battleForm, encircled: e.target.checked })}
                    />
                    Окружение
                  </label>
                  <label className="flex items-center gap-2 rounded-xl border bg-white px-3 py-2 text-sm">
                    <input
                      type="checkbox"
                      checked={battleForm.blitzAdvance}
                      onChange={(e) => setBattleForm({ ...battleForm, blitzAdvance: e.target.checked })}
                    />
                    Блицкриг-шаг
                  </label>
                  <input className="col-span-2 rounded-xl border px-3 py-2 text-sm" placeholder="Примечание" value={battleForm.note} onChange={(e) => setBattleForm({ ...battleForm, note: e.target.value })} />
                </div>
                <div className={`rounded-2xl border px-3 py-2 text-xs ${battleCanSubmit ? "border-emerald-200 bg-emerald-50 text-emerald-950" : "border-amber-200 bg-amber-50 text-amber-950"}`}>
                  {battleRouteText}
                </div>
                <AppButton onClick={addBattle} className="w-full" disabled={!battleCanSubmit}><Icon>＋</Icon>{networkEnabled ? "Отправить заявку" : "Записать бой"}</AppButton>
              </PanelBody>
            </Panel>

            <Panel>
              <PanelBody className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold">Подготовка боя</h3>
                    <p className="text-sm text-stone-600">{battleProvince?.name || "Провинция не выбрана"} · ход {turn}</p>
                  </div>
                  <span className={`rounded-full px-2 py-1 text-xs font-bold ${battleCanSubmit ? "bg-emerald-100 text-emerald-900" : "bg-amber-100 text-amber-900"}`}>
                    {battleCanSubmit ? "готово" : "нужно выбрать бой"}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="rounded-2xl border bg-white p-3">
                    <div className="text-xs font-bold uppercase text-stone-500">Атака</div>
                    <div className="mt-1 font-bold">{battleAttacker ? `${battleAttacker.id} — ${battleAttacker.name}` : "не выбрана"}</div>
                    <div className="text-xs text-stone-500">
                      {battleAttacker ? `${ownerConfig[battleAttacker.side]?.label} · сила ${battleAttacker.strength}` : "выбери свою армию"}
                    </div>
                  </div>
                  <div className="rounded-2xl border bg-white p-3">
                    <div className="text-xs font-bold uppercase text-stone-500">Оборона</div>
                    <div className="mt-1 font-bold">{battleDefender ? (battleDefender.garrison ? battleDefender.name : `${ownerConfig[battleDefender.side]?.label} · контакт`) : "не выбрана"}</div>
                    <div className="text-xs text-stone-500">
                      {battleDefender ? (battleDefender.garrison ? `${getModPresetForBudget(battleDefender.budget)} · ${garrisonRules[0]}` : `${battleProvince?.name || "провинция"} · точный состав скрыт`) : "нужен контакт противника"}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="rounded-2xl bg-zinc-100 p-3">
                    <div className="text-xs font-bold uppercase text-zinc-600">Германия</div>
                    <div className="text-lg font-black">{germanRecommendedBudget ? getModPresetForBudget(germanRecommendedBudget) : "не выбрана"}</div>
                  </div>
                  <div className="rounded-2xl bg-red-50 p-3 text-red-950">
                    <div className="text-xs font-bold uppercase text-red-700">СССР</div>
                    <div className="text-lg font-black">{sovietRecommendedBudget ? getModPresetForBudget(sovietRecommendedBudget) : "не выбран"}</div>
                    {sovietBaseBudget && crisisRules.ussrBudgetCap && sovietBaseBudget > crisisRules.ussrBudgetCap && (
                      <div className="mt-1 text-xs">Кризис режет бюджет с {sovietBaseBudget} ЛС.</div>
                    )}
                  </div>
                </div>

                {battleDefender?.garrison && (
                  <div className="rounded-2xl border border-amber-200 bg-amber-50 p-3 text-xs leading-relaxed text-amber-950">
                    <div className="font-bold">Гарнизон провинции</div>
                    <div className="mt-1">Если в провинции нет армии владельца, оборона играет на бюджет гарнизона. Гарнизон не отступает и не сохраняется после поражения.</div>
                    <div className="mt-1">{garrisonRules.join("; ")}.</div>
                  </div>
                )}

                <div className="rounded-2xl border bg-stone-50 p-3 text-xs leading-relaxed text-stone-700">
                  <div className="font-bold text-stone-900">Перед запуском матча</div>
                  <ul className="mt-1 space-y-1">
                    <li>· В лобби выбрать GOH Campaign Mode и нужный бюджет ЛС.</li>
                    <li>· Карту выбрать по договоренности: {battleProvince?.name || "выбранная провинция"} или ближайший подходящий бой.</li>
                    <li>· Доктрину и год сверить с текущим этапом кампании и правилами кризиса 1941.</li>
                    <li>· После боя записать победителя, потери, окружение и блицкриг-шаг.</li>
                  </ul>
                </div>

                <AppButton onClick={copyBattleBriefing} variant="outline" className="w-full" disabled={!battleCanSubmit}>
                  Скопировать брифинг
                </AppButton>
              </PanelBody>
            </Panel>

            {networkEnabled && (
              <Panel>
                <PanelBody className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-bold">Заявки на бой</h3>
                    <span className="rounded-full bg-stone-100 px-2 py-1 text-xs font-bold text-stone-700">{battleRequests.length}</span>
                  </div>
                  {battleRequests.length === 0 && <p className="text-sm text-stone-500">Ожидающих заявок нет.</p>}
                  {battleRequests.map((request) => (
                    <div key={request.id} className={`space-y-2 rounded-2xl border p-3 ${request.canConfirm ? "border-amber-300 bg-amber-50" : "bg-white"}`}>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="font-bold">{request.provinceName}</div>
                          <div className="text-xs text-stone-500">Ход {request.turn} · {request.crisisPhase}</div>
                        </div>
                        <span className="rounded-full bg-white px-2 py-1 text-xs font-bold text-stone-700">
                          {request.canConfirm ? "Нужно подтвердить" : "Ожидает соперника"}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="rounded-xl bg-white/80 p-2">
                          <div className="text-xs font-bold text-stone-500">Атака</div>
                          <div>{request.attackerLabel}</div>
                        </div>
                        <div className="rounded-xl bg-white/80 p-2">
                          <div className="text-xs font-bold text-stone-500">Оборона</div>
                          <div>{request.defenderLabel}</div>
                        </div>
                      </div>
                      <div className="text-sm">
                        Победитель: <b>{ownerConfig[request.winner]?.label}</b> · Потери: <b>{request.losses}</b>
                      </div>
                      {(request.encircled || request.blitzAdvance || request.note) && (
                        <div className="text-xs text-stone-600">
                          {request.note && <div>{request.note}</div>}
                          {request.encircled && <div>Окружение отмечено.</div>}
                          {request.blitzAdvance && <div>Блицкриг-шаг отмечен.</div>}
                        </div>
                      )}
                      {request.canConfirm && (
                        <div className="grid grid-cols-2 gap-2">
                          <AppButton onClick={() => confirmBattleRequest(request.id)}>Подтвердить</AppButton>
                          <AppButton onClick={() => rejectBattleRequest(request.id)} variant="outline">Отклонить</AppButton>
                        </div>
                      )}
                    </div>
                  ))}
                </PanelBody>
              </Panel>
            )}

            <Panel>
              <PanelBody className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold">Кризис 1941</h3>
                    <p className="text-sm text-stone-600">Ход {turn} · {crisisRules.phase}</p>
                  </div>
                  <span className={`rounded-full border px-2 py-1 text-xs font-bold ${crisisRules.tone}`}>
                    СССР {crisisRules.ussrBudgetCap ? `до ${crisisRules.ussrBudgetCap}` : "без лимита"}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="rounded-2xl bg-red-50 p-3 text-red-950">
                    <div className="text-xs font-bold uppercase tracking-wide text-red-700">СССР</div>
                    <div className="mt-1 text-lg font-black">
                      {sovietRecommendedBudget ? getModPresetForBudget(sovietRecommendedBudget) : "Выберите армию"}
                    </div>
                    {sovietBaseBudget && crisisRules.ussrBudgetCap && sovietBaseBudget > crisisRules.ussrBudgetCap && (
                      <div className="mt-1 text-xs">Срезано с {sovietBaseBudget} ЛС из-за кризиса.</div>
                    )}
                  </div>
                  <div className="rounded-2xl bg-zinc-100 p-3 text-zinc-950">
                    <div className="text-xs font-bold uppercase tracking-wide text-zinc-600">Германия</div>
                    <div className="mt-1 text-lg font-black">
                      {germanRecommendedBudget ? getModPresetForBudget(germanRecommendedBudget) : "Выберите армию"}
                    </div>
                    <div className="mt-1 text-xs">Обычный бюджет по силе группы.</div>
                  </div>
                </div>
                <div className="rounded-2xl border bg-stone-50 p-3 text-xs leading-relaxed text-stone-700">
                  <div className="font-bold text-stone-900">Правила СССР</div>
                  <ul className="mt-1 space-y-1">
                    {crisisRules.ussrRules.map((rule) => <li key={rule}>· {rule}</li>)}
                  </ul>
                  <div className="mt-3 font-bold text-stone-900">Инициатива Германии</div>
                  <ul className="mt-1 space-y-1">
                    {crisisRules.germanyRules.map((rule) => <li key={rule}>· {rule}</li>)}
                  </ul>
                </div>
                <div className="rounded-2xl border border-stone-200 bg-white p-3 text-xs text-stone-600">
                  {crisisRules.germanyInitiative}
                </div>
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
                  <div className="rounded-xl border bg-stone-50 px-2 py-2 text-sm font-semibold">
                    {ownerConfig[playerSide].label}
                  </div>
                  <select
                    className="rounded-xl border px-2 py-2 text-sm"
                    value={calculatorBudget}
                    onChange={(e) => setUnitCalculator((prev) => ({ ...prev, budget: Number(e.target.value) }))}
                  >
                    {calculatorBudgetOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                  </select>
                  <select
                    className="col-span-2 rounded-xl border px-2 py-2 text-sm"
                    value={unitCalculator.doctrine}
                    onChange={(e) => selectDoctrine(e.target.value)}
                  >
                    {doctrineOptions.map((doctrine) => <option key={doctrine}>{doctrine}</option>)}
                  </select>
                  <select
                    className="col-span-2 rounded-xl border px-2 py-2 text-sm"
                    value={selectedCatalogUnit?.id || ""}
                    onChange={(e) => setUnitCalculator((prev) => ({ ...prev, unitId: e.target.value }))}
                  >
                    {catalogUnits.map((unit) => (
                      <option key={unit.id} value={unit.id}>
                        {unit.name} · {unit.cost} {unit.resource} / {unit.command} КО
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="rounded-2xl bg-stone-100 p-3">
                    <div className="text-xs text-stone-500">Бюджет ЛС</div>
                    <div className="text-lg font-black">{calculatorBudget}</div>
                  </div>
                  <div className="rounded-2xl bg-stone-100 p-3">
                    <div className="text-xs text-stone-500">Набрано ЛС</div>
                    <div className="text-lg font-black">{calculatorTotal}</div>
                  </div>
                  <div className={`rounded-2xl p-3 ${calculatorRemaining < 0 ? "bg-red-100 text-red-900" : "bg-emerald-100 text-emerald-900"}`}>
                    <div className="text-xs opacity-75">Баланс</div>
                    <div className="text-lg font-black">{calculatorRemaining}</div>
                  </div>
                  <div className="rounded-2xl bg-stone-100 p-3">
                    <div className="text-xs text-stone-500">ОД / КО</div>
                    <div className="text-lg font-black">{calculatorDoctrineTotal} / {calculatorCommandTotal}</div>
                  </div>
                </div>
                <div className="rounded-2xl border bg-stone-50 p-3 text-xs text-stone-600">
                  Цены: {guideSource.period}, Steam-гайд “{guideSource.title}”.
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
                          className="col-span-4 rounded-xl border px-2 py-2 text-sm"
                          value={row.category}
                          onChange={(e) => updateUnitRow(row.id, { category: e.target.value })}
                        >
                          {unitCategories.map((category) => <option key={category}>{category}</option>)}
                        </select>
                        <select
                          className="rounded-xl border px-2 py-2 text-sm"
                          value={row.resource || "ЛС"}
                          onChange={(e) => updateUnitRow(row.id, { resource: e.target.value })}
                          aria-label="Ресурс"
                        >
                          <option>ЛС</option>
                          <option>ОД</option>
                        </select>
                        <input
                          className="rounded-xl border px-2 py-2 text-sm"
                          type="number"
                          min="0"
                          step="1"
                          placeholder="ЛС"
                          value={row.cost}
                          onChange={(e) => updateUnitRow(row.id, { cost: Number(e.target.value) })}
                          aria-label="Цена"
                        />
                        <input
                          className="rounded-xl border px-2 py-2 text-sm"
                          type="number"
                          min="0"
                          placeholder="КО"
                          value={row.command ?? 0}
                          onChange={(e) => updateUnitRow(row.id, { command: Number(e.target.value) })}
                          aria-label="Командные очки"
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
                      <div className="mt-2 flex items-center justify-between gap-2 text-xs font-bold text-stone-600">
                        <span>{row.doctrine || commonDoctrine}</span>
                        <span>{(Number(row.cost) || 0) * (Number(row.count) || 0)} {row.resource || "ЛС"} · {(Number(row.command) || 0) * (Number(row.count) || 0)} КО</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <AppButton onClick={addCatalogUnit}>Добавить из списка</AppButton>
                  <AppButton onClick={addUnitRow} variant="outline">Своя строка</AppButton>
                  <AppButton onClick={clearUnitRowsForSide} variant="outline" className="col-span-2">Очистить сторону</AppButton>
                </div>
                <div className="text-right">
                  <a className="text-xs font-semibold text-stone-500 underline-offset-4 hover:underline" href={guideSource.url} target="_blank" rel="noreferrer">
                    Открыть источник цен
                  </a>
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
              <AppButton
                variant="outline"
                onClick={() => {
                  sendNetworkAction("clearBattleLog");
                  setBattleLog([]);
                }}
              >
                <Icon>🗑️</Icon>Очистить
              </AppButton>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left">
                    <th className="p-2">Ход</th><th className="p-2">Провинция</th><th className="p-2">Атака</th><th className="p-2">Оборона</th><th className="p-2">Победитель</th><th className="p-2">Пресеты</th><th className="p-2">Потери</th><th className="p-2">Кампания</th>
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
                      <td className="p-2 whitespace-nowrap">{b.budget}</td>
                      <td className="p-2">{b.losses}</td>
                      <td className="p-2">
                        {b.note && <div className="font-semibold">{b.note}</div>}
                        {b.crisisPhase && <div className="text-xs text-stone-500">{b.crisisPhase}</div>}
                        {Array.isArray(b.campaignNotes) && b.campaignNotes.length > 0 && (
                          <div className="mt-1 flex flex-wrap gap-1">
                            {b.campaignNotes.map((note) => (
                              <span key={note} className="rounded-full bg-stone-100 px-2 py-0.5 text-[11px] text-stone-700">{note}</span>
                            ))}
                          </div>
                        )}
                      </td>
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
