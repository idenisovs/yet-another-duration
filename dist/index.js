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

/***/ "./src/calculate-months.ts":
/*!*********************************!*\
  !*** ./src/calculate-months.ts ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return calculateMonths; });
var DAY = 1000 * 60 * 60 * 24;
var ODD_MONTH_DAYS = 31;
var EVEN_MONTH_DAYS = 30;
var FEBRUARY_DAYS = 28;
var MARCH = 10;
var ODD_MONTH_DAYS_MS = ODD_MONTH_DAYS * DAY;
function calculateMonths(duration) {
    if (duration < ODD_MONTH_DAYS_MS) {
        return {
            remaining: duration,
            months: 0
        };
    }
    var remaining = duration;
    var remInDays = Math.round(duration / DAY);
    var odd = true;
    var months = 0;
    var daysInNextMonth = ODD_MONTH_DAYS;
    var currentMonthDays = 0;
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
function getDaysInNextMonth(months, odd) {
    if (months % MARCH === 0) {
        return FEBRUARY_DAYS;
    }
    return odd ? ODD_MONTH_DAYS : EVEN_MONTH_DAYS;
}


/***/ }),

/***/ "./src/duration.ts":
/*!*************************!*\
  !*** ./src/duration.ts ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _calculate_months__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./calculate-months */ "./src/calculate-months.ts");

var Duration = /** @class */ (function () {
    function Duration(duration, config) {
        this.duration = duration;
        this.config = config;
    }
    Duration.prototype.toString = function () {
        var obj = this.toObject();
        var result = [];
        result.push(obj.years + "y");
        result.push(obj.months + "m");
        if ('weeks' in obj) {
            result.push(obj.weeks + "w");
        }
        result.push(obj.days + "d");
        result.push(obj.hours + "h");
        result.push(obj.minutes + "m");
        result.push(obj.seconds + "s");
        return result.join(' ');
    };
    Duration.prototype.toObject = function () {
        var YEAR = Duration.YEAR, WEEK = Duration.WEEK, DAY = Duration.DAY, HOUR = Duration.HOUR, MIN = Duration.MIN, SEC = Duration.SEC;
        var rem = this.duration;
        var years = Math.floor(rem / YEAR);
        rem -= years * YEAR;
        var monthsObj = Object(_calculate_months__WEBPACK_IMPORTED_MODULE_0__["default"])(rem);
        var months = monthsObj.months;
        rem = monthsObj.remaining;
        var weeks = 0;
        if (this.config.calculateWeeks) {
            weeks = Math.floor(rem / WEEK);
            rem -= weeks * WEEK;
        }
        var days = Math.floor(rem / DAY);
        rem -= days * DAY;
        var hours = Math.floor(rem / HOUR);
        rem -= hours * HOUR;
        var minutes = Math.floor(rem / MIN);
        rem -= minutes * MIN;
        var seconds = Math.floor(rem / SEC);
        rem -= seconds * SEC;
        var milliseconds = rem;
        if (this.config.calculateWeeks) {
            return { years: years, months: months, weeks: weeks, days: days, hours: hours, minutes: minutes, seconds: seconds, milliseconds: milliseconds };
        }
        else {
            return { years: years, months: months, days: days, hours: hours, minutes: minutes, seconds: seconds, milliseconds: milliseconds };
        }
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

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! exports provided: duration */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "duration", function() { return duration; });
/* harmony import */ var _duration__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./duration */ "./src/duration.ts");

var DEFAULT_CONFIG = {
    calculateWeeks: false
};
function duration(value, config) {
    if (config === void 0) { config = DEFAULT_CONFIG; }
    return new _duration__WEBPACK_IMPORTED_MODULE_0__["default"](value, config);
}
duration.defaults = defaults;
function defaults(defaultConfig) {
    function bootstrappedDuration(value, config) {
        if (config === void 0) { config = defaultConfig; }
        return duration(value, config);
    }
    bootstrappedDuration.defaults = defaults;
    return bootstrappedDuration;
}


/***/ })

/******/ });
});
//# sourceMappingURL=index.js.map