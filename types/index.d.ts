declare module 'yet-another-duration' {
    export interface DurationObject {
        weeks: number;
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
        milliseconds: number;
    }

    /**
     * Duration class.
     */
    export class Duration {
        toObject(): DurationObject;
    }

    /**
     * Convert milliseconds to duration
     * @param duration
     */
    export function duration(duration: number): Duration;
}
