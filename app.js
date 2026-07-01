/**
 * 2026 FIFA World Cup Dashboard - Main JavaScript
 *
 * Contains all tournament data (groups, schedule, teams) and
 * rendering logic for the dashboard pages.
 */

// ==========================================
// Tournament Data
// ==========================================

const TOURNAMENT = {
    name: '2026 FIFA World Cup',
    startDate: '2026-06-11',
    endDate: '2026-07-19',
    hosts: ['United States', 'Canada', 'Mexico'],
    totalTeams: 48,
    totalGroups: 12,
    venues: [
        { city: 'New York/New Jersey', country: 'USA', stadium: 'MetLife Stadium', capacity: 82500 },
        { city: 'Los Angeles', country: 'USA', stadium: 'SoFi Stadium', capacity: 70240 },
        { city: 'Dallas', country: 'USA', stadium: 'AT&T Stadium', capacity: 80000 },
        { city: 'San Francisco Bay Area', country: 'USA', stadium: "Levi's Stadium", capacity: 68500 },
        { city: 'Miami', country: 'USA', stadium: 'Hard Rock Stadium', capacity: 65326 },
        { city: 'Atlanta', country: 'USA', stadium: 'Mercedes-Benz Stadium', capacity: 71000 },
        { city: 'Seattle', country: 'USA', stadium: 'Lumen Field', capacity: 68740 },
        { city: 'Houston', country: 'USA', stadium: 'NRG Stadium', capacity: 72220 },
        { city: 'Kansas City', country: 'USA', stadium: 'Arrowhead Stadium', capacity: 76416 },
        { city: 'Boston', country: 'USA', stadium: 'Gillette Stadium', capacity: 65878 },
        { city: 'Philadelphia', country: 'USA', stadium: 'Lincoln Financial Field', capacity: 69176 },
        { city: 'Toronto', country: 'Canada', stadium: 'BMO Field', capacity: 45736 },
        { city: 'Vancouver', country: 'Canada', stadium: 'BC Place', capacity: 54500 },
        { city: 'Mexico City', country: 'Mexico', stadium: 'Estadio Azteca', capacity: 87523 },
        { city: 'Guadalajara', country: 'Mexico', stadium: 'Estadio Akron', capacity: 49850 },
        { city: 'Monterrey', country: 'Mexico', stadium: 'Estadio BBVA', capacity: 53500 },
    ]
};

// Country flag emoji mapping
const FLAGS = {
    'Mexico': '🇲🇽',
    'South Africa': '🇿🇦',
    'South Korea': '🇰🇷',
    'Czech Republic': '🇨🇿',
    'Czechia': '🇨🇿',
    'Canada': '🇨🇦',
    'Bosnia and Herzegovina': '🇧🇦',
    'Qatar': '🇶🇦',
    'Switzerland': '🇨🇭',
    'Brazil': '🇧🇷',
    'Morocco': '🇲🇦',
    'Haiti': '🇭🇹',
    'Scotland': '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
    'United States': '🇺🇸',
    'USA': '🇺🇸',
    'Paraguay': '🇵🇾',
    'Australia': '🇦🇺',
    'Turkey': '🇹🇷',
    'Türkiye': '🇹🇷',
    'Germany': '🇩🇪',
    'Curaçao': '🇨🇼',
    'Ivory Coast': '🇨🇮',
    'Ecuador': '🇪🇨',
    'Netherlands': '🇳🇱',
    'Japan': '🇯🇵',
    'Tunisia': '🇹🇳',
    'Sweden': '🇸🇪',
    'Belgium': '🇧🇪',
    'Egypt': '🇪🇬',
    'Iran': '🇮🇷',
    'New Zealand': '🇳🇿',
    'Spain': '🇪🇸',
    'Cape Verde': '🇨🇻',
    'Saudi Arabia': '🇸🇦',
    'Uruguay': '🇺🇾',
    'France': '🇫🇷',
    'Senegal': '🇸🇳',
    'Iraq': '🇮🇶',
    'Norway': '🇳🇴',
    'Argentina': '🇦🇷',
    'Algeria': '🇩🇿',
    'Austria': '🇦🇹',
    'Jordan': '🇯🇴',
    'Portugal': '🇵🇹',
    'DR Congo': '🇨🇩',
    'Uzbekistan': '🇺🇿',
    'Colombia': '🇨🇴',
    'England': '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    'Croatia': '🇭🇷',
    'Ghana': '🇬🇭',
    'Panama': '🇵🇦',
};

const TEAM_NAME_ALIASES = {
    'United States of America': 'United States',
    'USA': 'United States',
    'Curacao': 'Curaçao',
    'Czechia': 'Czech Republic',
    'Türkiye': 'Turkey',
    'Bosnia-Herzegovina': 'Bosnia and Herzegovina',
    "Côte d'Ivoire": 'Ivory Coast',
    "Cote d'Ivoire": 'Ivory Coast',
    'Congo DR': 'DR Congo',
    'Democratic Republic of Congo': 'DR Congo',
    'Cabo Verde': 'Cape Verde',
    'Cape Verde Islands': 'Cape Verde',
    'Korea Republic': 'South Korea',
    'Republic of Korea': 'South Korea',
    'IR Iran': 'Iran',
};

const KNOCKOUT_ROUND_SPECS = [
    { name: 'Round of 32', count: 16, date: 'July 1–6, 2026' },
    { name: 'Round of 16', count: 8, date: 'July 8–11, 2026' },
    { name: 'Quarterfinals', count: 4, date: 'July 13–14, 2026' },
    { name: 'Semifinals', count: 2, date: 'July 16–17, 2026' },
    { name: 'Third-place Match', count: 1, date: 'July 18, 2026' },
    { name: 'Final', count: 1, date: 'July 19, 2026' },
];

