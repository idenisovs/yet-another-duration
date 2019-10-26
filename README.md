# Yet Another Duration

## Install

```bash
npm install yet-another-duration
```

## Usage

### toString()

Transform the number of milliseconds into the _Duration_ string.

* `duration(milliseconds, options).toString()`.
  * `options` is optional param;

```javascript
const {duration} = require('yet-another-duration');

const result = duration(1649254321).toString();

console.log(result); // 19d 2h 7m 34s
```

### toTimeSpan()

Transform the number of milliseconds into the _Timespan_ string, eq. `01:12:34:55`.

```javascript
const {duration} = require('yet-another-duration');

const result = duration(131695000).toTimeSpan();

console.log(result); // 01:12:34:55
```

### toISO8601()

Transform the number of milliseconds into the [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601#Durations) duration string, eq. `P1Y2M10DT2H30M`.

```javascript
const {duration} = require('yet-another-duration');

const result = duration(131695000).toTimeSpan();

console.log(result); // P0Y0M1DT12H34M55S
```
  
### toObject()

Transform the number of milliseconds into the _Duration_ object.

* `duration(milliseconds, options).toObject();`
  * `options` is optional param;
  
```javascript
const {duration} = require('yet-another-duration');

const r2 = duration(1649254321).toObject();

console.log(r2); // { years: 0, months: 0, days: 19 ... }
```

## Options

```typescript
interface DurationConfig {
    calculateWeeks?: boolean;
    units?: {
        max?: string,
        min?: string
    };
    string?: {
        trimZerosLeft?: boolean;
        trimZerosRight?: boolean;
        removeZeros?: boolean;
    };
}
```

* `calculateWeeks` `true|false` - include weeks into calculations;

### units options

* `max` `years|months|weeks|days|hours|minutes|seconds` - set max unit for output:
  * If set to `hours`, then `1m 15d 12h 32m 45s` -> `1116h 32m 45s`;
* `min` `years|months|weeks|days|hours|minutes|seconds` - set min unit for output:
  * If set to `days`, then `1m 15d 12h 32m 45s` -> `1m 15d`;

Both options may be provided together. As example: 
  * If max is set to `days`, min is set to `hours`: `1m 15d 12h 32m 45s` -> `46d 12h`;


### string options

* `trimZerosLeft` `true|false` - remove zero values from left side of the string:
  * If true, then `0y 0m 0d 2h 0m 30s` -> `2h 0m 30s`;
* `trimZerosRight` `true|false` - remove zero values from right side of the string:
  * If true, then `0y 0m 5d 12h 0m 0s` -> `0y 0m 5d 12h`;
  * If both options is set `true`, then `toString()` will produce `5d 12h` instead of `0y 0m 5d 12h 0m 0s`;
* `removeZeros` - remove zero values from the string;
  * When `removeZeros` option is `true`, then `toString()` will produce `2h 30s` instead of `0y 0m 0d 2h 0m 30s`;

## Examples

### JavaScript

#### Specifying defaults

```javascript
const {duration} = require('yet-another-duration');

const timer = duration.defaults({ ... });

timer(1234567).toObject();
```

* `defaults` is not affecting the _duration_ library in another modules.
