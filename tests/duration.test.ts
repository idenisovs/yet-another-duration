import Duration from '../src/duration';
import DurationConfig from '../src/duration-config';

const config: DurationConfig = {
    calculateWeeks: true
};

describe("Duration class", () => {
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
            const { WEEK, DAY, HOUR, MIN, SEC } = Duration;

            const input = WEEK * 6
                + DAY * 5
                + HOUR * 4
                + MIN * 30
                + SEC * 15;

            const output = (new Duration(input, config)).toObject();

            expect(output).toMatchObject({
                weeks: 6,
                days: 5,
                hours: 4,
                minutes: 30,
                seconds: 15,
                milliseconds: 0
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

    describe('Config Options', () => {
        test('W/out Weeks', () => {
            config.calculateWeeks = false;

            const { WEEK, DAY, HOUR, MIN, SEC } = Duration;

            const input = WEEK * 6
                + DAY * 5
                + HOUR * 4
                + MIN * 30
                + SEC * 15;

            const result = (new Duration(input, config)).toObject();

            expect(result).toMatchObject({
                days: 7 * 6 + 5,
                hours: 4,
                minutes: 30,
                seconds: 15,
                milliseconds: 0
            });

            expect(result).not.toHaveProperty('weeks');
        });
    });
});
