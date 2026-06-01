# 2026 FIFA World Cup Dashboard ⚽🏆

A fan-built static dashboard for tracking the **2026 FIFA World Cup**, hosted by the United States, Canada, and Mexico. Inspired by the [NFL Stats Dashboard](https://github.com/jjesse/nfl-stats-dashboard) and [MLB Stats Dashboard](https://github.com/jjesse/mlb-stats-dashboard).

## 🌐 Dashboard Pages

| Page | Description |
|------|-------------|
| [Home](index.html) | Tournament overview, countdown timer, key dates, and host nation info |
| [Groups](groups.html) | All 12 group standings (A–L) with points, goals, and goal difference |
| [Schedule](schedule.html) | All 72 group stage matches with date, time, venue, and filter options |
| [Teams](teams.html) | All 48 participating nations organized by confederation |
| [Bracket](bracket.html) | Knockout stage bracket from Round of 32 through the Final |
| [About](about.html) | About the dashboard and tournament format |

## 🏆 Tournament Overview

- **Dates:** June 11 – July 19, 2026
- **Host Nations:** 🇺🇸 United States · 🇨🇦 Canada · 🇲🇽 Mexico
- **Teams:** 48 (12 groups of 4)
- **Venues:** 16 across the three host countries
- **Total Matches:** 104 (72 group stage + 32 knockout)
- **Opening Match:** Mexico vs. South Africa — June 11, Estadio Azteca
- **Final:** July 19, MetLife Stadium, New York/New Jersey

## 📋 Group Stage Groups

| Group | Teams |
|-------|-------|
| A | 🇲🇽 Mexico · 🇰🇷 South Korea · 🇿🇦 South Africa · 🇨🇿 Czech Republic |
| B | 🇨🇦 Canada · 🇧🇦 Bosnia and Herzegovina · 🇶🇦 Qatar · 🇨🇭 Switzerland |
| C | 🇧🇷 Brazil · 🇲🇦 Morocco · 🇭🇹 Haiti · 🏴󠁧󠁢󠁳󠁣󠁴󠁿 Scotland |
| D | 🇺🇸 United States · 🇵🇾 Paraguay · 🇦🇺 Australia · 🇹🇷 Turkey |
| E | 🇩🇪 Germany · 🇨🇼 Curaçao · 🇨🇮 Ivory Coast · 🇪🇨 Ecuador |
| F | 🇳🇱 Netherlands · 🇯🇵 Japan · 🇹🇳 Tunisia · 🇸🇪 Sweden |
| G | 🇧🇪 Belgium · 🇪🇬 Egypt · 🇮🇷 Iran · 🇳🇿 New Zealand |
| H | 🇪🇸 Spain · 🇨🇻 Cape Verde · 🇸🇦 Saudi Arabia · 🇺🇾 Uruguay |
| I | 🇫🇷 France · 🇸🇳 Senegal · 🇮🇶 Iraq · 🇳🇴 Norway |
| J | 🇦🇷 Argentina · 🇩🇿 Algeria · 🇦🇹 Austria · 🇯🇴 Jordan |
| K | 🇵🇹 Portugal · 🇨🇩 DR Congo · 🇺🇿 Uzbekistan · 🇨🇴 Colombia |
| L | 🏴󠁧󠁢󠁥󠁮󠁧󠁿 England · 🇭🇷 Croatia · 🇬🇭 Ghana · 🇵🇦 Panama |

## 🛠️ Technical Stack

- **Pure HTML5, CSS3, and vanilla JavaScript** — no frameworks, no build tools
- All data embedded in `app.js` for offline-capable static hosting
- Responsive design for desktop and mobile
- Filterable schedule (by group, team, or search text)
- Live countdown timer to the opening match

## 📁 File Structure

```
world_cup/
├── index.html       # Home page with countdown & overview
├── groups.html      # 12 group standings
├── schedule.html    # Full group stage schedule (72 matches)
├── teams.html       # All 48 teams by confederation
├── bracket.html     # Knockout stage bracket
├── about.html       # About & tournament info
├── styles.css       # All styling (FIFA blue/gold theme)
└── app.js           # All data & rendering logic
```

## ⚖️ Disclaimer

This is a fan project and is not affiliated with FIFA or any official tournament organization.
All data sourced from publicly available FIFA information.