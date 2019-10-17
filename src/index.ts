import Duration from './duration';

const DEFAULT_CONFIG = {};

export function duration(value: number, config = DEFAULT_CONFIG): Duration {
    return new Duration(value, config);
}

duration.defaults = defaults;

function defaults(defaultConfig: any) {
    function bootstrappedDuration(value: number, config = defaultConfig) {
        return duration(value, config);
    }

    bootstrappedDuration.defaults = defaults;

    return bootstrappedDuration;
}
