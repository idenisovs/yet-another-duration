import Duration from './duration';
import DurationConfig from './duration-config';
export declare function duration(value: number, config?: DurationConfig): Duration;
export declare namespace duration {
    var defaults: (defaultConfig: DurationConfig) => {
        (value: number, config?: DurationConfig): Duration;
        defaults: any;
    };
}
