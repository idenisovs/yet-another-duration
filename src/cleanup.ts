import DurationObject from './duration-object';
import StringConfig from './string-config';

export default function cleanup(units: string[], duration: DurationObject, config: StringConfig) {
    if (config.removeZeros) {
        return removeZeros(units, duration);
    }

    if (config.trimZerosLeft) {
        trimZerosLeft(units, duration);
    }

    if (config.trimZerosRight) {
        trimZerosRight(units, duration);
    }
}

function removeZeros(units: string[], duration: DurationObject) {
    for (let idx = 0; idx < units.length; idx++) {
        const unit = units[idx];
        const value = duration[unit as keyof DurationObject];

        if (value === 0) {
            units.splice(idx, 1);
            idx--;
        }
    }
}

function trimZerosLeft(units: string[], duration: DurationObject) {
    let idx: number;

    for (idx = 0; idx < units.length; idx++) {
        const value = duration[units[idx] as keyof DurationObject];

        if (value > 0) {
            break
        }
    }

    units.splice(0, idx);
}

function trimZerosRight(units: string[], duration: DurationObject) {
    let idx: number;

    for (idx = units.length - 1; idx >= 0; idx--) {
        const value = duration[units[idx] as keyof DurationObject];

        if (value > 0) {
            break
        }
    }

    units.splice(idx + 1);
}