// Group stage data - 12 groups of 4 teams
const GROUPS = {
    A: {
        name: 'Group A',
        teams: [
            { name: 'Mexico', host: true, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
            { name: 'South Korea', host: false, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
            { name: 'South Africa', host: false, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
            { name: 'Czech Republic', host: false, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
        ]
    },
    B: {
        name: 'Group B',
        teams: [
            { name: 'Canada', host: true, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
            { name: 'Bosnia and Herzegovina', host: false, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
            { name: 'Qatar', host: false, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
            { name: 'Switzerland', host: false, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
        ]
    },
    C: {
        name: 'Group C',
        teams: [
            { name: 'Brazil', host: false, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
            { name: 'Morocco', host: false, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
            { name: 'Haiti', host: false, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
            { name: 'Scotland', host: false, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
        ]
    },
    D: {
        name: 'Group D',
        teams: [
            { name: 'United States', host: true, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
            { name: 'Paraguay', host: false, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
            { name: 'Australia', host: false, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
            { name: 'Turkey', host: false, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
        ]
    },
    E: {
        name: 'Group E',
        teams: [
            { name: 'Germany', host: false, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
            { name: 'Curaçao', host: false, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
            { name: 'Ivory Coast', host: false, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
            { name: 'Ecuador', host: false, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
        ]
    },
    F: {
        name: 'Group F',
        teams: [
            { name: 'Netherlands', host: false, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
            { name: 'Japan', host: false, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
            { name: 'Tunisia', host: false, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
            { name: 'Sweden', host: false, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
        ]
    },
    G: {
        name: 'Group G',
        teams: [
            { name: 'Belgium', host: false, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
            { name: 'Egypt', host: false, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
            { name: 'Iran', host: false, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
            { name: 'New Zealand', host: false, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
        ]
    },
    H: {
        name: 'Group H',
        teams: [
            { name: 'Spain', host: false, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
            { name: 'Cape Verde', host: false, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
            { name: 'Saudi Arabia', host: false, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
            { name: 'Uruguay', host: false, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
        ]
    },
    I: {
        name: 'Group I',
        teams: [
            { name: 'France', host: false, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
            { name: 'Senegal', host: false, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
            { name: 'Iraq', host: false, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
            { name: 'Norway', host: false, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
        ]
    },
    J: {
        name: 'Group J',
        teams: [
            { name: 'Argentina', host: false, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
            { name: 'Algeria', host: false, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
            { name: 'Austria', host: false, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
            { name: 'Jordan', host: false, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
        ]
    },
    K: {
        name: 'Group K',
        teams: [
            { name: 'Portugal', host: false, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
            { name: 'DR Congo', host: false, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
            { name: 'Uzbekistan', host: false, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
            { name: 'Colombia', host: false, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
        ]
    },
    L: {
        name: 'Group L',
        teams: [
            { name: 'England', host: false, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
            { name: 'Croatia', host: false, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
            { name: 'Ghana', host: false, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
            { name: 'Panama', host: false, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 },
        ]
    },
};

// Static group-stage schedule fallback used until scores.js provides the full API schedule.
const STATIC_SCHEDULE = [
    // June 11
    { date: '2026-06-11', time: '3:00 PM ET', group: 'A', home: 'Mexico', away: 'South Africa', venue: 'Estadio Azteca', city: 'Mexico City', score: null },
    { date: '2026-06-11', time: '10:00 PM ET', group: 'A', home: 'South Korea', away: 'Czech Republic', venue: 'Estadio Akron', city: 'Guadalajara', score: null },
    // June 12
    { date: '2026-06-12', time: '3:00 PM ET', group: 'B', home: 'Canada', away: 'Bosnia and Herzegovina', venue: 'BMO Field', city: 'Toronto', score: null },
    { date: '2026-06-12', time: '9:00 PM ET', group: 'D', home: 'United States', away: 'Paraguay', venue: 'SoFi Stadium', city: 'Los Angeles', score: null },
    // June 13
    { date: '2026-06-13', time: '3:00 PM ET', group: 'B', home: 'Qatar', away: 'Switzerland', venue: "Levi's Stadium", city: 'San Francisco Bay Area', score: null },
    { date: '2026-06-13', time: '6:00 PM ET', group: 'C', home: 'Brazil', away: 'Morocco', venue: 'MetLife Stadium', city: 'New York/New Jersey', score: null },
    { date: '2026-06-13', time: '9:00 PM ET', group: 'C', home: 'Haiti', away: 'Scotland', venue: 'Gillette Stadium', city: 'Boston', score: null },
    // June 14 (this match kicks off at midnight PT / 12:00 AM ET, early hours of June 14)
    { date: '2026-06-14', time: '12:00 AM ET', group: 'D', home: 'Australia', away: 'Turkey', venue: 'BC Place', city: 'Vancouver', score: null },
    { date: '2026-06-14', time: '1:00 PM ET', group: 'E', home: 'Germany', away: 'Curaçao', venue: 'NRG Stadium', city: 'Houston', score: null },
    { date: '2026-06-14', time: '4:00 PM ET', group: 'F', home: 'Netherlands', away: 'Japan', venue: 'AT&T Stadium', city: 'Dallas', score: null },
    { date: '2026-06-14', time: '7:00 PM ET', group: 'E', home: 'Ivory Coast', away: 'Ecuador', venue: 'Lincoln Financial Field', city: 'Philadelphia', score: null },
    { date: '2026-06-14', time: '10:00 PM ET', group: 'F', home: 'Sweden', away: 'Tunisia', venue: 'Estadio BBVA', city: 'Monterrey', score: null },
    // June 15
    { date: '2026-06-15', time: '1:00 PM ET', group: 'G', home: 'Belgium', away: 'Egypt', venue: 'Lumen Field', city: 'Seattle', score: null },
    { date: '2026-06-15', time: '4:00 PM ET', group: 'H', home: 'Spain', away: 'Cape Verde', venue: 'Mercedes-Benz Stadium', city: 'Atlanta', score: null },
    { date: '2026-06-15', time: '7:00 PM ET', group: 'H', home: 'Saudi Arabia', away: 'Uruguay', venue: 'Hard Rock Stadium', city: 'Miami', score: null },
    // June 16
    { date: '2026-06-16', time: '1:00 PM ET', group: 'G', home: 'Iran', away: 'New Zealand', venue: 'SoFi Stadium', city: 'Los Angeles', score: null },
    { date: '2026-06-16', time: '4:00 PM ET', group: 'I', home: 'France', away: 'Senegal', venue: 'MetLife Stadium', city: 'New York/New Jersey', score: null },
    { date: '2026-06-16', time: '7:00 PM ET', group: 'I', home: 'Iraq', away: 'Norway', venue: 'Gillette Stadium', city: 'Boston', score: null },
    // June 17
    { date: '2026-06-17', time: '1:00 PM ET', group: 'K', home: 'Uzbekistan', away: 'Colombia', venue: 'Estadio Azteca', city: 'Mexico City', score: null },
    { date: '2026-06-17', time: '4:00 PM ET', group: 'K', home: 'Portugal', away: 'DR Congo', venue: 'NRG Stadium', city: 'Houston', score: null },
    { date: '2026-06-17', time: '7:00 PM ET', group: 'L', home: 'England', away: 'Croatia', venue: 'AT&T Stadium', city: 'Dallas', score: null },
    { date: '2026-06-17', time: '10:00 PM ET', group: 'L', home: 'Ghana', away: 'Panama', venue: 'BMO Field', city: 'Toronto', score: null },
    // June 18
    { date: '2026-06-18', time: '12:00 PM ET', group: 'J', home: 'Argentina', away: 'Algeria', venue: 'Arrowhead Stadium', city: 'Kansas City', score: null },
    { date: '2026-06-18', time: '3:00 PM ET', group: 'J', home: 'Austria', away: 'Jordan', venue: "Levi's Stadium", city: 'San Francisco Bay Area', score: null },
    { date: '2026-06-18', time: '6:00 PM ET', group: 'A', home: 'Czech Republic', away: 'South Africa', venue: 'Mercedes-Benz Stadium', city: 'Atlanta', score: null },
    { date: '2026-06-18', time: '6:00 PM ET', group: 'B', home: 'Switzerland', away: 'Bosnia and Herzegovina', venue: 'SoFi Stadium', city: 'Los Angeles', score: null },
    { date: '2026-06-18', time: '9:00 PM ET', group: 'A', home: 'Mexico', away: 'South Korea', venue: 'Estadio Akron', city: 'Guadalajara', score: null },
    { date: '2026-06-18', time: '9:00 PM ET', group: 'B', home: 'Canada', away: 'Qatar', venue: 'BC Place', city: 'Vancouver', score: null },
    // June 19
    { date: '2026-06-19', time: '12:00 PM ET', group: 'C', home: 'Scotland', away: 'Morocco', venue: 'Gillette Stadium', city: 'Boston', score: null },
    { date: '2026-06-19', time: '3:00 PM ET', group: 'C', home: 'Brazil', away: 'Haiti', venue: 'Lincoln Financial Field', city: 'Philadelphia', score: null },
    { date: '2026-06-19', time: '6:00 PM ET', group: 'D', home: 'Turkey', away: 'Paraguay', venue: "Levi's Stadium", city: 'San Francisco Bay Area', score: null },
    { date: '2026-06-19', time: '9:00 PM ET', group: 'D', home: 'United States', away: 'Australia', venue: 'Lumen Field', city: 'Seattle', score: null },
    // June 20
    { date: '2026-06-20', time: '3:00 PM ET', group: 'E', home: 'Germany', away: 'Ivory Coast', venue: 'BMO Field', city: 'Toronto', score: null },
    { date: '2026-06-20', time: '6:00 PM ET', group: 'E', home: 'Ecuador', away: 'Curaçao', venue: 'Arrowhead Stadium', city: 'Kansas City', score: null },
    // June 21
    { date: '2026-06-21', time: '12:00 PM ET', group: 'F', home: 'Tunisia', away: 'Japan', venue: 'Estadio BBVA', city: 'Monterrey', score: null },
    { date: '2026-06-21', time: '3:00 PM ET', group: 'F', home: 'Netherlands', away: 'Sweden', venue: 'NRG Stadium', city: 'Houston', score: null },
    { date: '2026-06-21', time: '6:00 PM ET', group: 'H', home: 'Spain', away: 'Saudi Arabia', venue: 'Mercedes-Benz Stadium', city: 'Atlanta', score: null },
    { date: '2026-06-21', time: '9:00 PM ET', group: 'H', home: 'Uruguay', away: 'Cape Verde', venue: 'Hard Rock Stadium', city: 'Miami', score: null },
    // June 22
    { date: '2026-06-22', time: '12:00 PM ET', group: 'G', home: 'Belgium', away: 'Iran', venue: 'SoFi Stadium', city: 'Los Angeles', score: null },
    { date: '2026-06-22', time: '3:00 PM ET', group: 'G', home: 'New Zealand', away: 'Egypt', venue: 'BC Place', city: 'Vancouver', score: null },
    { date: '2026-06-22', time: '6:00 PM ET', group: 'J', home: 'Argentina', away: 'Austria', venue: 'AT&T Stadium', city: 'Dallas', score: null },
    // June 23
    { date: '2026-06-23', time: '12:00 PM ET', group: 'J', home: 'Jordan', away: 'Algeria', venue: "Levi's Stadium", city: 'San Francisco Bay Area', score: null },
    { date: '2026-06-23', time: '3:00 PM ET', group: 'I', home: 'Norway', away: 'Senegal', venue: 'MetLife Stadium', city: 'New York/New Jersey', score: null },
    { date: '2026-06-23', time: '3:00 PM ET', group: 'K', home: 'Portugal', away: 'Uzbekistan', venue: 'NRG Stadium', city: 'Houston', score: null },
    { date: '2026-06-23', time: '3:00 PM ET', group: 'L', home: 'England', away: 'Ghana', venue: 'Gillette Stadium', city: 'Boston', score: null },
    { date: '2026-06-23', time: '6:00 PM ET', group: 'I', home: 'France', away: 'Iraq', venue: 'NRG Stadium', city: 'Houston', score: null },
    { date: '2026-06-23', time: '6:00 PM ET', group: 'K', home: 'Colombia', away: 'DR Congo', venue: 'SoFi Stadium', city: 'Los Angeles', score: null },
    { date: '2026-06-23', time: '6:00 PM ET', group: 'L', home: 'Panama', away: 'Croatia', venue: 'BMO Field', city: 'Toronto', score: null },
    // June 24
    { date: '2026-06-24', time: '3:00 PM ET', group: 'A', home: 'Czech Republic', away: 'Mexico', venue: 'Estadio Azteca', city: 'Mexico City', score: null },
    { date: '2026-06-24', time: '3:00 PM ET', group: 'A', home: 'South Africa', away: 'South Korea', venue: 'Estadio BBVA', city: 'Monterrey', score: null },
    { date: '2026-06-24', time: '3:00 PM ET', group: 'B', home: 'Switzerland', away: 'Canada', venue: 'BC Place', city: 'Vancouver', score: null },
    { date: '2026-06-24', time: '3:00 PM ET', group: 'B', home: 'Bosnia and Herzegovina', away: 'Qatar', venue: 'Lumen Field', city: 'Seattle', score: null },
    { date: '2026-06-24', time: '9:00 PM ET', group: 'C', home: 'Scotland', away: 'Brazil', venue: 'Hard Rock Stadium', city: 'Miami', score: null },
    { date: '2026-06-24', time: '9:00 PM ET', group: 'C', home: 'Morocco', away: 'Haiti', venue: 'Mercedes-Benz Stadium', city: 'Atlanta', score: null },
    // June 25
    { date: '2026-06-25', time: '3:00 PM ET', group: 'D', home: 'Turkey', away: 'United States', venue: 'SoFi Stadium', city: 'Los Angeles', score: null },
    { date: '2026-06-25', time: '3:00 PM ET', group: 'D', home: 'Paraguay', away: 'Australia', venue: 'Arrowhead Stadium', city: 'Kansas City', score: null },
    { date: '2026-06-25', time: '9:00 PM ET', group: 'E', home: 'Curaçao', away: 'Ivory Coast', venue: 'Lincoln Financial Field', city: 'Philadelphia', score: null },
    { date: '2026-06-25', time: '9:00 PM ET', group: 'E', home: 'Ecuador', away: 'Germany', venue: 'MetLife Stadium', city: 'New York/New Jersey', score: null },
    // June 26
    { date: '2026-06-26', time: '3:00 PM ET', group: 'F', home: 'Sweden', away: 'Japan', venue: 'Gillette Stadium', city: 'Boston', score: null },
    { date: '2026-06-26', time: '3:00 PM ET', group: 'F', home: 'Tunisia', away: 'Netherlands', venue: 'Arrowhead Stadium', city: 'Kansas City', score: null },
    // June 27
    { date: '2026-06-27', time: '3:00 PM ET', group: 'G', home: 'Egypt', away: 'Iran', venue: 'AT&T Stadium', city: 'Dallas', score: null },
    { date: '2026-06-27', time: '3:00 PM ET', group: 'G', home: 'Belgium', away: 'New Zealand', venue: 'Mercedes-Benz Stadium', city: 'Atlanta', score: null },
    { date: '2026-06-27', time: '9:00 PM ET', group: 'H', home: 'Cape Verde', away: 'Saudi Arabia', venue: 'Lincoln Financial Field', city: 'Philadelphia', score: null },
    { date: '2026-06-27', time: '9:00 PM ET', group: 'H', home: 'Uruguay', away: 'Spain', venue: 'NRG Stadium', city: 'Houston', score: null },
    { date: '2026-06-27', time: '3:00 PM ET', group: 'I', home: 'Senegal', away: 'Iraq', venue: 'BMO Field', city: 'Toronto', score: null },
    { date: '2026-06-27', time: '9:00 PM ET', group: 'I', home: 'France', away: 'Norway', venue: 'SoFi Stadium', city: 'Los Angeles', score: null },
    { date: '2026-06-27', time: '3:00 PM ET', group: 'J', home: 'Austria', away: 'Algeria', venue: 'Mercedes-Benz Stadium', city: 'Atlanta', score: null },
    { date: '2026-06-27', time: '9:00 PM ET', group: 'J', home: 'Argentina', away: 'Jordan', venue: 'Estadio Azteca', city: 'Mexico City', score: null },
    // June 28
    { date: '2026-06-28', time: '3:00 PM ET', group: 'K', home: 'Colombia', away: 'Portugal', venue: 'Hard Rock Stadium', city: 'Miami', score: null },
    { date: '2026-06-28', time: '3:00 PM ET', group: 'K', home: 'Uzbekistan', away: 'DR Congo', venue: 'Lincoln Financial Field', city: 'Philadelphia', score: null },
    { date: '2026-06-28', time: '9:00 PM ET', group: 'L', home: 'Croatia', away: 'Ghana', venue: 'MetLife Stadium', city: 'New York/New Jersey', score: null },
    { date: '2026-06-28', time: '9:00 PM ET', group: 'L', home: 'England', away: 'Panama', venue: 'Estadio BBVA', city: 'Monterrey', score: null },
];

function normaliseTeamName(name) {
    return TEAM_NAME_ALIASES[name] || name;
}

function cloneValue(value) {
    if (Array.isArray(value)) return value.map(cloneValue);
    if (value && typeof value === 'object') {
        return Object.fromEntries(Object.entries(value).map(([key, child]) => [key, cloneValue(child)]));
    }
    return value;
}

function cloneMatch(match) {
    return cloneValue(match);
}

function getMatchPairKey(home, away) {
    return [normaliseTeamName(home), normaliseTeamName(away)].sort().join('|');
}

function isGroupStageMatch(match) {
    return match.phase === 'Group Stage' || /^[A-L]$/.test(match.group || '');
}

function getMatchStageLabel(match) {
    return isGroupStageMatch(match)
        ? `Group ${match.group}`
        : (match.phase || 'Knockout Stage');
}

function normaliseEventList(events) {
    return Array.isArray(events)
        ? events.map((event) => ({ ...event, team: normaliseTeamName(event.team || '') }))
        : undefined;
}

function normaliseScorePayload(payload, swapTeams = false) {
    if (!payload || typeof payload !== 'object') return {};

    const score = payload.score && typeof payload.score === 'object'
        ? {
            home: swapTeams ? Number(payload.score.away) : Number(payload.score.home),
            away: swapTeams ? Number(payload.score.home) : Number(payload.score.away),
        }
        : null;

    const shootout = payload.shootout && typeof payload.shootout === 'object'
        ? {
            home: swapTeams ? Number(payload.shootout.away) : Number(payload.shootout.home),
            away: swapTeams ? Number(payload.shootout.home) : Number(payload.shootout.away),
        }
        : null;

    return {
        ...(score && Number.isFinite(score.home) && Number.isFinite(score.away) ? { score } : {}),
        ...(shootout && Number.isFinite(shootout.home) && Number.isFinite(shootout.away) ? { shootout } : {}),
        ...(payload.status ? { status: payload.status } : {}),
        ...(payload.phase ? { phase: payload.phase } : {}),
        ...(payload.utcDate ? { utcDate: payload.utcDate } : {}),
        ...(payload.matchday != null ? { matchday: payload.matchday } : {}),
        ...(payload.scorers ? { scorers: normaliseEventList(payload.scorers) } : {}),
        ...(payload.yellowCards ? { yellowCards: normaliseEventList(payload.yellowCards) } : {}),
        ...(payload.redCards ? { redCards: normaliseEventList(payload.redCards) } : {}),
    };
}

function buildStaticScheduleLookup() {
    const byPair = new Map();
    for (const match of STATIC_SCHEDULE) {
        byPair.set(getMatchPairKey(match.home, match.away), match);
    }
    return byPair;
}

function buildScheduleFromApiMatches(matches) {
    const staticLookup = buildStaticScheduleLookup();

    return matches
        .map((sourceMatch) => {
            const base = cloneMatch(sourceMatch);
            base.home = normaliseTeamName(base.home);
            base.away = normaliseTeamName(base.away);
            base.group = base.group || '';
            base.phase = base.phase || (base.group ? 'Group Stage' : 'Knockout Stage');
            const staticMatch = staticLookup.get(getMatchPairKey(base.home, base.away));
            if (staticMatch) {
                base.group = base.group || staticMatch.group;
                base.venue = base.venue || staticMatch.venue;
                base.city = base.city || staticMatch.city;
                base.time = base.time || staticMatch.time;
            }
            return {
                ...base,
                ...normaliseScorePayload(base),
                venue: base.venue || 'TBD',
                city: base.city || 'TBD',
                status: base.status || (base.score ? 'FINISHED' : 'SCHEDULED'),
            };
        })
        .sort((a, b) => (a.utcDate || a.date).localeCompare(b.utcDate || b.date));
}

function buildScheduleFromLegacyScores() {
    const legacyLookup = new Map();
    if (typeof MATCH_SCORES !== 'undefined') {
        for (const [key, payload] of Object.entries(MATCH_SCORES)) {
            const [home, away] = key.split('|');
            legacyLookup.set(getMatchPairKey(home, away), {
                home: normaliseTeamName(home),
                away: normaliseTeamName(away),
                payload,
            });
        }
    }

    return STATIC_SCHEDULE.map((match) => {
        const nextMatch = cloneMatch(match);
        nextMatch.phase = 'Group Stage';
        const legacy = legacyLookup.get(getMatchPairKey(nextMatch.home, nextMatch.away));
        if (!legacy) return nextMatch;

        const sameOrientation =
            normaliseTeamName(nextMatch.home) === legacy.home &&
            normaliseTeamName(nextMatch.away) === legacy.away;

        return {
            ...nextMatch,
            ...normaliseScorePayload(legacy.payload, !sameOrientation),
            status: legacy.payload.status || (legacy.payload.score ? 'FINISHED' : 'SCHEDULED'),
        };
    });
}

function resolveTournamentSchedule() {
    if (typeof TOURNAMENT_MATCHES !== 'undefined' && Array.isArray(TOURNAMENT_MATCHES) && TOURNAMENT_MATCHES.length > 0) {
        return buildScheduleFromApiMatches(TOURNAMENT_MATCHES);
    }
    return buildScheduleFromLegacyScores();
}

const SCHEDULE = resolveTournamentSchedule();

// Recalculate group standings from group-stage scores so standings stay correct after knockout begins.
function recalculateGroupStandings() {
    const teamsByName = {};
    for (const group of Object.values(GROUPS)) {
        for (const team of group.teams) {
            team.played = 0;
            team.won = 0;
            team.drawn = 0;
            team.lost = 0;
            team.gf = 0;
            team.ga = 0;
            team.pts = 0;
            teamsByName[team.name] = team;
        }
    }

    for (const match of SCHEDULE) {
        if (!isGroupStageMatch(match) || !match.score || typeof match.score !== 'object') continue;

        const homeTeam = teamsByName[normaliseTeamName(match.home)];
        const awayTeam = teamsByName[normaliseTeamName(match.away)];
        const homeGoals = Number(match.score.home);
        const awayGoals = Number(match.score.away);
        if (!homeTeam || !awayTeam || !Number.isFinite(homeGoals) || !Number.isFinite(awayGoals)) continue;

        homeTeam.played++;
        awayTeam.played++;
        homeTeam.gf += homeGoals;
        homeTeam.ga += awayGoals;
        awayTeam.gf += awayGoals;
        awayTeam.ga += homeGoals;

        if (homeGoals > awayGoals) {
            homeTeam.won++;
            awayTeam.lost++;
            homeTeam.pts += 3;
        } else if (awayGoals > homeGoals) {
            awayTeam.won++;
            homeTeam.lost++;
            awayTeam.pts += 3;
        } else {
            homeTeam.drawn++;
            awayTeam.drawn++;
            homeTeam.pts++;
            awayTeam.pts++;
        }
    }
}

recalculateGroupStandings();

// Teams organized by confederation
const CONFEDERATIONS = {
    UEFA: {
        name: 'UEFA (Europe)',
        teams: ['Germany', 'Netherlands', 'Belgium', 'Spain', 'France', 'Portugal', 'England',
            'Czech Republic', 'Bosnia and Herzegovina', 'Switzerland', 'Scotland', 'Sweden', 'Norway',
            'Austria', 'Croatia', 'Turkey']
    },
    CONMEBOL: {
        name: 'CONMEBOL (South America)',
        teams: ['Brazil', 'Argentina', 'Uruguay', 'Colombia', 'Ecuador', 'Paraguay']
    },
    CONCACAF: {
        name: 'CONCACAF (North/Central America & Caribbean)',
        teams: ['United States', 'Mexico', 'Canada', 'Panama', 'Haiti', 'Curaçao']
    },
    CAF: {
        name: 'CAF (Africa)',
        teams: ['Morocco', 'South Africa', 'Senegal', 'Egypt', 'Ghana', 'DR Congo', 'Cape Verde', 'Algeria', 'Tunisia', 'Ivory Coast']
    },
    AFC: {
        name: 'AFC (Asia)',
        teams: ['South Korea', 'Japan', 'Saudi Arabia', 'Australia', 'Iran', 'Iraq', 'Jordan', 'Qatar', 'Uzbekistan']
    },
    OFC: {
        name: 'OFC (Oceania)',
        teams: ['New Zealand']
    },
};

// ==========================================
// Utility Functions
// ==========================================

function getFlag(teamName) {
    return FLAGS[normaliseTeamName(teamName)] || '🏳️';
}

function formatDate(dateStr) {
    const date = new Date(dateStr + 'T12:00:00');
    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

function getTeamGroup(teamName) {
    const normalisedName = normaliseTeamName(teamName);
    for (const [groupKey, groupData] of Object.entries(GROUPS)) {
        for (const team of groupData.teams) {
            if (team.name === normalisedName) return groupKey;
        }
    }
    return '?';
}

// ==========================================
// Countdown Timer
// ==========================================

function updateCountdown() {
    const el = document.getElementById('countdown-display');
    if (!el) return;

    const target = new Date('2026-06-11T15:00:00-04:00'); // June 11, 3pm ET
    const now = new Date();
    const diff = target - now;

    if (diff <= 0) {
        el.innerHTML = '<p class="countdown-live">🔴 The 2026 FIFA World Cup is LIVE!</p>';
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    el.innerHTML = `
        <div class="countdown-grid">
            <div class="countdown-unit"><span class="number">${days}</span><span class="unit-label">Days</span></div>
            <div class="countdown-unit"><span class="number">${String(hours).padStart(2,'0')}</span><span class="unit-label">Hours</span></div>
            <div class="countdown-unit"><span class="number">${String(minutes).padStart(2,'0')}</span><span class="unit-label">Minutes</span></div>
            <div class="countdown-unit"><span class="number">${String(seconds).padStart(2,'0')}</span><span class="unit-label">Seconds</span></div>
        </div>`;
}

// ==========================================
// Groups Page
// ==========================================

function renderGroups() {
    const container = document.getElementById('groups-container');
    if (!container) return;

    let html = '<div class="groups-grid">';
    for (const [key, group] of Object.entries(GROUPS)) {
        html += `
            <div class="group-card">
                <div class="group-card-header">⚽ ${group.name}</div>
                <table>
                    <thead>
                        <tr>
                            <th>Team</th>
                            <th>P</th>
                            <th>W</th>
                            <th>D</th>
                            <th>L</th>
                            <th>GF</th>
                            <th>GA</th>
                            <th>GD</th>
                            <th>Pts</th>
                        </tr>
                    </thead>
                    <tbody>`;
        for (const team of group.teams) {
            const flag = getFlag(team.name);
            const gd = team.gf - team.ga;
            const hostBadge = team.host ? ' <span style="font-size:0.65rem;background:#d4a017;color:#1a1a1a;padding:0.1rem 0.3rem;border-radius:3px;font-weight:700;">HOST</span>' : '';
            html += `
                        <tr>
                            <td>${flag} ${team.name}${hostBadge}</td>
                            <td>${team.played}</td>
                            <td>${team.won}</td>
                            <td>${team.drawn}</td>
                            <td>${team.lost}</td>
                            <td>${team.gf}</td>
                            <td>${team.ga}</td>
                            <td>${gd >= 0 ? '+' : ''}${gd}</td>
                            <td><strong>${team.pts}</strong></td>
                        </tr>`;
        }
        html += `
                    </tbody>
                </table>
            </div>`;
    }
    html += '</div>';
    container.innerHTML = html;
}

// ==========================================
// Schedule Page
// ==========================================

function renderSchedule(filter = '') {
    const container = document.getElementById('schedule-container');
    if (!container) return;

    let filtered = SCHEDULE;
    if (filter) {
        const f = filter.toLowerCase();
        filtered = SCHEDULE.filter(m =>
            m.home.toLowerCase().includes(f) ||
            m.away.toLowerCase().includes(f) ||
            getMatchStageLabel(m).toLowerCase() === f ||
            (m.group || '').toLowerCase() === f.replace('group ', '') ||
            (m.city || '').toLowerCase().includes(f) ||
            (m.venue || '').toLowerCase().includes(f)
        );
    }

    if (filtered.length === 0) {
        container.innerHTML = '<p style="color:#666;padding:1rem;">No matches found for that filter.</p>';
        return;
    }

    // Group by date
    const byDate = {};
    for (const match of filtered) {
        if (!byDate[match.date]) byDate[match.date] = [];
        byDate[match.date].push(match);
    }

    let html = '';
    for (const [date, matches] of Object.entries(byDate)) {
        html += `<div class="match-day">
            <div class="match-day-header">📅 ${formatDate(date)}</div>
            <div class="matches-list">`;
        for (const m of matches) {
            const homeFlag = getFlag(m.home);
            const awayFlag = getFlag(m.away);
            const scoreDisplay = m.score
                ? `<span class="match-score">${m.score.home} – ${m.score.away}${m.shootout ? `<small> (${m.shootout.home}–${m.shootout.away} pens)</small>` : ''}</span>`
                : `<span class="match-score upcoming">vs</span>`;
            const stageLabel = getMatchStageLabel(m);
            html += `
                <div class="match-item">
                    <div class="match-time"><span class="match-group-badge" aria-label="Stage: ${stageLabel}">${stageLabel}</span>${m.time || 'TBD'}</div>
                    <div class="match-team">${homeFlag} ${m.home}</div>
                    ${scoreDisplay}
                    <div class="match-team">${awayFlag} ${m.away}</div>
                    <div class="match-venue">🏟️ ${m.venue}<br><small>${m.city}</small></div>
                </div>`;
        }
        html += '</div></div>';
    }
    container.innerHTML = html;
}

function initScheduleFilters() {
    const groupFilter = document.getElementById('group-filter');
    const teamFilter = document.getElementById('team-filter');
    const searchInput = document.getElementById('search-input');

    if (groupFilter) {
        const labels = [...new Set(SCHEDULE.map(getMatchStageLabel))];
        groupFilter.innerHTML = '<option value="">All Stages</option>';
        labels.forEach((label) => {
            const opt = document.createElement('option');
            opt.value = label;
            opt.textContent = label;
            groupFilter.appendChild(opt);
        });
    }

    // Populate team filter
    if (teamFilter) {
        teamFilter.innerHTML = '<option value="">All Teams</option>';
        const teams = [...new Set(SCHEDULE.flatMap(m => [m.home, m.away]))].sort();
        teams.forEach(t => {
            const opt = document.createElement('option');
            opt.value = t;
            opt.textContent = `${getFlag(t)} ${t}`;
            teamFilter.appendChild(opt);
        });
    }

    const applyFilter = () => {
        const gVal = groupFilter ? groupFilter.value : '';
        const tVal = teamFilter ? teamFilter.value : '';
        const sVal = searchInput ? searchInput.value.trim() : '';
        const combined = gVal || tVal || sVal;
        renderSchedule(combined);
    };

    if (groupFilter) groupFilter.addEventListener('change', applyFilter);
    if (teamFilter) teamFilter.addEventListener('change', applyFilter);
    if (searchInput) searchInput.addEventListener('input', applyFilter);
}

// ==========================================
// Teams Page
// ==========================================

function renderTeams() {
    const container = document.getElementById('teams-container');
    if (!container) return;

    const hostNations = new Set(['United States', 'Canada', 'Mexico']);
    const allTeams = Object.values(GROUPS).flatMap(g => g.teams.map(t => t.name));

    let html = '';
    for (const [confKey, conf] of Object.entries(CONFEDERATIONS)) {
        const confTeams = conf.teams.filter(t => allTeams.includes(t));
        if (confTeams.length === 0) continue;

        html += `<div class="confederation-section">
            <div class="confederation-header">🌍 ${conf.name} — ${confTeams.length} teams</div>
            <div class="teams-grid">`;

        for (const teamName of confTeams) {
            const flag = getFlag(teamName);
            const group = getTeamGroup(teamName);
            const isHost = hostNations.has(teamName);
            html += `
                <div class="team-card${isHost ? ' host-nation' : ''}">
                    <span class="team-flag-large">${flag}</span>
                    <div class="team-info">
                        <div class="team-name">${teamName}</div>
                        <div class="team-group">Group ${group}</div>
                        ${isHost ? '<span class="host-badge">🏆 HOST</span>' : ''}
                    </div>
                </div>`;
        }
        html += '</div></div>';
    }
    container.innerHTML = html;
}

// ==========================================
// Bracket Page
// ==========================================

function renderBracket() {
    const container = document.getElementById('bracket-container');
    if (!container) return;

    const rounds = KNOCKOUT_ROUND_SPECS.map((round) => {
        const actualMatches = SCHEDULE
            .filter((match) => match.phase === round.name)
            .sort((a, b) => (a.utcDate || a.date).localeCompare(b.utcDate || b.date))
            .map((match, index) => ({
                label: match.label || `${round.name} ${index + 1}`,
                team1: match.home,
                team2: match.away,
                date: formatDate(match.date),
                venue: match.city && match.city !== 'TBD'
                    ? `${match.venue} · ${match.city}`
                    : (match.venue || 'TBD'),
                score1: match.score ? match.score.home : null,
                score2: match.score ? match.score.away : null,
                shootout: match.shootout || null,
            }));

        while (actualMatches.length < round.count) {
            actualMatches.push({
                label: `${round.name} ${actualMatches.length + 1}`,
                team1: 'TBD',
                team2: 'TBD',
                date: round.date,
                venue: 'TBD',
                score1: null,
                score2: null,
                shootout: null,
            });
        }

        return {
            name: round.name,
            date: round.date,
            matches: actualMatches,
        };
    });

    let html = '';
    for (const round of rounds) {
        html += `<div class="round-section">
            <div class="round-header">🏆 ${round.name} — ${round.date}</div>
            <div class="matches-grid">`;
        for (const match of round.matches) {
            const team1ClassSuffix = match.team1 === 'TBD' ? ' tbd' : '';
            const team2ClassSuffix = match.team2 === 'TBD' ? ' tbd' : '';
            const score1 = match.score1 != null ? match.score1 : '-';
            const score2 = match.score2 != null ? match.score2 : '-';
            const shootout = match.shootout
                ? `<div class="bracket-match-footer"><span role="text" aria-label="Penalty shootout result: ${match.shootout.home} to ${match.shootout.away}">🎯 Pens: ${match.shootout.home}–${match.shootout.away}</span></div>`
                : '';
            html += `
                <div class="bracket-match">
                    <div class="match-header">${match.label} · ${match.date}</div>
                    <div class="bracket-team${team1ClassSuffix}"><span>${match.team1 !== 'TBD' ? `${getFlag(match.team1)} ` : ''}${match.team1}</span><span class="score">${score1}</span></div>
                    <div class="bracket-team${team2ClassSuffix}"><span>${match.team2 !== 'TBD' ? `${getFlag(match.team2)} ` : ''}${match.team2}</span><span class="score">${score2}</span></div>
                    <div class="bracket-match-footer">🏟️ ${match.venue}</div>
                    ${shootout}
                </div>`;
        }
        html += '</div></div>';
    }
    container.innerHTML = html;
}

// ==========================================
// Stats Page
// ==========================================

/**
 * Derives per-player stats (goals, penalties, own goals, yellow/red cards)
 * by aggregating events from all completed SCHEDULE entries.
 *
 * To record a completed match, add these fields to its SCHEDULE entry:
 *   score: { home: 2, away: 1 }
 *   scorers: [{ player: 'Name', team: 'Team', minute: 45, type: 'goal' }]
 *             type values: 'goal' | 'penalty' | 'own goal'
 *   yellowCards: [{ player: 'Name', team: 'Team', minute: 33 }]
 *   redCards:    [{ player: 'Name', team: 'Team', minute: 78 }]
 */
function computePlayerStats() {
    const players = {};
    for (const match of SCHEDULE) {
        for (const s of (match.scorers || [])) {
            const key = `${s.player}||${s.team}`;
            if (!players[key]) {
                players[key] = { player: s.player, team: s.team, goals: 0, penalties: 0, ownGoals: 0, yellowCards: 0, redCards: 0 };
            }
            if (s.type === 'own goal') {
                players[key].ownGoals++;
            } else {
                players[key].goals++;
                if (s.type === 'penalty') players[key].penalties++;
            }
        }
        for (const c of (match.yellowCards || [])) {
            const key = `${c.player}||${c.team}`;
            if (!players[key]) {
                players[key] = { player: c.player, team: c.team, goals: 0, penalties: 0, ownGoals: 0, yellowCards: 0, redCards: 0 };
            }
            players[key].yellowCards++;
        }
        for (const c of (match.redCards || [])) {
            const key = `${c.player}||${c.team}`;
            if (!players[key]) {
                players[key] = { player: c.player, team: c.team, goals: 0, penalties: 0, ownGoals: 0, yellowCards: 0, redCards: 0 };
            }
            players[key].redCards++;
        }
    }
    return Object.values(players);
}

/**
 * Derives overall per-team tournament stats from completed SCHEDULE entries.
 */
function computeTeamStats() {
    const teams = {};
    for (const group of Object.values(GROUPS)) {
        for (const team of group.teams) {
            teams[team.name] = {
                name: team.name,
                played: 0,
                won: 0,
                drawn: 0,
                lost: 0,
                gf: 0,
                ga: 0,
                pts: 0,
                cleanSheets: 0,
                yellowCards: 0,
                redCards: 0,
            };
        }
    }

    for (const match of SCHEDULE) {
        if (!match.score || typeof match.score !== 'object') continue;

        const home = normaliseTeamName(match.home);
        const away = normaliseTeamName(match.away);
        const homeGoals = Number(match.score.home);
        const awayGoals = Number(match.score.away);
        if (!Number.isFinite(homeGoals) || !Number.isFinite(awayGoals)) continue;

        for (const teamName of [home, away]) {
            if (!teams[teamName]) teams[teamName] = { name: teamName, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0, cleanSheets: 0, yellowCards: 0, redCards: 0 };
        }

        teams[home].played++;
        teams[away].played++;
        teams[home].gf += homeGoals;
        teams[home].ga += awayGoals;
        teams[away].gf += awayGoals;
        teams[away].ga += homeGoals;

        if (awayGoals === 0) teams[home].cleanSheets++;
        if (homeGoals === 0) teams[away].cleanSheets++;

        if (homeGoals > awayGoals) {
            teams[home].won++;
            teams[away].lost++;
            teams[home].pts += 3;
        } else if (awayGoals > homeGoals) {
            teams[away].won++;
            teams[home].lost++;
            teams[away].pts += 3;
        } else {
            teams[home].drawn++;
            teams[away].drawn++;
            teams[home].pts++;
            teams[away].pts++;
        }

        for (const c of (match.yellowCards || [])) {
            const teamName = normaliseTeamName(c.team);
            if (!teams[teamName]) teams[teamName] = { name: teamName, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0, cleanSheets: 0, yellowCards: 0, redCards: 0 };
            teams[teamName].yellowCards++;
        }
        for (const c of (match.redCards || [])) {
            const teamName = normaliseTeamName(c.team);
            if (!teams[teamName]) teams[teamName] = { name: teamName, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0, cleanSheets: 0, yellowCards: 0, redCards: 0 };
            teams[teamName].redCards++;
        }
    }
    return Object.values(teams).map((team) => ({
        ...team,
        gd: team.gf - team.ga,
    }));
}

function renderNoData(message) {
    return `<p class="no-data">${message}</p>`;
}

function renderStatCards(cards) {
    return `<div class="stats-grid">${cards.map(card => `
        <div class="stat-card">
            <span class="stat-number">${card.value}</span>
            <span class="stat-label">${card.label}</span>
            ${card.detail ? `<div style="margin-top:0.75rem;font-size:0.85rem;line-height:1.4;">${card.detail}</div>` : ''}
        </div>
    `).join('')}</div>`;
}

function renderStaticTable(columns, rows, rowRenderer) {
    const headers = columns.map(label => `<th>${label}</th>`).join('');
    const body = rows.map(rowRenderer).join('');
    return `<div class="table-container"><table>
        <thead><tr>${headers}</tr></thead>
        <tbody>${body}</tbody>
    </table></div>`;
}

function getCompletedMatches() {
    return SCHEDULE
        .filter(match => match.score && typeof match.score === 'object')
        .map(match => ({
            ...match,
            homeGoals: Number(match.score.home),
            awayGoals: Number(match.score.away),
        }))
        .filter(match => Number.isFinite(match.homeGoals) && Number.isFinite(match.awayGoals))
        .map(match => ({
            ...match,
            totalGoals: match.homeGoals + match.awayGoals,
            goalDiff: Math.abs(match.homeGoals - match.awayGoals),
        }));
}

function getGoalEvents() {
    const events = [];
    for (const match of SCHEDULE) {
        for (const scorer of (match.scorers || [])) {
            events.push({
                ...scorer,
                minute: Number(scorer.minute) || 0,
                home: match.home,
                away: match.away,
            });
        }
    }
    return events;
}

function computeMatchHighlights() {
    const matches = getCompletedMatches();
    if (matches.length === 0) return null;

    const biggestWin = [...matches].sort((a, b) =>
        b.goalDiff - a.goalDiff ||
        b.totalGoals - a.totalGoals ||
        a.home.localeCompare(b.home)
    )[0];

    const highestScoring = [...matches].sort((a, b) =>
        b.totalGoals - a.totalGoals ||
        b.goalDiff - a.goalDiff ||
        a.home.localeCompare(b.home)
    )[0];

    const totalGoals = matches.reduce((sum, match) => sum + match.totalGoals, 0);

    return {
        matchesPlayed: matches.length,
        averageGoals: (totalGoals / matches.length).toFixed(2),
        biggestWin,
        highestScoring,
    };
}

function computeOwnGoalStats(playerStats) {
    const players = playerStats
        .filter(player => player.ownGoals > 0)
        .sort((a, b) => b.ownGoals - a.ownGoals || a.player.localeCompare(b.player));

    const teamTotals = {};
    for (const player of players) {
        teamTotals[player.team] = (teamTotals[player.team] || 0) + player.ownGoals;
    }

    const teams = Object.entries(teamTotals)
        .map(([team, ownGoals]) => ({ team, ownGoals }))
        .sort((a, b) => b.ownGoals - a.ownGoals || a.team.localeCompare(b.team));

    return {
        totalOwnGoals: players.reduce((sum, player) => sum + player.ownGoals, 0),
        players,
        teams,
    };
}

function computeGoalTimingStats() {
    const goals = getGoalEvents();
    if (goals.length === 0) {
        return { earliestGoal: null, latestGoal: null, lateLeaders: [], lateGoalCount: 0 };
    }

    const earliestGoal = [...goals].sort((a, b) => a.minute - b.minute || a.player.localeCompare(b.player))[0];
    const latestGoal = [...goals].sort((a, b) => b.minute - a.minute || a.player.localeCompare(b.player))[0];
    const lateGoals = goals.filter(goal => goal.minute >= 75 && goal.type !== 'own goal');
    const lateLeaderMap = {};

    for (const goal of lateGoals) {
        const key = `${goal.player}||${goal.team}`;
        if (!lateLeaderMap[key]) {
            lateLeaderMap[key] = { player: goal.player, team: goal.team, lateGoals: 0 };
        }
        lateLeaderMap[key].lateGoals++;
    }

    const lateLeaders = Object.values(lateLeaderMap)
        .sort((a, b) => b.lateGoals - a.lateGoals || a.player.localeCompare(b.player));

    return {
        earliestGoal,
        latestGoal,
        lateLeaders,
        lateGoalCount: lateGoals.length,
    };
}

function computeTeamHighlights(teamData) {
    const playedTeams = teamData.filter(team => team.played > 0);
    if (playedTeams.length === 0) return null;

    const maxGoals = Math.max(...playedTeams.map(team => team.gf));
    const minConceded = Math.min(...playedTeams.map(team => team.ga));
    const maxCleanSheets = Math.max(...playedTeams.map(team => team.cleanSheets));
    const maxGoalDiff = Math.max(...playedTeams.map(team => team.gd));

    return {
        mostGoals: playedTeams.filter(team => team.gf === maxGoals),
        fewestConceded: playedTeams.filter(team => team.ga === minConceded),
        mostCleanSheets: playedTeams.filter(team => team.cleanSheets === maxCleanSheets),
        bestGoalDifference: playedTeams.filter(team => team.gd === maxGoalDiff),
    };
}

/**
 * Renders a sortable table into the element with the given containerId.
 * Clicking a column header re-sorts the table by that column.
 */
function makeSortableTable(containerId, data, columns, defaultSortKey, defaultDir, rowRenderer) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let sortKey = defaultSortKey;
    let dir = defaultDir;

    function render() {
        const sorted = [...data].sort((a, b) => {
            const va = a[sortKey];
            const vb = b[sortKey];
            if (typeof va === 'string') {
                return dir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va);
            }
            return dir === 'asc' ? va - vb : vb - va;
        });

        const headers = columns.map(col => {
            const isActive = col.key === sortKey;
            const arrow = isActive ? (dir === 'asc' ? '▲' : '▼') : '⇅';
            return `<th data-sort="${col.key}" class="sortable-col${isActive ? ' sort-active' : ''}">${col.label} <span class="sort-arrow">${arrow}</span></th>`;
        }).join('');

        const rows = sorted.map((row, i) => rowRenderer(row, i, sorted)).join('');

        container.innerHTML = `<div class="table-container"><table>
            <thead><tr>${headers}</tr></thead>
            <tbody>${rows}</tbody>
        </table></div>`;

        container.querySelectorAll('th[data-sort]').forEach(th => {
            th.addEventListener('click', () => {
                const newKey = th.dataset.sort;
                if (newKey === sortKey) {
                    dir = dir === 'asc' ? 'desc' : 'asc';
                } else {
                    sortKey = newKey;
                    dir = (data.length > 0 && data[0][newKey] != null && typeof data[0][newKey] === 'string') ? 'asc' : 'desc';
                }
                render();
            });
        });
    }

    render();
}

function renderStats() {
    const matchHighlightsEl = document.getElementById('match-highlights-container');
    const ownGoalsEl = document.getElementById('own-goals-container');
    const goalTimingEl = document.getElementById('goal-timing-container');
    const goldenBootEl = document.getElementById('golden-boot-container');
    const penaltyGoalsEl = document.getElementById('penalty-goals-container');
    const disciplineEl = document.getElementById('discipline-container');
    const teamHighlightsEl = document.getElementById('team-highlights-container');
    const teamStatsEl = document.getElementById('team-stats-container');
    if (!matchHighlightsEl && !ownGoalsEl && !goalTimingEl && !goldenBootEl && !penaltyGoalsEl && !disciplineEl && !teamHighlightsEl && !teamStatsEl) return;

    const playerStats = computePlayerStats();
    const teamData = computeTeamStats();
    const matchHighlights = computeMatchHighlights();
    const ownGoalStats = computeOwnGoalStats(playerStats);
    const goalTimingStats = computeGoalTimingStats();
    const teamHighlights = computeTeamHighlights(teamData);
    const hasFinishedMatches = !!matchHighlights;
    const hasScorerEvents = !!goalTimingStats.earliestGoal;

    const formatMatchLine = match =>
        `${getFlag(match.home)} ${match.home} ${match.homeGoals}–${match.awayGoals} ${getFlag(match.away)} ${match.away}`;
    const formatGoalEvent = goal => {
        const suffix = goal.type === 'penalty' ? ' (pen.)' : goal.type === 'own goal' ? ' (own goal)' : '';
        return `${goal.minute}' · ${goal.player}${suffix}<br>${getFlag(goal.team)} ${goal.team}`;
    };
    const formatTeamLeaders = teams =>
        teams.length === 1
            ? `${getFlag(teams[0].name)} ${teams[0].name}`
            : `${getFlag(teams[0].name)} ${teams[0].name}<br>+${teams.length - 1} tied`;
    const formatOwnGoalLeader = (players) => {
        if (players.length === 0) return '—';
        const leaders = players.filter(player => player.ownGoals === players[0].ownGoals);
        return leaders.length === 1
            ? `${leaders[0].player}<br>${getFlag(leaders[0].team)} ${leaders[0].team}`
            : `${leaders[0].player}<br>${getFlag(leaders[0].team)} ${leaders[0].team}<br>+${leaders.length - 1} tied`;
    };

    if (matchHighlightsEl) {
        if (!hasFinishedMatches) {
            matchHighlightsEl.innerHTML = renderNoData('No completed matches yet. Check back after the first results are in.');
        } else {
            matchHighlightsEl.innerHTML = renderStatCards([
                {
                    value: matchHighlights.matchesPlayed,
                    label: 'Matches Played',
                    detail: 'Completed matches with final scores'
                },
                {
                    value: matchHighlights.averageGoals,
                    label: 'Avg. Goals / Match',
                    detail: 'Based on all finished matches'
                },
                {
                    value: matchHighlights.biggestWin.goalDiff,
                    label: 'Biggest Winning Margin',
                    detail: formatMatchLine(matchHighlights.biggestWin)
                },
                {
                    value: matchHighlights.highestScoring.totalGoals,
                    label: 'Highest-Scoring Match',
                    detail: formatMatchLine(matchHighlights.highestScoring)
                },
            ]);
        }
    }

    if (ownGoalsEl) {
        if (!hasScorerEvents) {
            const msg = hasFinishedMatches
                ? 'Own-goal data is not yet available from the data source. Match results are on the <a href="schedule.html">Schedule</a> page.'
                : 'No own goals recorded yet. Check back after matches are played.';
            ownGoalsEl.innerHTML = renderNoData(msg);
        } else if (ownGoalStats.totalOwnGoals === 0) {
            ownGoalsEl.innerHTML = renderNoData('No own goals have been recorded so far.');
        } else {
            ownGoalsEl.innerHTML = renderStatCards([
                {
                    value: ownGoalStats.totalOwnGoals,
                    label: 'Total Own Goals',
                    detail: 'From completed matches with scorer data'
                },
                {
                    value: ownGoalStats.players[0].ownGoals,
                    label: 'Most by Player',
                    detail: formatOwnGoalLeader(ownGoalStats.players)
                },
                {
                    value: ownGoalStats.teams[0].ownGoals,
                    label: 'Most by Team',
                    detail: `${getFlag(ownGoalStats.teams[0].team)} ${ownGoalStats.teams[0].team}`
                },
            ]);
        }
    }

    if (goalTimingEl) {
        if (!hasScorerEvents) {
            const msg = hasFinishedMatches
                ? 'Goal timing data is not yet available from the data source. Match results are on the <a href="schedule.html">Schedule</a> page.'
                : 'No goals scored yet. Check back after matches are played.';
            goalTimingEl.innerHTML = renderNoData(msg);
        } else {
            let html = renderStatCards([
                {
                    value: `${goalTimingStats.earliestGoal.minute}'`,
                    label: 'Earliest Goal',
                    detail: formatGoalEvent(goalTimingStats.earliestGoal)
                },
                {
                    value: `${goalTimingStats.latestGoal.minute}'`,
                    label: 'Latest Goal',
                    detail: formatGoalEvent(goalTimingStats.latestGoal)
                },
                {
                    value: goalTimingStats.lateGoalCount,
                    label: 'Late Goals (75\'+)',
                    detail: 'Non-own-goal finishes scored from the 75th minute on'
                },
            ]);

            if (goalTimingStats.lateLeaders.length > 0) {
                html += '<h3>Late Goal Leaders</h3>';
                html += renderStaticTable(
                    ['Player', 'Team', 'Goals 75\'+'],
                    goalTimingStats.lateLeaders,
                    (player) => `<tr>
                        <td>${player.player}</td>
                        <td>${getFlag(player.team)} ${player.team}</td>
                        <td>${player.lateGoals}</td>
                    </tr>`
                );
            } else {
                html += renderNoData('No late goals have been scored yet.');
            }

            goalTimingEl.innerHTML = html;
        }
    }

    // --- Golden Boot ---
    if (goldenBootEl) {
        const scorers = playerStats
            .filter(p => p.goals > 0)
            .sort((a, b) => b.goals - a.goals || b.penalties - a.penalties || a.player.localeCompare(b.player))
            .map((p, i) => ({ ...p, rank: i + 1 }));

        if (scorers.length === 0) {
            const msg = hasFinishedMatches
                ? 'Scorer data is not yet available from the data source. Match results are on the <a href="schedule.html">Schedule</a> page.'
                : 'No goals scored yet. Check back after matches are played.';
            goldenBootEl.innerHTML = `<p class="no-data">${msg}</p>`;
        } else {
            makeSortableTable(
                'golden-boot-container',
                scorers,
                [
                    { key: 'rank', label: '#' },
                    { key: 'player', label: 'Player' },
                    { key: 'team', label: 'Team' },
                    { key: 'goals', label: 'Goals' },
                    { key: 'penalties', label: 'Pen.' },
                ],
                'goals',
                'desc',
                (p) => {
                    const medal = p.rank === 1 ? '🥇' : p.rank === 2 ? '🥈' : p.rank === 3 ? '🥉' : p.rank;
                    return `<tr>
                        <td class="rank-cell">${medal}</td>
                        <td>${p.player}</td>
                        <td>${getFlag(p.team)} ${p.team}</td>
                        <td>${p.goals}</td>
                        <td>${p.penalties > 0 ? p.penalties : '—'}</td>
                    </tr>`;
                }
            );
        }
    }

    if (penaltyGoalsEl) {
        const penaltyLeaders = playerStats
            .filter(player => player.penalties > 0)
            .sort((a, b) => b.penalties - a.penalties || b.goals - a.goals || a.player.localeCompare(b.player))
            .map((player, index) => ({ ...player, rank: index + 1 }));

        if (!hasScorerEvents) {
            const msg = hasFinishedMatches
                ? 'Penalty-goal data is not yet available from the data source. Match results are on the <a href="schedule.html">Schedule</a> page.'
                : 'No penalty goals recorded yet. Check back after matches are played.';
            penaltyGoalsEl.innerHTML = renderNoData(msg);
        } else if (penaltyLeaders.length === 0) {
            penaltyGoalsEl.innerHTML = renderNoData('No penalty goals have been recorded so far.');
        } else {
            makeSortableTable(
                'penalty-goals-container',
                penaltyLeaders,
                [
                    { key: 'rank', label: '#' },
                    { key: 'player', label: 'Player' },
                    { key: 'team', label: 'Team' },
                    { key: 'penalties', label: 'Penalties' },
                    { key: 'goals', label: 'Total Goals' },
                ],
                'penalties',
                'desc',
                (player) => {
                    const medal = player.rank === 1 ? '🥇' : player.rank === 2 ? '🥈' : player.rank === 3 ? '🥉' : player.rank;
                    return `<tr>
                        <td class="rank-cell">${medal}</td>
                        <td>${player.player}</td>
                        <td>${getFlag(player.team)} ${player.team}</td>
                        <td>${player.penalties}</td>
                        <td>${player.goals}</td>
                    </tr>`;
                }
            );
        }
    }

    // --- Discipline ---
    if (disciplineEl) {
        const carded = playerStats
            .filter(p => p.yellowCards > 0 || p.redCards > 0)
            .sort((a, b) => b.redCards - a.redCards || b.yellowCards - a.yellowCards || a.player.localeCompare(b.player));

        if (carded.length === 0) {
            const msg = hasFinishedMatches
                ? 'Card data is not yet available from the data source. Match results are on the <a href="schedule.html">Schedule</a> page.'
                : 'No cards issued yet. Check back after matches are played.';
            disciplineEl.innerHTML = `<p class="no-data">${msg}</p>`;
        } else {
            makeSortableTable(
                'discipline-container',
                carded,
                [
                    { key: 'player', label: 'Player' },
                    { key: 'team', label: 'Team' },
                    { key: 'yellowCards', label: '🟨 Yellow' },
                    { key: 'redCards', label: '🟥 Red' },
                ],
                'redCards',
                'desc',
                (p) => `<tr>
                    <td>${p.player}</td>
                    <td>${getFlag(p.team)} ${p.team}</td>
                    <td>${p.yellowCards > 0 ? p.yellowCards : '—'}</td>
                    <td>${p.redCards > 0 ? `<strong>${p.redCards}</strong>` : '—'}</td>
                </tr>`
            );
        }
    }

    if (teamHighlightsEl) {
        if (!teamHighlights) {
            teamHighlightsEl.innerHTML = renderNoData('No team highlights yet. Check back after matches are played.');
        } else {
            teamHighlightsEl.innerHTML = renderStatCards([
                {
                    value: teamHighlights.mostGoals[0].gf,
                    label: 'Most Goals Scored',
                    detail: formatTeamLeaders(teamHighlights.mostGoals)
                },
                {
                    value: teamHighlights.fewestConceded[0].ga,
                    label: 'Fewest Goals Conceded',
                    detail: formatTeamLeaders(teamHighlights.fewestConceded)
                },
                {
                    value: teamHighlights.mostCleanSheets[0].cleanSheets,
                    label: 'Most Clean Sheets',
                    detail: formatTeamLeaders(teamHighlights.mostCleanSheets)
                },
                {
                    value: teamHighlights.bestGoalDifference[0].gd > 0 ? `+${teamHighlights.bestGoalDifference[0].gd}` : teamHighlights.bestGoalDifference[0].gd,
                    label: 'Best Goal Difference',
                    detail: formatTeamLeaders(teamHighlights.bestGoalDifference)
                },
            ]);
        }
    }

    // --- Team Stats ---
    if (teamStatsEl) {
        makeSortableTable(
            'team-stats-container',
            teamData,
            [
                { key: 'name', label: 'Team' },
                { key: 'played', label: 'GP' },
                { key: 'won', label: 'W' },
                { key: 'drawn', label: 'D' },
                { key: 'lost', label: 'L' },
                { key: 'gf', label: 'GF' },
                { key: 'ga', label: 'GA' },
                { key: 'gd', label: 'GD' },
                { key: 'pts', label: 'Pts' },
                { key: 'cleanSheets', label: 'CS' },
                { key: 'yellowCards', label: '🟨' },
                { key: 'redCards', label: '🟥' },
            ],
            'pts',
            'desc',
            (team) => `<tr>
                <td>${getFlag(team.name)} ${team.name}</td>
                <td>${team.played}</td>
                <td>${team.won}</td>
                <td>${team.drawn}</td>
                <td>${team.lost}</td>
                <td>${team.gf}</td>
                <td>${team.ga}</td>
                <td>${team.gd > 0 ? '+' : ''}${team.gd}</td>
                <td><strong>${team.pts}</strong></td>
                <td>${team.cleanSheets}</td>
                <td>${team.yellowCards}</td>
                <td>${team.redCards}</td>
            </tr>`
        );
    }
}

// ==========================================
// Scroll to Top Button
// ==========================================

function initScrollToTop() {
    const btn = document.getElementById('scroll-to-top');
    if (!btn) return;
    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 300);
    });
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ==========================================
// Page Initializers
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // Countdown (runs on index page)
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // Groups page
    renderGroups();

    // Schedule page
    if (document.getElementById('schedule-container')) {
        renderSchedule();
        initScheduleFilters();
    }

    // Teams page
    renderTeams();

    // Bracket page
    renderBracket();

    // Stats page
    renderStats();

    // Scroll to top
    initScrollToTop();
});
