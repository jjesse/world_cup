# 2026 FIFA World Cup Dashboard ⚽🏆

A fan-built static dashboard for tracking the **2026 FIFA World Cup**, hosted by the United States, Canada, and Mexico. Inspired by the [NFL Stats Dashboard](https://github.com/jjesse/nfl-stats-dashboard) and [MLB Stats Dashboard](https://github.com/jjesse/mlb-stats-dashboard).

## 🌐 Dashboard Pages

| Page | Description |
|------|-------------|
| [Home](index.html) | Tournament overview, countdown timer, key dates, and host nation info |
| [Groups](groups.html) | All 12 group standings (A–L) with points, goals, and goal difference |
| [Schedule](schedule.html) | Full tournament schedule with live results for group and knockout matches |
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
- Team and fallback group-stage data live in `app.js`; the current tournament schedule/results feed is generated into `scores.js`
- Responsive design for desktop and mobile
- Filterable schedule (by group, team, or search text)
- Live countdown timer to the opening match

## 🔄 Automated Tournament Updates

Schedule, results, and stat-event data are fetched automatically from the [football-data.org](https://www.football-data.org/) World Cup API and written to `scores.js`.

- **Refresh cadence:** every 3 hours via GitHub Actions
- **Immediate refreshes:** every push to `main` that changes `app.js`, `scripts/update-scores.js`, or `.github/workflows/update-scores.yml`
- **Manual refresh:** Actions → **Update Scores** → **Run workflow**

The generated `scores.js` file now contains:

- `MATCH_SCORES` — finished-match results keyed by `home|away` for backward compatibility
- `TOURNAMENT_MATCHES` — the authoritative match schedule/results feed used to render schedule, bracket, and stats pages

### First-time setup

1. Register for a **free** API key at <https://www.football-data.org/client/register>
2. In your GitHub repository go to **Settings → Secrets and variables → Actions**
3. Add a new repository secret named `FOOTBALL_DATA_API_KEY` with your key as the value

### Manual local refresh

```bash
FOOTBALL_DATA_API_KEY=<key> node scripts/update-scores.js
```

You can also run the update manually at any time from the **Actions** tab → **Update Scores** → **Run workflow**.

## 📁 File Structure

```
world_cup/
├── index.html            # Home page with countdown & overview
├── groups.html           # 12 group standings
├── schedule.html         # Full tournament schedule and results
├── teams.html            # All 48 teams by confederation
├── bracket.html          # Knockout stage bracket
├── stats.html            # Player & team stats
├── about.html            # About & tournament info
├── styles.css            # All styling (FIFA blue/gold theme)
├── app.js                # All data & rendering logic
├── scores.js             # AUTO-GENERATED tournament schedule/results feed
├── scripts/
│   └── update-scores.js  # Fetches schedule/results from football-data.org
└── .github/workflows/
    └── update-scores.yml # Scheduled + manual GitHub Actions workflow
```

## ⚖️ Disclaimer

This is a fan project and is not affiliated with FIFA or any official tournament organization.
All data sourced from publicly available FIFA information.