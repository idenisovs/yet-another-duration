import DurationObject from '../duration-object';
import DurationOptions from '../duration-options';
export default class Duration {
    static readonly SEC = 1000;
    static readonly MIN: number;
    static readonly HOUR: number;
    static readonly DAY: number;
    static readonly WEEK: number;
    static readonly YEAR: number;
    private readonly duration;
    private readonly options;
    private readonly units;
    constructor(duration: number, options: DurationOptions);
    toString(): string;
    toTimeSpan(): string;
    toISO8601(): string;
    toObject(): DurationObject;
}
