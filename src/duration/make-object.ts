import calculateMonths from './calculate-months';
import DurationObject from '../duration-object';
import Duration from './index';
import getUnitList from './get-unit-list';

export default function makeObject(duration: number, units = getUnitList()): DurationObject {
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

    const requiredWeeks = units.indexOf('weeks') > -1;

    if (requiredWeeks) {
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

    if (requiredWeeks) {
        return { years, months, weeks, days, hours, minutes, seconds, milliseconds };
    } else {
        return { years, months, days, hours, minutes, seconds, milliseconds };
    }
}
