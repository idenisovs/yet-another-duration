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

    constructor(duration: number, config: DurationConfig) {
        this.duration = duration;
        this.config = config;
    }

    toObject(): DurationObject {
        const { YEAR, WEEK, DAY, HOUR, MIN, SEC } = Duration;

        let rem = this.duration;

        const years = Math.floor(rem / YEAR);
        rem -= years * YEAR;

        const monthsObj = calculateMonths(rem);

        const months = monthsObj.months;
        rem = monthsObj.remaining;

        let weeks = 0;

        if (this.config.calculateWeeks) {
            weeks = Math.floor(rem / WEEK);
            rem -= weeks * WEEK;
        }

        const days = Math.floor(rem / DAY);
        rem -= days * DAY;

        const hours = Math.floor(rem / HOUR);
        rem -= hours * HOUR;

        const minutes = Math.floor(rem / MIN);
        rem -= minutes * MIN;

        const seconds = Math.floor(rem / SEC);
        rem -= seconds * SEC;

        const milliseconds = rem;

        if (this.config.calculateWeeks) {
            return { years, months, weeks, days, hours, minutes, seconds, milliseconds };
        } else {
            return { years, months, days, hours, minutes, seconds, milliseconds };
        }
    }
}
