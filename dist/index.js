(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["yetAnotherDuration"] = factory();
	else
		root["yetAnotherDuration"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/duration/calculate-months.ts":
/*!******************************************!*\
  !*** ./src/duration/calculate-months.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ calculateMonths)
/* harmony export */ });
var DAY = 1000 * 60 * 60 * 24;
var ODD_MONTH_DAYS = 31;
var ODD_MONTH_DAYS_MS = ODD_MONTH_DAYS * DAY;
var days = [31, 30, 31, 30, 31, 31, 30, 31, 30, 31, 28, 31];
function calculateMonths(duration) {
    if (duration < ODD_MONTH_DAYS_MS) {
        return {
            remaining: duration,
            months: 0
        };
    }
    var remaining = duration;
    var remInDays = Math.round(remaining / DAY);
    var months = 0;
    var monthIdx = 0;
    var daysInMonth = 0;
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


/***/ }),

/***/ "./src/duration/get-unit-list.ts":
/*!***************************************!*\
  !*** ./src/duration/get-unit-list.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getUnitList)
/* harmony export */ });
function getUnitList(includeWeeks) {
    if (includeWeeks === void 0) { includeWeeks = false; }
    if (includeWeeks) {
        return ['years', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds'];
    }
    else {
        return ['years', 'months', 'days', 'hours', 'minutes', 'seconds'];
    }
}


/***/ }),

/***/ "./src/duration/index.ts":
/*!*******************************!*\
  !*** ./src/duration/index.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _trim_zero_values__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./trim-zero-values */ "./src/duration/trim-zero-values.ts");
/* harmony import */ var _make_object__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./make-object */ "./src/duration/make-object.ts");
/* harmony import */ var _get_unit_list__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./get-unit-list */ "./src/duration/get-unit-list.ts");
/* harmony import */ var _process_units_option__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./process-units-option */ "./src/duration/process-units-option.ts");




var Duration = /** @class */ (function () {
    function Duration(duration, options) {
        this.duration = duration;
        this.options = options;
        this.units = (0,_get_unit_list__WEBPACK_IMPORTED_MODULE_2__["default"])(this.options.calculateWeeks);
        (0,_process_units_option__WEBPACK_IMPORTED_MODULE_3__["default"])(this.units, this.options);
    }
    Duration.prototype.toString = function () {
        var obj = (0,_make_object__WEBPACK_IMPORTED_MODULE_1__["default"])(this.duration, this.units);
        (0,_trim_zero_values__WEBPACK_IMPORTED_MODULE_0__["default"])(this.units, obj, this.options);
        var result = [];
        for (var _i = 0, _a = this.units; _i < _a.length; _i++) {
            var unit = _a[_i];
            var value = obj[unit];
            result.push(value + unit[0]);
        }
        return result.join(' ');
    };
    Duration.prototype.toTimeSpan = function () {
        var obj = (0,_make_object__WEBPACK_IMPORTED_MODULE_1__["default"])(this.duration, this.units);
        var result = [];
        for (var _i = 0, _a = this.units; _i < _a.length; _i++) {
            var unit = _a[_i];
            var value = obj[unit];
            if (value < 10) {
                result.push('0' + value.toString());
            }
            else {
                result.push(value.toString());
            }
        }
        return result.join(':');
    };
    Duration.prototype.toISO8601 = function () {
        var obj = (0,_make_object__WEBPACK_IMPORTED_MODULE_1__["default"])(this.duration, (0,_get_unit_list__WEBPACK_IMPORTED_MODULE_2__["default"])());
        var result = [];
        result.push('P');
        for (var _i = 0, _a = this.units; _i < _a.length; _i++) {
            var unit = _a[_i];
            var value = obj[unit];
            var item = value.toString() + unit[0].toUpperCase();
            result.push(item);
        }
        result.splice(4, 0, 'T');
        return result.join('');
    };
    Duration.prototype.toObject = function () {
        return (0,_make_object__WEBPACK_IMPORTED_MODULE_1__["default"])(this.duration, this.units);
    };
    Duration.SEC = 1000;
    Duration.MIN = Duration.SEC * 60;
    Duration.HOUR = Duration.MIN * 60;
    Duration.DAY = Duration.HOUR * 24;
    Duration.WEEK = Duration.DAY * 7;
    Duration.YEAR = Duration.DAY * 365;
    return Duration;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Duration);


/***/ }),

/***/ "./src/duration/make-object.ts":
/*!*************************************!*\
  !*** ./src/duration/make-object.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ makeObject)
/* harmony export */ });
/* harmony import */ var _calculate_months__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./calculate-months */ "./src/duration/calculate-months.ts");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index */ "./src/duration/index.ts");
/* harmony import */ var _get_unit_list__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./get-unit-list */ "./src/duration/get-unit-list.ts");



