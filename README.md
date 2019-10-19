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
// 0y 0m 19d 2h 7m 34s
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

* `calculateWeeks: boolean (default = false)` - include weeks into calculations;

## Examples

### JavaScript

#### Specifying defaults

```javascript
const {duration} = require('yet-another-duration');

const timer = duration.defaults({ ... });

timer(1234567).toObject();
```

* `defaults` is not affecting the _duration_ library in another modules.
