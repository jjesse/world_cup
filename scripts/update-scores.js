/**
 * update-scores.js
 *
 * Fetches 2026 FIFA World Cup schedule and match results from the
 * football-data.org API and writes them to scores.js in the repo root.
 *
 * Run via GitHub Actions on a schedule, or manually:
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
    'Cape Verde Islands': 'Cape Verde',
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

/** Rate-limit delay between individual match-detail requests (free tier: 10 calls/min). */
const RATE_LIMIT_DELAY_MS = 6500;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
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

function getEasternDateTimeParts(utcDate) {
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/New_York',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    });

    const parts = formatter.formatToParts(new Date(utcDate));
    const map = Object.fromEntries(parts.map((part) => [part.type, part.value]));
    return {
        date: `${map.year}-${map.month}-${map.day}`,
        time: `${map.hour}:${map.minute} ${map.dayPeriod} ET`,
    };
}

function normalisePhase(match) {
    const stage = match.stage || '';
    switch (stage) {
    case 'GROUP_STAGE':
        return 'Group Stage';
    case 'LAST_32':
        return 'Round of 32';
    case 'LAST_16':
        return 'Round of 16';
    case 'QUARTER_FINALS':
        return 'Quarterfinals';
    case 'SEMI_FINALS':
        return 'Semifinals';
    case 'THIRD_PLACE':
        return 'Third-place Match';
    case 'FINAL':
        return 'Final';
    default:
        return stage ? stage.replace(/_/g, ' ') : 'Knockout Stage';
    }
}

function normaliseGroup(groupName) {
    const match = /^GROUP_([A-Z])$/i.exec(groupName || '');
    return match ? match[1].toUpperCase() : '';
}

function buildMatchEntry(match) {
    const { date, time } = getEasternDateTimeParts(match.utcDate);
    const entry = {
        id: match.id,
        utcDate: match.utcDate,
        date,
        time,
        phase: normalisePhase(match),
        group: normaliseGroup(match.group),
        status: match.status,
        matchday: match.matchday ?? null,
        home: normaliseTeam(match.homeTeam?.name ?? ''),
        away: normaliseTeam(match.awayTeam?.name ?? ''),
        venue: match.venue || '',
        city: match.city || '',
    };

    const fullTimeHome = match.score?.fullTime?.home;
    const fullTimeAway = match.score?.fullTime?.away;
    if (Number.isFinite(fullTimeHome) && Number.isFinite(fullTimeAway)) {
        entry.score = {
            home: fullTimeHome,
            away: fullTimeAway,
        };
    }

    const penaltiesHome = match.score?.penalties?.home;
    const penaltiesAway = match.score?.penalties?.away;
    if (Number.isFinite(penaltiesHome) && Number.isFinite(penaltiesAway)) {
        entry.shootout = {
            home: penaltiesHome,
            away: penaltiesAway,
        };
    }

    return entry;
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
    const tournamentMatches = [];
    let finished = 0;
    let detailCallsMade = 0;

    for (const match of data.matches) {
        const entry = buildMatchEntry(match);
        const key = `${entry.home}|${entry.away}`;

        // Goals/scorers and bookings/cards — the competition list endpoint may omit these
        // on the free tier, so fall back to the individual match detail endpoint when needed.
        let eventSource = match;
        const listHasEvents = 'goals' in match || 'bookings' in match;
        if (match.status === 'FINISHED' && !listHasEvents && match.id) {
            try {
                if (detailCallsMade > 0) await sleep(RATE_LIMIT_DELAY_MS);
                eventSource = await fetchJSON(
                    `https://api.football-data.org/v4/matches/${match.id}`,
                    headers
                );
                detailCallsMade++;
                console.log(`  ↳ Fetched match detail for ${entry.home} vs ${entry.away}`);
            } catch (e) {
                console.warn(`  ⚠ Match detail unavailable for ${entry.home} vs ${entry.away}: ${e.message}`);
            }
        }

        if (Array.isArray(eventSource.goals) && eventSource.goals.length > 0) {
            entry.scorers = eventSource.goals.map((g) => ({
                player: g.scorer?.name ?? 'Unknown',
                team: normaliseTeam(g.team?.name ?? ''),
                minute: g.minute ?? 0,
                type: g.type === 'OWN_GOAL' ? 'own goal'
                    : g.type === 'PENALTY'   ? 'penalty'
                    :                          'goal',
            }));
        }

        if (Array.isArray(eventSource.bookings) && eventSource.bookings.length > 0) {
            const yellows = eventSource.bookings.filter((b) => b.card === 'YELLOW');
            const reds    = eventSource.bookings.filter((b) => b.card === 'RED' || b.card === 'YELLOW_RED');
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

        tournamentMatches.push(entry);

        if (match.status === 'FINISHED' && entry.score) {
            scores[key] = {
                score: entry.score,
            };
            if (entry.shootout) scores[key].shootout = entry.shootout;
            if (entry.scorers) scores[key].scorers = entry.scorers;
            if (entry.yellowCards) scores[key].yellowCards = entry.yellowCards;
            if (entry.redCards) scores[key].redCards = entry.redCards;

            finished++;
            const shootoutSummary = entry.shootout
                ? ` (${entry.shootout.home}–${entry.shootout.away} pens)`
                : '';
            console.log(`  ✓ ${entry.home} ${entry.score.home}–${entry.score.away} ${entry.away}${shootoutSummary}`);
        }
    }

    const now = new Date().toISOString();
    const output = [
        '// AUTO-GENERATED by update-scores workflow. Do not edit manually.',
        `// Last updated: ${now}`,
        `// Matches with results: ${finished}`,
        `const TOURNAMENT_LAST_UPDATED = ${JSON.stringify(now)};`,
        `const MATCH_SCORES = ${JSON.stringify(scores, null, 2)};`,
        `const TOURNAMENT_MATCHES = ${JSON.stringify(tournamentMatches, null, 2)};`,
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

if (require.main === module) {
    main().catch((err) => {
        console.error(err.message);
        process.exit(1);
    });
}

module.exports = {
    TEAM_NAME_MAP,
    normaliseTeam,
    getEasternDateTimeParts,
    normalisePhase,
    normaliseGroup,
    buildMatchEntry,
};
