/**
 * update-scores.js
 *
 * Fetches completed 2026 FIFA World Cup match results from the
 * football-data.org API and writes them to scores.js in the repo root.
 *
 * Run via GitHub Actions nightly, or manually:
 *   FOOTBALL_DATA_API_KEY=<key> node scripts/update-scores.js
 *
 * Requires: FOOTBALL_DATA_API_KEY environment variable (free key from
 *           https://www.football-data.org/client/register)
 */

'use strict';

const https = require('https');
const fs = require('fs');
const path = require('path');

const API_KEY = process.env.FOOTBALL_DATA_API_KEY;
const SCORES_JS_PATH = path.join(__dirname, '..', 'scores.js');
const HTML_FILES = [
    'index.html',
    'groups.html',
    'schedule.html',
    'teams.html',
    'bracket.html',
    'stats.html',
    'about.html',
];

// Maps football-data.org team names to the names used in app.js
const TEAM_NAME_MAP = {
    // CONCACAF
    'United States of America': 'United States',
    'USA': 'United States',
    'Curacao': 'Curaçao',
    // UEFA
    'Czechia': 'Czech Republic',
    'Czech Republic': 'Czech Republic',
    'Türkiye': 'Turkey',
    'Bosnia-Herzegovina': 'Bosnia and Herzegovina',
    // CAF
    "Côte d'Ivoire": 'Ivory Coast',
    "Cote d'Ivoire": 'Ivory Coast',
    'Congo DR': 'DR Congo',
    'DR Congo': 'DR Congo',
    'Democratic Republic of Congo': 'DR Congo',
    'Cabo Verde': 'Cape Verde',
    // AFC
    'Korea Republic': 'South Korea',
    'Republic of Korea': 'South Korea',
    'South Korea': 'South Korea',
    'IR Iran': 'Iran',
};

/**
 * Normalise an API team name to the name used in app.js SCHEDULE.
 */
function normaliseTeam(name) {
    return TEAM_NAME_MAP[name] || name;
}

/**
 * Make a GET request and return the parsed JSON response.
 */
function fetchJSON(url, headers) {
    return new Promise((resolve, reject) => {
        const req = https.get(url, { headers }, (res) => {
            let body = '';
            res.on('data', (chunk) => { body += chunk; });
            res.on('end', () => {
                if (res.statusCode !== 200) {
                    reject(new Error(`HTTP ${res.statusCode} from ${url}: ${body.slice(0, 200)}`));
                    return;
                }
                try {
                    resolve(JSON.parse(body));
                } catch (e) {
                    reject(new Error(`JSON parse error: ${e.message}`));
                }
            });
        });
        req.on('error', reject);
    });
}

function buildCacheBuster(isoTimestamp) {
    return isoTimestamp.replace(/\D/g, '').slice(0, 14);
}

function updateScoresScriptReferences(cacheBuster) {
    for (const fileName of HTML_FILES) {
        const filePath = path.join(__dirname, '..', fileName);
        const current = fs.readFileSync(filePath, 'utf8');
        const updated = current.replace(
            /src=(["'])scores\.js(?:\?v=[^"']*)?\1/g,
            (_, quote) => `src=${quote}scores.js?v=${cacheBuster}${quote}`
        );

        if (updated !== current) {
            fs.writeFileSync(filePath, updated, 'utf8');
        }
    }
}

async function main() {
    if (!API_KEY) {
        console.error('Error: FOOTBALL_DATA_API_KEY environment variable is not set.');
        console.error('Get a free key at https://www.football-data.org/client/register');
        process.exit(1);
    }

    const headers = { 'X-Auth-Token': API_KEY };

    console.log('Fetching 2026 FIFA World Cup matches from football-data.org...');
    const data = await fetchJSON(
        'https://api.football-data.org/v4/competitions/WC/matches?season=2026',
        headers
    );

    if (!data.matches || !Array.isArray(data.matches)) {
        console.error('Unexpected API response shape:', JSON.stringify(data).slice(0, 300));
        process.exit(1);
    }

    const scores = {};
    let finished = 0;

    for (const match of data.matches) {
        if (match.status !== 'FINISHED') continue;

        const home = normaliseTeam(match.homeTeam.name);
        const away = normaliseTeam(match.awayTeam.name);
        const key = `${home}|${away}`;

        const entry = {
            score: {
                home: match.score.fullTime.home,
                away: match.score.fullTime.away,
            },
        };

        // Goals / scorers (may not be present on free tier)
        if (Array.isArray(match.goals) && match.goals.length > 0) {
            entry.scorers = match.goals.map((g) => ({
                player: g.scorer?.name ?? 'Unknown',
                team: normaliseTeam(g.team?.name ?? ''),
                minute: g.minute ?? 0,
                type: g.type === 'OWN_GOAL' ? 'own goal'
                    : g.type === 'PENALTY'   ? 'penalty'
                    :                          'goal',
            }));
        }

        // Bookings / cards (may not be present on free tier)
        if (Array.isArray(match.bookings) && match.bookings.length > 0) {
            const yellows = match.bookings.filter((b) => b.card === 'YELLOW');
            const reds    = match.bookings.filter((b) => b.card === 'RED' || b.card === 'YELLOW_RED');
            if (yellows.length > 0) {
                entry.yellowCards = yellows.map((b) => ({
                    player: b.player?.name ?? 'Unknown',
                    team: normaliseTeam(b.team?.name ?? ''),
                    minute: b.minute ?? 0,
                }));
            }
            if (reds.length > 0) {
                entry.redCards = reds.map((b) => ({
                    player: b.player?.name ?? 'Unknown',
                    team: normaliseTeam(b.team?.name ?? ''),
                    minute: b.minute ?? 0,
                }));
            }
        }

        scores[key] = entry;
        finished++;
        console.log(`  ✓ ${home} ${entry.score.home}–${entry.score.away} ${away}`);
    }

    const now = new Date().toISOString();
    const output = [
        '// AUTO-GENERATED by update-scores workflow. Do not edit manually.',
        `// Last updated: ${now}`,
        `// Matches with results: ${finished}`,
        `const MATCH_SCORES = ${JSON.stringify(scores, null, 2)};`,
        '',
    ].join('\n');

    const previousScores = fs.existsSync(SCORES_JS_PATH)
        ? fs.readFileSync(SCORES_JS_PATH, 'utf8')
        : '';
    const scoresChanged = previousScores !== output;

    fs.writeFileSync(SCORES_JS_PATH, output, 'utf8');
    if (scoresChanged) {
        updateScoresScriptReferences(buildCacheBuster(now));
    }
    console.log(`\nWrote ${finished} result(s) to scores.js`);
}

main().catch((err) => {
    console.error(err.message);
    process.exit(1);
});
