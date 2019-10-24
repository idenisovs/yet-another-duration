import DurationObject from './duration-object';
import DurationConfig from './duration-config';
import calculateMonths from './calculate-months';
import cleanup from './cleanup';

export default class Duration {
    public static readonly SEC = 1000;
    public static readonly MIN = Duration.SEC * 60;
    public static readonly HOUR = Duration.MIN * 60;
    public static readonly DAY = Duration.HOUR * 24;
    public static readonly WEEK = Duration.DAY * 7;
    public static readonly YEAR = Duration.DAY * 365;

    private readonly duration: number;
    private readonly config: DurationConfig;
    private readonly units: string[];

    constructor(duration: number, config: DurationConfig) {
        this.duration = duration;
        this.config = config;
        this.units = [ 'years', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds' ];

        this.processWeeksOption();
        this.processUnitsOption();
    }

    toString() {
        const obj = this.toObject();

        const result: string[] = [];

        cleanup(this.units, obj, this.config);

        for (let unit of this.units) {
            const value = obj[unit as keyof DurationObject];

            result.push(value + unit[0]);
        }

        return result.join(' ');
    }

    toObject(): DurationObject {
        const { YEAR, WEEK, DAY, HOUR, MIN, SEC } = Duration;

        let years = 0, months = 0, weeks = 0, days = 0, hours = 0, minutes = 0, seconds = 0;

        let rem = this.duration;

        if (this.units.indexOf('years') > -1) {
            years = Math.floor(rem / YEAR);
            rem -= years * YEAR;
        }

        if (this.units.indexOf('months') > -1) {
            const monthsObj = calculateMonths(rem);
            months = monthsObj.months;
            rem = monthsObj.remaining;
        }

        if (this.units.indexOf('weeks') > -1) {
            weeks = Math.floor(rem / WEEK);
            rem -= weeks * WEEK;
        }

        if (this.units.indexOf('days') > -1) {
            days = Math.floor(rem / DAY);
            rem -= days * DAY;
        }

        if (this.units.indexOf('hours') > -1) {
            hours = Math.floor(rem / HOUR);
            rem -= hours * HOUR;
        }

        if (this.units.indexOf('minutes') > -1) {
            minutes = Math.floor(rem / MIN);
            rem -= minutes * MIN;
        }

        if (this.units.indexOf('seconds') > -1) {
            seconds = Math.floor(rem / SEC);
            rem -= seconds * SEC;
        }

        const milliseconds = rem;

        const result: DurationObject = {
            years, months, weeks, days, hours, minutes, seconds, milliseconds
        };

        if (!this.config.calculateWeeks) {
            result.days += result.weeks * 7;
            delete result.weeks;
        }

        return result;
    }

    processWeeksOption() {
        if (!this.config.calculateWeeks) {
            this.units.splice(this.units.indexOf('weeks'), 1);
        }
    }

    processUnitsOption() {
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
