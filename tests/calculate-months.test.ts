import calculateMonths from '../src/calculate-months';

const DAY = 24 * 60 * 60 * 1000;

describe('calculateMonths(...)', () => {
    test('2m 1d', () => {
        const input = DAY * 31 + DAY * 30 + DAY;
        const actual = calculateMonths(input);
        expect(actual.months).toBe(2);
    });

    test('4m 15d', () => {
        const input = (DAY * 31 + DAY * 30) * 2 + DAY * 15;
        const actual = calculateMonths(input);
        expect(actual.months).toBe(4);
    });

    test('1d', () => {
        const actual = calculateMonths(DAY);
        expect(actual.months).toBe(0);

    });

    test('31d', () => {
        const input = DAY * 31;
        const actual = calculateMonths(input);
        expect(actual.months).toBe(1);
    });

    test('five months', () => {
        const input = (DAY * 31 + DAY * 30) * 2 + DAY * 31;
        const actual = calculateMonths(input);
        expect(actual.months).toBe(5);
    });

    test('11m 1d', () => {
        const input = (DAY * 31 + DAY * 30) * 5 + DAY * 28 + DAY;
        const actual = calculateMonths(input);
        expect(actual.months).toBe(11);
    });

    test('1m', () => {
        const input = DAY * 31;
        const actual = calculateMonths(input);
        expect(actual.months).toBe(1);
    });

    test('364d', () => {
        const input = DAY * 364;
        const actual = calculateMonths(input);
        expect(actual.months).toBe(11);
    });

    test('Zero Case', () => {
        const actual = calculateMonths(0);
        expect(actual.months).toBe(0);
    });
});
