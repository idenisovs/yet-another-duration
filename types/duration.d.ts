import DurationObject from './duration-object';
export default class Duration {
    static readonly SEC = 1000;
    static readonly MIN: number;
    static readonly HOUR: number;
    static readonly DAY: number;
    static readonly WEEK: number;
    private readonly duration;
    private readonly config;
    constructor(duration: number, config: any);
    toObject(): DurationObject;
}
