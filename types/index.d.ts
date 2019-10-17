import Duration from './duration';
export declare function duration(value: number, config?: {}): Duration;
export declare namespace duration {
    var defaults: (defaultConfig: any) => {
        (value: number, config?: any): Duration;
        defaults: any;
    };
}
