'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const APP_JS = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8');

function loadApp(globals = {}, elements = {}) {
    const document = {
        getElementById(id) {
            return elements[id] || null;
        },
        addEventListener() {},
        createElement() {
            return {
                value: '',
                textContent: '',
                appendChild() {},
            };
        },
    };

    const sandbox = {
        console,
        document,
        window: {},
        setInterval() {},
        Intl,
        Date,
        ...globals,
    };

    vm.createContext(sandbox);
    vm.runInContext(`${APP_JS}\nthis.__exports = { SCHEDULE, GROUPS, computeTeamStats, getMatchStageLabel, renderBracket };`, sandbox);
    return sandbox.__exports;
}

test('legacy score fallback matches reversed home/away teams and aliases', () => {
    const app = loadApp({
        MATCH_SCORES: {
            'New Zealand|Belgium': { score: { home: 1, away: 5 } },
            'Cape Verde Islands|Saudi Arabia': { score: { home: 0, away: 0 } },
        },
    });

    const belgiumMatch = app.SCHEDULE.find((match) => match.home === 'Belgium' && match.away === 'New Zealand');
    assert.equal(belgiumMatch.score.home, 5);
    assert.equal(belgiumMatch.score.away, 1);

    const capeVerdeMatch = app.SCHEDULE.find((match) => match.home === 'Cape Verde' && match.away === 'Saudi Arabia');
    assert.equal(capeVerdeMatch.score.home, 0);
    assert.equal(capeVerdeMatch.score.away, 0);

    const belgium = app.GROUPS.G.teams.find((team) => team.name === 'Belgium');
    assert.equal(belgium.played, 1);
    assert.equal(belgium.won, 1);
});

test('authoritative tournament feed supports knockout rendering without corrupting group tables', () => {
    const bracketContainer = { innerHTML: '' };
    const app = loadApp({
        TOURNAMENT_MATCHES: [
            {
                date: '2026-06-24',
                time: '3:00 PM ET',
                phase: 'Group Stage',
                group: 'B',
                status: 'FINISHED',
                home: 'South Africa',
                away: 'Canada',
                venue: 'BC Place',
                city: 'Vancouver',
                score: { home: 0, away: 1 },
            },
            {
                date: '2026-07-01',
                time: '7:00 PM ET',
                phase: 'Round of 32',
                status: 'FINISHED',
                home: 'Brazil',
                away: 'Japan',
                venue: 'SoFi Stadium',
                city: 'Los Angeles',
                score: { home: 2, away: 1 },
            },
        ],
    }, {
        'bracket-container': bracketContainer,
    });

    assert.equal(app.SCHEDULE.length, 2);
    assert.equal(app.getMatchStageLabel(app.SCHEDULE[1]), 'Round of 32');

    const canada = app.GROUPS.B.teams.find((team) => team.name === 'Canada');
    assert.equal(canada.played, 1);
    assert.equal(canada.won, 1);

    const brazil = app.computeTeamStats().find((team) => team.name === 'Brazil');
    assert.equal(brazil.played, 1);
    assert.equal(brazil.won, 1);

    app.renderBracket();
    assert.match(bracketContainer.innerHTML, /Round of 32/);
    assert.match(bracketContainer.innerHTML, /Brazil/);
    assert.match(bracketContainer.innerHTML, /Japan/);
});
