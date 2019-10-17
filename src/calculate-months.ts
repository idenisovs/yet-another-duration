import CalculateMonthsResult from './calculate-months-result';

const DAY = 1000 * 60 * 60 * 24;
const ODD_MONTH_DAYS = 31;
const EVEN_MONTH_DAYS = 30;
const FEBRUARY_DAYS = 28;
const MARCH = 10;
const ODD_MONTH_DAYS_MS = ODD_MONTH_DAYS * DAY;

export default function calculateMonths(duration: number): CalculateMonthsResult {
    if (duration < ODD_MONTH_DAYS_MS) {
        return {
            remaining: duration,
            months: 0
        };
    }

    let remaining = duration;
    let remInDays = Math.round(duration / DAY);
    let odd = true;
    let months = 0;
    let daysInNextMonth = ODD_MONTH_DAYS;
    let currentMonthDays = 0;

    do {
        months++;
        odd = !odd;
        currentMonthDays = daysInNextMonth;
        remaining -= currentMonthDays * DAY;
        remInDays -= currentMonthDays;
        daysInNextMonth = getDaysInNextMonth(months, odd);
    } while (remInDays > daysInNextMonth);

    return {
        months: months,
        remaining: remaining
    };
}

function getDaysInNextMonth(months: number, odd: boolean): number {
    if (months % MARCH === 0) {
        return FEBRUARY_DAYS;
    }

    return odd ? ODD_MONTH_DAYS : EVEN_MONTH_DAYS;
}
