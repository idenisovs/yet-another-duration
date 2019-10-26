export default interface DurationOptions {
    calculateWeeks?: boolean;
    units?: {
        max?: string,
        min?: string
    };
    string?: {
        trimZerosLeft?: boolean;
        trimZerosRight?: boolean;
        removeZeros?: boolean;
    };
}
