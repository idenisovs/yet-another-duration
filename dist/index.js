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

/***/ "./src/duration.ts":
/*!*************************!*\
  !*** ./src/duration.ts ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var Duration = /** @class */ (function () {
    function Duration(duration, config) {
        this.duration = duration;
        this.config = config;
    }
    Duration.prototype.toObject = function () {
        var WEEK = Duration.WEEK, DAY = Duration.DAY, HOUR = Duration.HOUR, MIN = Duration.MIN, SEC = Duration.SEC;
        var rem = this.duration;
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
        var result = { days: days, hours: hours, minutes: minutes, seconds: seconds, milliseconds: rem };
        if (this.config.calculateWeeks) {
            result.weeks = weeks;
        }
        return result;
    };
    Duration.SEC = 1000;
    Duration.MIN = Duration.SEC * 60;
    Duration.HOUR = Duration.MIN * 60;
    Duration.DAY = Duration.HOUR * 24;
    Duration.WEEK = Duration.DAY * 7;
    Duration.MONTH = Duration.DAY * 31;
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