import Duration from '../src/duration';
import DurationConfig from '../src/duration-config';

const config: DurationConfig = {
    calculateWeeks: true
};

describe("Duration class", () => {
    const { YEAR, WEEK, DAY, HOUR, MIN, SEC } = Duration;

    describe('toObject(...)', () => {
        test('toObject return object', () => {
            const d = new Duration(65123, config);
            const result = d.toObject();

            expect(result).not.toBeNull();
            expect(result).toMatchObject({
                minutes: 1,
                seconds: 5,
                milliseconds: 123
            });
        });

        test('Duration input match duration output', () => {
            const input = WEEK * 3
                + DAY * 5
                + HOUR * 4
                + MIN * 30
                + SEC * 15;

            const output = (new Duration(input, config)).toObject();

            expect(output).toMatchObject({
                weeks: 3,
                days: 5,
                hours: 4,
                minutes: 30,
                seconds: 15,
                milliseconds: 0
            });
        });

        test('Duration input match duration output (w/out weeks)', () => {
            const { YEAR, DAY, HOUR, MIN, SEC } = Duration;

            const input = YEAR * 2
                + (DAY * 31 + DAY * 30) * 2
                + DAY * 15
                + HOUR * 8
                + MIN * 30
                + SEC * 15
                + 123;

            const output = (new Duration(input, { calculateWeeks: false })).toObject();

            expect(output).toMatchObject({
                years: 2,
                months: 4,
                days: 15,
                hours: 8,
                minutes: 30,
                seconds: 15,
                milliseconds: 123
            });
        });

        test('Zero input', () => {
            const output = (new Duration(0, config)).toObject();

            expect(output).toMatchObject({
                weeks: 0,
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
                milliseconds: 0
            });
        });
    });

    describe('toString(...)', () => {
        test('2y 4m 12d 5h 31m 1s', () => {
            const input = YEAR * 2
                + ((DAY * 31 + DAY * 30) * 2)
                + DAY * 12
                + HOUR * 5
                + MIN * 31
                + SEC;

            const output = (new Duration(input, {})).toString();

            expect(output).toBe('2y 4m 12d 5h 31m 1s');
        });

        test('0y 0m 0d 2h 30m 0s', () => {
            const input = MIN * 150;

            const output = (new Duration(input, {})).toString();

            expect(output).toBe('0y 0m 0d 2h 30m 0s');
        });

        test('0y 0m 0d 0h 0m 59s', () => {
            const input = SEC * 59;

            const output = (new Duration(input, {})).toString();

            expect(output).toBe('0y 0m 0d 0h 0m 59s');
        });
    });

    describe('Config Options', () => {
        test('W/out Weeks', () => {
            const { WEEK, DAY, HOUR, MIN, SEC } = Duration;

            const input = WEEK
                + DAY * 5
                + HOUR * 4
                + MIN * 30
                + SEC * 15;

            const result = (new Duration(input, { calculateWeeks: false })).toObject();

            expect(result).toMatchObject({
                days: 12,
                hours: 4,
                minutes: 30,
                seconds: 15,
                milliseconds: 0
            });

            expect(result).not.toHaveProperty('weeks');
        });
    });
});
