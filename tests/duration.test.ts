import Duration from '../src/duration';

describe("Duration class", () => {
    test('toObject return object', () => {
        const d = new Duration(65123, {});
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

        const output = (new Duration(input, {})).toObject();

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
        const output = (new Duration(0, {})).toObject();

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
