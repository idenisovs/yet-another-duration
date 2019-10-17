import Duration from './duration';
import CalculateMonthsResult from './calculate-months-result';

const ODD_MONTH_DAYS = 31;
const EVEN_MONTH_DAYS = 30;
const FEBRUARY_DAYS = 28;
const MARCH = 10;

export default function calculateMonths(duration: number): CalculateMonthsResult {
    const {MONTH, DAY} = Duration;

    if (duration / MONTH < 1) {
        return {
            remaining: duration,
            months: 0
        };
    }

    let remInDays = duration / DAY;
    let odd = true;
    let months = 0;
    let daysInNextMonth = ODD_MONTH_DAYS;

    do {
        months++;
        odd = !odd;
        remInDays -= daysInNextMonth;

        if (months % MARCH === 0) {
            daysInNextMonth = FEBRUARY_DAYS;
        } else {
            daysInNextMonth = odd ? ODD_MONTH_DAYS : EVEN_MONTH_DAYS;
        }

    } while (remInDays > daysInNextMonth);

    return {
        months: months,
        remaining: remInDays * DAY
    };
}
