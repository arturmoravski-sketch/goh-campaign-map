# GOH Campaign Map

## GOH mod budget quick reference

In Battle Zones and Superiority the game shows only raw manpower values. To keep the team budget fixed when a map has several side slots, pick the per-slot value below.

| Team budget | 2 slots | 3 slots | 4 slots |
| --- | ---: | ---: | ---: |
| 2500 | 1250 | 833 | 625 |
| 3500 | 1750 | 1167 | 875 |
| 5000 | 2500 | 1667 | 1250 |
| 7000 | 3500 | 2333 | 1750 |
| 9000 | 4500 | 3000 | 2250 |
| 11000 | 5500 | 3667 | 2750 |

Оперативная карта кампании для Gates of Hell: провинции, контроль сторон, армии, победные очки, журнал боёв и сохранение в браузере.

## Запуск

```powershell
npm.cmd install
npm.cmd run dev
```

Сайт откроется на локальном адресе, который покажет Vite, обычно `http://localhost:5173/`.

## Сборка

```powershell
npm.cmd run build
```

## Сетевой режим

Один игрок запускает сервер кампании:

```powershell
npm.cmd run build
npm.cmd run network
```

После этого второй игрок заходит через IP хоста в Radmin, например `http://25.x.x.x:4174/`.
На сайте каждый выбирает свою сторону и нажимает `Сеть`. Сервер хранит `campaign-save.json`, а клиент получает только свои юниты и разведанные контакты противника.