function makeObject(duration, units) {
    if (units === void 0) { units = (0,_get_unit_list__WEBPACK_IMPORTED_MODULE_2__["default"])(); }
    var YEAR = _index__WEBPACK_IMPORTED_MODULE_1__["default"].YEAR, WEEK = _index__WEBPACK_IMPORTED_MODULE_1__["default"].WEEK, DAY = _index__WEBPACK_IMPORTED_MODULE_1__["default"].DAY, HOUR = _index__WEBPACK_IMPORTED_MODULE_1__["default"].HOUR, MIN = _index__WEBPACK_IMPORTED_MODULE_1__["default"].MIN, SEC = _index__WEBPACK_IMPORTED_MODULE_1__["default"].SEC;
    var years = 0, months = 0, weeks = 0, days = 0, hours = 0, minutes = 0, seconds = 0;
    if (units.indexOf('years') > -1) {
        years = Math.floor(duration / YEAR);
        duration -= years * YEAR;
    }
    if (units.indexOf('months') > -1) {
        var monthsObj = (0,_calculate_months__WEBPACK_IMPORTED_MODULE_0__["default"])(duration);
        months = monthsObj.months;
        duration = monthsObj.remaining;
    }
    var requiredWeeks = units.indexOf('weeks') > -1;
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
    var milliseconds = duration;
    if (requiredWeeks) {
        return { years: years, months: months, weeks: weeks, days: days, hours: hours, minutes: minutes, seconds: seconds, milliseconds: milliseconds };
    }
    else {
        return { years: years, months: months, days: days, hours: hours, minutes: minutes, seconds: seconds, milliseconds: milliseconds };
    }
}


/***/ }),

/***/ "./src/duration/process-units-option.ts":
/*!**********************************************!*\
  !*** ./src/duration/process-units-option.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ processUnitsOption)
/* harmony export */ });
function processUnitsOption(unitList, options) {
    var units = options.units;
    if (!units) {
        return;
    }
    if (units.max) {
        var idx = unitList.indexOf(units.max);
        if (idx > 0) {
            unitList.splice(0, idx);
        }
    }
    if (units.min) {
        var idx = unitList.indexOf(units.min);
        if (idx > 0) {
            unitList.splice(idx + 1);
        }
    }
}


/***/ }),

/***/ "./src/duration/trim-zero-values.ts":
/*!******************************************!*\
  !*** ./src/duration/trim-zero-values.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ trimZeroValues)
/* harmony export */ });
function trimZeroValues(units, duration, config) {
    if (!config.string) {
        return;
    }
    if (config.string.removeZeros) {
        return removeZeros(units, duration);
    }
    if (config.string.trimZerosLeft) {
        trimZerosLeft(units, duration);
    }
    if (config.string.trimZerosRight) {
        trimZerosRight(units, duration);
    }
}
function removeZeros(units, duration) {
    for (var idx = 0; idx < units.length; idx++) {
        var unit = units[idx];
        var value = duration[unit];
        if (value === 0) {
            units.splice(idx, 1);
            idx--;
        }
    }
}
function trimZerosLeft(units, duration) {
    var idx;
    for (idx = 0; idx < units.length; idx++) {
        var value = duration[units[idx]];
        if (value > 0) {
            break;
        }
    }
    units.splice(0, idx);
}
function trimZerosRight(units, duration) {
    var idx;
    for (idx = units.length - 1; idx >= 0; idx--) {
        var value = duration[units[idx]];
        if (value > 0) {
            break;
        }
    }
    units.splice(idx + 1);
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "duration": () => (/* binding */ duration)
/* harmony export */ });
/* harmony import */ var _duration_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./duration/index */ "./src/duration/index.ts");

var DEFAULT_CONFIG = {
    calculateWeeks: false,
    string: {
        trimZerosLeft: true,
        trimZerosRight: true,
        removeZeros: false
    }
};
function duration(value, config) {
    if (config === void 0) { config = DEFAULT_CONFIG; }
    return new _duration_index__WEBPACK_IMPORTED_MODULE_0__["default"](value, Object.assign({}, DEFAULT_CONFIG, config));
}
duration.defaults = defaults;
function defaults(defaultConfig) {
    function bootstrappedDuration(value, config) {
        if (config === void 0) { config = defaultConfig; }
        return duration(value, Object.assign({}, defaultConfig, config));
    }
    bootstrappedDuration.defaults = defaults;
    return bootstrappedDuration;
}

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=index.js.map