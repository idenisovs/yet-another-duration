import DurationObject from '../duration-object';
import DurationOptions from '../duration-options';
import trimZeros from './trim-zero-values';
import makeObject from './make-object';
import getUnitList from './get-unit-list';
import processUnitsOption from './process-units-option';

export default class Duration {
    public static readonly SEC = 1000;
    public static readonly MIN = Duration.SEC * 60;
    public static readonly HOUR = Duration.MIN * 60;
    public static readonly DAY = Duration.HOUR * 24;
    public static readonly WEEK = Duration.DAY * 7;
    public static readonly YEAR = Duration.DAY * 365;

    private readonly duration: number;
    private readonly options: DurationOptions;
    private readonly units: string[];

    constructor(duration: number, options: DurationOptions) {
        this.duration = duration;
        this.options = options;

        this.units = getUnitList(this.options.calculateWeeks);

       processUnitsOption(this.units, this.options);
    }

    toString(): string {
        const obj = makeObject(this.duration, this.units);

        trimZeros(this.units, obj, this.options);

        const result: string[] = [];

        for (let unit of this.units) {
            const value = obj[unit as keyof DurationObject];

            result.push(value + unit[0]);
        }

        return result.join(' ');
    }

    toTimeSpan(): string {
        const obj = makeObject(this.duration, this.units);

        const result: string[] = [];

        for (let unit of this.units) {
            const value = obj[unit as keyof DurationObject];

            if (value < 10) {
                result.push('0' + value.toString());
            } else {
                result.push(value.toString());
            }
        }

        return result.join(':');
    }

    toISO8601() {
        const obj = makeObject(this.duration, getUnitList());

        const result: string[] = [];

        result.push('P');

        for (let unit of this.units) {
            const value = obj[unit as keyof DurationObject];
            const item = value.toString() + unit[0].toUpperCase();

            result.push(item);
        }

        result.splice(4, 0, 'T');

        return result.join('');
    }

    toObject(): DurationObject {
        return makeObject(this.duration, this.units)
    }
}
