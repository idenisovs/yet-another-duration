# Yet Another Duration

## Install

```bash
npm install yet-another-duration
```

## Usage

### toString()

Transform the number of milliseconds into the _Duration_ string.

* `duration(milliseconds: number, options?: object).toString()`.
  * `options` is optional param;

```javascript
const {duration} = require('yet-another-duration');

const result = duration(1649254321).toString();
console.log(result);
// 19d 2h 7m 34s
```
  
### toObject()

Transform the number of milliseconds into the _Duration_ object.

* `duration(milliseconds: number, options?: object).toObject();`
  * `options` is optional param;
```javascript
const {duration} = require('yet-another-duration');

/* With config */
const r2 = duration(1649254321, { calculateWeeks: true }).toObject();
console.log(r2);
// { weeks: 2, days: 5, hours: 2, minutes: 7, seconds: 34, milliseconds: 321 }
```

## Options

```json
{
    "calculateWeeks": false,
    "string": {
        "trimZerosLeft": true,
        "trimZerosRight": true,
        "removeZeros": false
    }
}
```

* `calculateWeeks` - include weeks into calculations;
* `trimZerosLeft`, `trimZerosRight` - remove zero values from left or right side of the string;
  * When both options is `true`, then `toString()` will produce `2h 0m 30s` instead of `0y 0m 0d 2h 0m 30s`;
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
