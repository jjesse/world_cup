'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const {
    normaliseTeam,
    getEasternDateTimeParts,
    normalisePhase,
    normaliseGroup,
    buildMatchEntry,
    unwrapMatchPayload,
    extractMatchEvents,
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

test('extracts scorer and booking events from nested match detail payloads', () => {
    const detailPayload = {
        match: {
            goals: [
                {
                    minute: 12,
                    type: 'REGULAR',
                    team: { name: 'United States of America' },
                    scorer: { name: 'Alex Morgan' },
                },
                {
                    minute: 88,
                    type: 'OWN_GOAL',
                    team: { name: 'Cabo Verde' },
                    scorer: { name: 'Defender Name' },
                },
            ],
            bookings: [
                {
                    minute: 20,
                    card: 'YELLOW_CARD',
                    team: { name: 'United States of America' },
                    player: { name: 'Midfielder Name' },
                },
                {
                    minute: 76,
                    card: 'YELLOW_RED_CARD',
                    team: { name: 'Cape Verde Islands' },
                    player: { name: 'Captain Name' },
                },
            ],
        },
    };

    assert.deepEqual(unwrapMatchPayload(detailPayload), detailPayload.match);
    assert.deepEqual(extractMatchEvents(detailPayload), {
        scorers: [
            { player: 'Alex Morgan', team: 'United States', minute: 12, type: 'goal' },
            { player: 'Defender Name', team: 'Cape Verde', minute: 88, type: 'own goal' },
        ],
        yellowCards: [
            { player: 'Midfielder Name', team: 'United States', minute: 20 },
        ],
        redCards: [
            { player: 'Captain Name', team: 'Cape Verde', minute: 76 },
        ],
    });
});
