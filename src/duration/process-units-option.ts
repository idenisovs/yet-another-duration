import DurationOptions from '../duration-options';

export default function processUnitsOption(unitList: string[], options: DurationOptions) {
    const { units } = options;

    if (!units) {
        return;
    }

    if (units.max) {
        const idx = unitList.indexOf(units.max);

        if (idx > 0) {
            unitList.splice(0, idx);
        }
    }

    if (units.min) {
        const idx = unitList.indexOf(units.min);

        if (idx > 0) {
            unitList.splice(idx + 1);
        }
    }
}
