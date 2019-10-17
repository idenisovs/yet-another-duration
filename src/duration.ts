import DurationObject from './duration-object';
import DurationConfig from './duration-config';

export default class Duration {
    public static readonly SEC = 1000;
    public static readonly MIN = Duration.SEC * 60;
    public static readonly HOUR = Duration.MIN * 60;
    public static readonly DAY = Duration.HOUR * 24;
    public static readonly WEEK = Duration.DAY * 7;
    public static readonly MONTH = Duration.DAY * 31;
    
    private readonly duration: number;
    private readonly config: DurationConfig;

    constructor(duration: number, config: DurationConfig) {
        this.duration = duration;
        this.config = config;
    }

    toObject(): DurationObject {
        const { WEEK, DAY, HOUR, MIN, SEC } = Duration;

        let rem = this.duration;

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

        const result: DurationObject = { days, hours, minutes, seconds, milliseconds: rem };

        if (this.config.calculateWeeks) {
            result.weeks = weeks;
        }

        return result;
    }
}
