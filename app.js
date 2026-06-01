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

// Full group stage schedule - all 72 matches
const SCHEDULE = [
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
    return FLAGS[teamName] || '🏳️';
}

function formatDate(dateStr) {
    const date = new Date(dateStr + 'T12:00:00');
    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

function getTeamGroup(teamName) {
    for (const [groupKey, groupData] of Object.entries(GROUPS)) {
        for (const team of groupData.teams) {
            if (team.name === teamName) return groupKey;
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
            m.group.toLowerCase() === f.replace('group ', '') ||
            m.city.toLowerCase().includes(f)
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
                ? `<span class="match-score">${m.score}</span>`
                : `<span class="match-score upcoming">vs</span>`;
            html += `
                <div class="match-item">
                    <div class="match-time"><span class="match-group-badge">${m.group}</span>${m.time}</div>
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

    // Populate team filter
    if (teamFilter) {
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

    const rounds = [
        {
            name: 'Round of 32',
            date: 'July 1–6, 2026',
            matches: Array.from({ length: 16 }, (_, i) => ({
                label: `Match R32-${i + 1}`,
                team1: 'TBD',
                team2: 'TBD',
                date: 'July 1–6',
                venue: 'TBD'
            }))
        },
        {
            name: 'Round of 16',
            date: 'July 8–11, 2026',
            matches: Array.from({ length: 8 }, (_, i) => ({
                label: `Match R16-${i + 1}`,
                team1: 'TBD',
                team2: 'TBD',
                date: 'July 8–11',
                venue: 'TBD'
            }))
        },
        {
            name: 'Quarter-Finals',
            date: 'July 13–14, 2026',
            matches: Array.from({ length: 4 }, (_, i) => ({
                label: `QF ${i + 1}`,
                team1: 'TBD',
                team2: 'TBD',
                date: 'July 13–14',
                venue: 'TBD'
            }))
        },
        {
            name: 'Semi-Finals',
            date: 'July 16–17, 2026',
            matches: [
                { label: 'SF 1', team1: 'TBD', team2: 'TBD', date: 'July 16', venue: 'TBD' },
                { label: 'SF 2', team1: 'TBD', team2: 'TBD', date: 'July 17', venue: 'TBD' },
            ]
        },
        {
            name: '3rd Place Match',
            date: 'July 18, 2026',
            matches: [
                { label: '3rd Place', team1: 'TBD', team2: 'TBD', date: 'July 18', venue: 'Hard Rock Stadium, Miami' },
            ]
        },
        {
            name: 'Final',
            date: 'July 19, 2026',
            matches: [
                { label: 'World Cup Final', team1: 'TBD', team2: 'TBD', date: 'July 19', venue: 'MetLife Stadium, New York/New Jersey' },
            ]
        },
    ];

    let html = '';
    for (const round of rounds) {
        html += `<div class="round-section">
            <div class="round-header">🏆 ${round.name} — ${round.date}</div>
            <div class="matches-grid">`;
        for (const match of round.matches) {
            html += `
                <div class="bracket-match">
                    <div class="match-header">${match.label} · ${match.date}</div>
                    <div class="bracket-team tbd"><span>${match.team1 !== 'TBD' ? getFlag(match.team1) + ' ' : ''}${match.team1}</span><span class="score">-</span></div>
                    <div class="bracket-team tbd"><span>${match.team2 !== 'TBD' ? getFlag(match.team2) + ' ' : ''}${match.team2}</span><span class="score">-</span></div>
                    <div class="bracket-match-footer">🏟️ ${match.venue}</div>
                </div>`;
        }
        html += '</div></div>';
    }
    container.innerHTML = html;
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

    // Scroll to top
    initScrollToTop();
});
