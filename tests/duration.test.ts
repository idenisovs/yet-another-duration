import Duration from '../src/duration';
import DurationConfig from '../src/duration-config';

const DEFAULT_CONFIG: DurationConfig = {
    calculateWeeks: false,
    string: {
        trimZerosLeft: true,
        trimZerosRight: true,
        removeZeros: false
    }
};

describe("Duration class", () => {
    const { YEAR, DAY, HOUR, MIN, SEC } = Duration;

    describe('toObject(...)', () => {
        test('toObject return object', () => {
            const d = new Duration(65123, DEFAULT_CONFIG);
            const result = d.toObject();

            expect(result).not.toBeNull();
            expect(result).toMatchObject({
                minutes: 1,
                seconds: 5,
                milliseconds: 123
            });
        });

        test('Duration input match duration output', () => {
            const input = (DAY * 31)
                + DAY * 5
                + HOUR * 4
                + MIN * 30
                + SEC * 15;

            const output = (new Duration(input, DEFAULT_CONFIG)).toObject();

            expect(output).toMatchObject({
                months: 1,
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
            const output = (new Duration(0, DEFAULT_CONFIG)).toObject();

            expect(output).toMatchObject({
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
                milliseconds: 0
            });
        });
    });

    describe('toString(...) full', () => {
        const longStrings = Object.assign({}, DEFAULT_CONFIG, { string: {
            trimZerosLeft: false,
            trimZerosRight: false
        }});

        test('2y 4m 12d 5h 31m 1s', () => {
            const input = YEAR * 2
                + ((DAY * 31 + DAY * 30) * 2)
                + DAY * 12
                + HOUR * 5
                + MIN * 31
                + SEC;

            const output = (new Duration(input, longStrings)).toString();

            expect(output).toBe('2y 4m 12d 5h 31m 1s');
        });

        test('0y 0m 0d 2h 30m 0s', () => {
            const input = MIN * 150;

            const output = (new Duration(input, longStrings)).toString();

            expect(output).toBe('0y 0m 0d 2h 30m 0s');
        });

        test('0y 0m 0d 0h 0m 59s', () => {
            const input = SEC * 59;

            const output = (new Duration(input, longStrings)).toString();

            expect(output).toBe('0y 0m 0d 0h 0m 59s');
        });

        test('0y 5m 0d 0h 0m 0s', () => {
            const input = (DAY * 31 + DAY * 30) * 2 + DAY * 31;
            const output = (new Duration(input, longStrings)).toString();
            expect(output).toBe('0y 5m 0d 0h 0m 0s');
        });

        test('0y 11m 30d 0h 0m 0s', () => {
            const input = 364 * DAY;
            const output = (new Duration(input, longStrings)).toString();
            expect(output).toBe('0y 11m 30d 0h 0m 0s');
        });
    });

    describe('Config Options', () => {
        const { WEEK, DAY, HOUR, MIN, SEC } = Duration;

        describe('Weeks options', () => {
            test('calculateWeeks = false', () => {
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

        describe('String option', () => {
            test('trimZerosLeft = true', () => {
                const trimZerosLeft = Object.assign({}, DEFAULT_CONFIG, { string: { trimZerosLeft: true } });

                const input = DAY * 5
                    + HOUR * 4
                    + MIN * 30;

                const result = (new Duration(input, trimZerosLeft)).toString();

                expect(result).toBe('5d 4h 30m 0s');
            });

            test('trimZerosRight = true', () => {
                const trimZerosLeft = Object.assign({}, DEFAULT_CONFIG, { string: { trimZerosRight: true } });

                const input = DAY * 5
                    + HOUR * 4;

                const result = (new Duration(input, trimZerosLeft)).toString();

                expect(result).toBe('0y 0m 5d 4h');
            });

            test('trimZerosLef, trimZerosRight', () => {
                const trimZerosLeft = Object.assign({}, DEFAULT_CONFIG, { string: { trimZerosLeft: true, trimZerosRight: true } });

                const input = DAY * 5
                    + HOUR * 4;

                const result = (new Duration(input, trimZerosLeft)).toString();

                expect(result).toBe('5d 4h');
            });

            test('Default config for zeros trimming', () => {
                const input = DAY * 5
                    + HOUR * 4;

                const result = (new Duration(input, DEFAULT_CONFIG)).toString();

                expect(result).toBe('5d 4h');
            });

            test('removeZeros = true', () => {
                const removeZerosConfig = Object.assign({}, DEFAULT_CONFIG, {
                    string: { removeZeros: true, trimZerosLeft: false, trimZerosRight: false }
                });

                const input = HOUR * 2 + SEC * 30;

                const result = (new Duration(input, removeZerosConfig)).toString();

                expect(result).toBe('2h 30s');
            });
        });

        describe('Units option', () => {
            test('Max unit = days', () => {
                const maxUnitsConfig = Object.assign({}, DEFAULT_CONFIG, {
                    units: {
                        max: 'days'
                    }
                });

                const input = HOUR * 1500 + MIN * 35 + SEC * 25;

                const result = (new Duration(input, maxUnitsConfig)).toString();

                expect(result).toBe('62d 12h 35m 25s');
            });

            test('Max unit = years', () => {
                const maxUnitsConfig = Object.assign({}, DEFAULT_CONFIG, {
                    units: {
                        max: 'years'
                    }
                });

                const input = YEAR
                    + ((DAY * 31 + DAY * 30) * 2)
                    + DAY * 12
                    + HOUR * 5
                    + MIN * 31
                    + SEC;

                const output = (new Duration(input, maxUnitsConfig)).toString();

                expect(output).toBe('1y 4m 12d 5h 31m 1s');
            });

            test('Max unit = seconds', () => {
                const maxUnitsConfig = Object.assign({}, DEFAULT_CONFIG, {
                    units: {
                        max: 'seconds'
                    }
                });

                const input = HOUR * 2 + MIN * 35 + SEC * 25;

                const result = (new Duration(input, maxUnitsConfig)).toString();

                const expected = `${input/1000}s`;

                expect(result).toBe(expected);
            });

            test('Min unit = days', () => {
                const minUnitsConfig = Object.assign({}, DEFAULT_CONFIG, {
                    units: {
                        min: 'days'
                    }
                });

                const input = YEAR + DAY * 168 + HOUR * 12 + MIN * 35 + SEC * 25;

                const result = (new Duration(input, minUnitsConfig)).toString();

                expect(result).toBe('1y 5m 15d');
            });

            test('Min unit = hours', () => {
                const minUnitsConfig = Object.assign({}, DEFAULT_CONFIG, {
                    units: {
                        min: 'hours'
                    }
                });

                const input = SEC * 90000;

                const result = (new Duration(input, minUnitsConfig)).toString();

                expect(result).toBe('1d 1h');
            });

            test('Min & Max units', () => {
                const unitsConfig = Object.assign({}, DEFAULT_CONFIG, {
                    units: {
                        min: 'hours',
                        max: 'hours'
                    }
                });

                const input = SEC * 90000;

                const result = (new Duration(input, unitsConfig)).toString();

                expect(result).toBe('25h');
            });

            test('Units overlaps', () => {
                const unitsConfig = Object.assign({}, DEFAULT_CONFIG, {
                    units: {
                        min: 'months',
                        max: 'hours'
                    }
                });

                const input = DAY * 135;

                const result = (new Duration(input, unitsConfig)).toString();

                expect(result).toBe('3240h');
            });
        });
    });
});
