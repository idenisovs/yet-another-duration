export default interface DurationConfig {
    calculateWeeks?: boolean;
    units?: {
        max?: string;
        min?: string;
    };
    string?: {
        trimZerosLeft?: boolean;
        trimZerosRight?: boolean;
        removeZeros?: boolean;
    };
}
