/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(3);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _kopio = _interopRequireDefault(__webpack_require__(2));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var kopio = new _kopio.default();
kopio.on('success', function (trigger) {
  var el = document.createElement('div');
  var text = document.createTextNode('Copied');
  el.classList.add('notify');
  el.appendChild(text);
  trigger.appendChild(el);
  setTimeout(function () {
    el.remove();
  }, 500);
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

(function (global, factory) {
	 true ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Kopio = global.Kopio || {}, global.Kopio.js = factory());
}(this, (function () { 'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Kopio = function () {
  /**
   * Kopio instance constructor
   * @constructor
   * @param {string} selector - querySelector compatible string
   */
  function Kopio(selector) {
    _classCallCheck(this, Kopio);

    this.events = { success: {}, fail: {} };
    this.container = document.body;
    this.selector = typeof selector === 'string' ? selector : '.kopio';
    this.addListeners();
  }

  /**
   * @desc Add event listeners to all selector matches
   */


  _createClass(Kopio, [{
    key: 'addListeners',
    value: function addListeners() {
      var self = this;
      document.querySelectorAll(this.selector).forEach(function (kopio) {
        kopio.addEventListener('click', function (event) {
          return self.copy(event);
        });
      });
    }

    /**
     * @desc Creates a temp element if needed and emits copy results
     * @param {Event} - Click event
     */

  }, {
    key: 'copy',
    value: function copy(_ref) {
      var target = _ref.target,
          originalTarget = _ref.originalTarget;

      var trigger = target || originalTarget;
      var textElement = void 0,
          result = void 0,
          isTemp = void 0;
      if (trigger.hasAttribute('data-kopio-target')) {
        textElement = document.querySelector(trigger.getAttribute('data-kopio-target'));
      } else if (trigger.hasAttribute('data-kopio-text')) {
        var tempText = trigger.getAttribute('data-kopio-text');
        textElement = document.createElement('div');
        textElement.appendChild(document.createTextNode(tempText));
        this.container.appendChild(textElement);
        isTemp = true;
      }
      if (textElement) {
        result = this.execCopy(textElement, isTemp);
        if (result) {
          this.emit('success', trigger);
        } else {
          this.emit('error', trigger);
        }
      }
    }

    /**
     * @desc Creates range for selection and executes the copy command.
     * @param {Node} element - Element which contents need to be copied.
     * @param {boolean} isTemp - Flag for element removal.
     */

  }, {
    key: 'execCopy',
    value: function execCopy(element, isTemp) {
      var range = document.createRange();
      range.selectNodeContents(element);
      var selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      var result = document.execCommand('copy');
      selection.removeAllRanges();
      if (isTemp) {
        element.remove();
      }
      return result;
    }

    /**
     * @desc Emits events
     * @param {string} eventName
     * @param {Node} trigger
     */

  }, {
    key: 'emit',
    value: function emit(eventName, trigger) {
      var event = this.events[eventName];
      if (event) {
        event(trigger);
      }
    }

    /**
     * @desc Subscribe to events
     * @param {string} eventName - Can be 'success' or 'error'
     * @param {Function} callback
     */

  }, {
    key: 'on',
    value: function on(eventName, callback) {
      if (!this.events[eventName]) {
        return;
      }
      this.events[eventName] = callback;
    }
  }]);

  return Kopio;
}();

return Kopio;

})));


/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);