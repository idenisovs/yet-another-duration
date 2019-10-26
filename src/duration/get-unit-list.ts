export default function getUnitList(includeWeeks = false): string[] {
    if (includeWeeks) {
        return [ 'years', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds' ];
    } else {
        return [ 'years', 'months', 'days', 'hours', 'minutes', 'seconds' ];
    }
}
