import makeObject from '../src/duration/make-object';

const units = [ 'years', 'months', 'days', 'hours', 'minutes', 'seconds' ];

const SEC = 1000;
const MIN = SEC * 60;
const HOUR = MIN * 60;
const DAY = HOUR * 24;
const YEAR = DAY * 365;

describe('makeObject(...)', () => {
    test('1s', () => {
        const result = makeObject(SEC, units);

        expect(result).toMatchObject({
            seconds: 1
        });
    });

    test('5014s => 1h 23m 34s', () => {
        const input = HOUR + MIN * 23 + SEC * 34;
        const result = makeObject(input, units);

        expect(result).toMatchObject({
            hours: 1,
            minutes: 23,
            seconds: 34
        });
    });

    test('1y 1m 1d 1h 1m 1s', () => {
        const input = YEAR + DAY * 32 + HOUR + MIN + SEC;
        const result = makeObject(input, units);

        expect(result).toMatchObject({
            years: 1,
            months: 1,
            days: 1,
            hours: 1,
            minutes: 1,
            seconds: 1
        });
    });
});
