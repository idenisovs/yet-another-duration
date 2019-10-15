import DurationObject from './duration-object';

const SEC = 1000;
const MIN = SEC * 60;
const HOUR = MIN * 60;
const DAY = HOUR * 24;
const WEEK = DAY * 7;

export default class Duration {
    private readonly duration: number;

    constructor(duration: number) {
        this.duration = duration;
    }

    toObject(): DurationObject {
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
