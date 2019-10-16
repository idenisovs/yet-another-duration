import DurationObject from './duration-object';

export default class Duration {
    public static readonly SEC = 1000;
    public static readonly MIN = Duration.SEC * 60;
    public static readonly HOUR = Duration.MIN * 60;
    public static readonly DAY = Duration.HOUR * 24;
    public static readonly WEEK = Duration.DAY * 7;
    
    private readonly duration: number;

    constructor(duration: number) {
        this.duration = duration;
    }

    toObject(): DurationObject {
        const { WEEK, DAY, HOUR, MIN, SEC } = Duration;

        let rem = this.duration;

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

        return { weeks, days, hours, minutes, seconds, milliseconds: rem }
    }
}
