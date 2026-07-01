'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const {
    normaliseTeam,
    getEasternDateTimeParts,
    normalisePhase,
    normaliseGroup,
    buildMatchEntry,
} = require('./update-scores.js');

test('normalises team aliases and stage metadata from the API feed', () => {
    assert.equal(normaliseTeam('Cape Verde Islands'), 'Cape Verde');
    assert.equal(normaliseTeam('United States of America'), 'United States');
    assert.equal(normalisePhase({ stage: 'LAST_32' }), 'Round of 32');
    assert.equal(normaliseGroup('GROUP_H'), 'H');
});

test('buildMatchEntry converts kickoff times into Eastern Time and preserves shootout scores', () => {
    const dateTime = getEasternDateTimeParts('2026-07-01T23:00:00Z');
    assert.deepEqual(dateTime, { date: '2026-07-01', time: '7:00 PM ET' });

    const entry = buildMatchEntry({
        id: 104,
        utcDate: '2026-07-01T23:00:00Z',
        stage: 'LAST_32',
        group: null,
        status: 'FINISHED',
        matchday: 4,
        homeTeam: { name: 'Cape Verde Islands' },
        awayTeam: { name: 'United States of America' },
        score: {
            fullTime: { home: 1, away: 1 },
            penalties: { home: 4, away: 3 },
        },
    });

    assert.equal(entry.phase, 'Round of 32');
    assert.equal(entry.home, 'Cape Verde');
    assert.equal(entry.away, 'United States');
    assert.deepEqual(entry.score, { home: 1, away: 1 });
    assert.deepEqual(entry.shootout, { home: 4, away: 3 });
});
