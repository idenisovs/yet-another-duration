import DurationObject from './duration-object';
import DurationConfig from './duration-config';
import calculateMonths from './calculate-months';

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

        if (!this.config.calculateWeeks) {
            this.units.splice(this.units.indexOf('weeks'), 1);
        }
    }

    toString() {
        const obj = this.toObject();

        const result: string[] = [];

        for (let unit of this.units) {
            result.push(obj[unit as keyof DurationObject] + unit[0]);
        }

        return result.join(' ');
    }

    toObject(): DurationObject {
        const { YEAR, WEEK, DAY, HOUR, MIN, SEC } = Duration;

        let rem = this.duration;

        const years = Math.floor(rem / YEAR);
        rem -= years * YEAR;

        const monthsObj = calculateMonths(rem);

        const months = monthsObj.months;
        rem = monthsObj.remaining;

        const weeks = Math.floor(rem / WEEK);
        rem -= weeks * WEEK;

        const days = Math.floor(rem / DAY);
        rem -= days * DAY;

        const hours = Math.floor(rem / HOUR);
        rem -= hours * HOUR;

        const minutes = Math.floor(rem / MIN);
        rem -= minutes * MIN;

        const seconds = Math.floor(rem / SEC);
        rem -= seconds * SEC;

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
}
