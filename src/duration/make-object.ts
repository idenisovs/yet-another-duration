import calculateMonths from './calculate-months';
import DurationObject from '../duration-object';
import Duration from './index';
import getUnitList from './get-unit-list';
import DurationConfig from '../duration-config';

export default function makeObject(duration: number, config: DurationConfig, units = getUnitList()): DurationObject {
    const { YEAR, WEEK, DAY, HOUR, MIN, SEC } = Duration;

    let years = 0, months = 0, weeks = 0, days = 0, hours = 0, minutes = 0, seconds = 0;

    if (units.indexOf('years') > -1) {
        years = Math.floor(duration / YEAR);
        duration -= years * YEAR;
    }

    if (units.indexOf('months') > -1) {
        const monthsObj = calculateMonths(duration);
        months = monthsObj.months;
        duration = monthsObj.remaining;
    }

    if (units.indexOf('weeks') > -1) {
        weeks = Math.floor(duration / WEEK);
        duration -= weeks * WEEK;
    }

    if (units.indexOf('days') > -1) {
        days = Math.floor(duration / DAY);
        duration -= days * DAY;
    }

    if (units.indexOf('hours') > -1) {
        hours = Math.floor(duration / HOUR);
        duration -= hours * HOUR;
    }

    if (units.indexOf('minutes') > -1) {
        minutes = Math.floor(duration / MIN);
        duration -= minutes * MIN;
    }

    if (units.indexOf('seconds') > -1) {
        seconds = Math.floor(duration / SEC);
        duration -= seconds * SEC;
    }

    const milliseconds = duration;

    const result: DurationObject = {
        years, months, weeks, days, hours, minutes, seconds, milliseconds
    };

    if (!config.calculateWeeks) {
        result.days += result.weeks * 7;
        delete result.weeks;
    }

    return result;
}
