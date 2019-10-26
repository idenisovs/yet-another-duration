import CalculateMonthsResult from './calculate-months-result';

const DAY = 1000 * 60 * 60 * 24;
const ODD_MONTH_DAYS = 31;
const ODD_MONTH_DAYS_MS = ODD_MONTH_DAYS * DAY;

const days = [ 31, 30, 31, 30, 31, 31, 30, 31, 30, 31, 28, 31 ];

export default function calculateMonths(duration: number): CalculateMonthsResult {
    if (duration < ODD_MONTH_DAYS_MS) {
        return {
            remaining: duration,
            months: 0
        };
    }

    let remaining = duration;
    let remInDays = Math.round(remaining / DAY);
    let months = 0;
    let monthIdx = 0;
    let daysInMonth = 0;

    do {
        months++;

        daysInMonth = days[monthIdx];

        remInDays -= daysInMonth;
        remaining -= daysInMonth * DAY;

        monthIdx++;

        if (monthIdx > 11) {
            monthIdx = 0;
        }
    } while (remInDays >= days[monthIdx]);

    return {
        months: months,
        remaining: remaining
    };
}
