import DurationOptions from './duration-options';
import Duration from './duration/index';
export declare function duration(value: number, config?: DurationOptions): Duration;
export declare namespace duration {
    var defaults: (defaultConfig: DurationOptions) => {
        (value: number, config?: DurationOptions): Duration;
        defaults: any;
    };
}
