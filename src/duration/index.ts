import DurationObject from '../duration-object';
import DurationConfig from '../duration-config';
import trimZeros from './trim-zero-values';
import makeObject from './make-object';
import getUnitList from './get-unit-list';

export default class Duration {
    public static readonly SEC = 1000;
    public static readonly MIN = Duration.SEC * 60;
    public static readonly HOUR = Duration.MIN * 60;
    public static readonly DAY = Duration.HOUR * 24;
    public static readonly WEEK = Duration.DAY * 7;
    public static readonly YEAR = Duration.DAY * 365;

    private readonly duration: number;
    private readonly config: DurationConfig;
    private units: string[];

    constructor(duration: number, config: DurationConfig) {
        this.duration = duration;
        this.config = config;
    }

    toString(): string {
        this.units = getUnitList();

        this.processWeeksOption();
        this.processUnitsOption();

        const obj = this.toObject();

        trimZeros(this.units, obj, this.config);

        const result: string[] = [];

        for (let unit of this.units) {
            const value = obj[unit as keyof DurationObject];

            result.push(value + unit[0]);
        }

        return result.join(' ');
    }

    toTimeSpan(): string {
        this.units = getUnitList();

        this.processWeeksOption();
        this.processUnitsOption();

        const obj = this.toObject();

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
        this.units = getUnitList();

        this.units.splice(this.units.indexOf('weeks'), 1);

        const obj = this.toObject();

        const result: string[] = [];

        result.push('P');

        for (let unit of this.units) {
            const value = obj[unit as keyof DurationObject];
            const item = value.toString() + unit[0].toUpperCase();
            result.push(item);
            if(unit === 'days') {
                result.push('T');
            }
        }

        return result.join('');
    }

    toObject(): DurationObject {
        return makeObject(this.duration, this.config, this.units)
    }

    private processWeeksOption() {
        if (!this.config.calculateWeeks) {
            this.units.splice(this.units.indexOf('weeks'), 1);
        }
    }

    private processUnitsOption() {
        const { units } = this.config;

        if (!units) {
            return;
        }

        if (units.max) {
            const idx = this.units.indexOf(this.config.units.max);

            if (idx > 0) {
                this.units.splice(0, idx);
            }
        }

        if (units.min) {
            const idx = this.units.indexOf(this.config.units.min);

            if (idx > 0) {
                this.units.splice(idx + 1)
            }
        }
    }
}
