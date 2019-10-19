import Duration from './duration';
import DurationConfig from './duration-config';

const DEFAULT_CONFIG: DurationConfig = {
    calculateWeeks: false,
    string: {
        trimZerosLeft: true,
        trimZerosRight: true,
        removeZeros: false
    }
};

export function duration(value: number, config = DEFAULT_CONFIG): Duration {
    return new Duration(value, Object.assign({}, DEFAULT_CONFIG, config));
}

duration.defaults = defaults;

function defaults(defaultConfig: DurationConfig) {
    function bootstrappedDuration(value: number, config = defaultConfig) {
        return duration(value, Object.assign({}, defaultConfig, config));
    }

    bootstrappedDuration.defaults = defaults;

    return bootstrappedDuration;
}
