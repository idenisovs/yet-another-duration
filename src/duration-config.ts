import StringConfig from './string-config';

export default interface DurationConfig {
    calculateWeeks?: boolean;
    units?: { max?: 'string', min?: 'string' };
    string?: StringConfig;
}
