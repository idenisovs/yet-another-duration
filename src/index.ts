import Duration from './duration';

export function duration(value: number): Duration {
    return new Duration(value);
}
