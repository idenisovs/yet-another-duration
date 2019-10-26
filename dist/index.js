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
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/duration/calculate-months.ts":
/*!******************************************!*\
  !*** ./src/duration/calculate-months.ts ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return calculateMonths; });
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
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getUnitList; });
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
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _trim_zero_values__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./trim-zero-values */ "./src/duration/trim-zero-values.ts");
/* harmony import */ var _make_object__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./make-object */ "./src/duration/make-object.ts");
/* harmony import */ var _get_unit_list__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./get-unit-list */ "./src/duration/get-unit-list.ts");
/* harmony import */ var _process_units_option__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./process-units-option */ "./src/duration/process-units-option.ts");




var Duration = /** @class */ (function () {
    function Duration(duration, options) {
        this.duration = duration;
        this.options = options;
        this.units = Object(_get_unit_list__WEBPACK_IMPORTED_MODULE_2__["default"])(this.options.calculateWeeks);
        Object(_process_units_option__WEBPACK_IMPORTED_MODULE_3__["default"])(this.units, this.options);
    }
    Duration.prototype.toString = function () {
        var obj = Object(_make_object__WEBPACK_IMPORTED_MODULE_1__["default"])(this.duration, this.units);
        Object(_trim_zero_values__WEBPACK_IMPORTED_MODULE_0__["default"])(this.units, obj, this.options);
        var result = [];
        for (var _i = 0, _a = this.units; _i < _a.length; _i++) {
            var unit = _a[_i];
            var value = obj[unit];
            result.push(value + unit[0]);
        }
        return result.join(' ');
    };
    Duration.prototype.toTimeSpan = function () {
        var obj = Object(_make_object__WEBPACK_IMPORTED_MODULE_1__["default"])(this.duration, this.units);
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
        var obj = Object(_make_object__WEBPACK_IMPORTED_MODULE_1__["default"])(this.duration, Object(_get_unit_list__WEBPACK_IMPORTED_MODULE_2__["default"])());
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
        return Object(_make_object__WEBPACK_IMPORTED_MODULE_1__["default"])(this.duration, this.units);
    };
    Duration.SEC = 1000;
    Duration.MIN = Duration.SEC * 60;
    Duration.HOUR = Duration.MIN * 60;
    Duration.DAY = Duration.HOUR * 24;
    Duration.WEEK = Duration.DAY * 7;
    Duration.YEAR = Duration.DAY * 365;
    return Duration;
}());
/* harmony default export */ __webpack_exports__["default"] = (Duration);


/***/ }),

/***/ "./src/duration/make-object.ts":
/*!*************************************!*\
  !*** ./src/duration/make-object.ts ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return makeObject; });
/* harmony import */ var _calculate_months__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./calculate-months */ "./src/duration/calculate-months.ts");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index */ "./src/duration/index.ts");
/* harmony import */ var _get_unit_list__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./get-unit-list */ "./src/duration/get-unit-list.ts");



function makeObject(duration, units) {
    if (units === void 0) { units = Object(_get_unit_list__WEBPACK_IMPORTED_MODULE_2__["default"])(); }
    var YEAR = _index__WEBPACK_IMPORTED_MODULE_1__["default"].YEAR, WEEK = _index__WEBPACK_IMPORTED_MODULE_1__["default"].WEEK, DAY = _index__WEBPACK_IMPORTED_MODULE_1__["default"].DAY, HOUR = _index__WEBPACK_IMPORTED_MODULE_1__["default"].HOUR, MIN = _index__WEBPACK_IMPORTED_MODULE_1__["default"].MIN, SEC = _index__WEBPACK_IMPORTED_MODULE_1__["default"].SEC;
    var years = 0, months = 0, weeks = 0, days = 0, hours = 0, minutes = 0, seconds = 0;
    if (units.indexOf('years') > -1) {
        years = Math.floor(duration / YEAR);
        duration -= years * YEAR;
    }
    if (units.indexOf('months') > -1) {
        var monthsObj = Object(_calculate_months__WEBPACK_IMPORTED_MODULE_0__["default"])(duration);
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
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return processUnitsOption; });
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
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return trimZeroValues; });
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


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! exports provided: duration */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "duration", function() { return duration; });
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


/***/ })

/******/ });
});
//# sourceMappingURL=index.js.map