/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _plugin = __webpack_require__(1);

	var plugin = new _plugin.Plugin();
	plugin.init();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Plugin = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _fixed = __webpack_require__(2);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Plugin = exports.Plugin = function () {
	  function Plugin() {
	    _classCallCheck(this, Plugin);
	  }

	  _createClass(Plugin, [{
	    key: 'init',
	    value: function init() {
	      jQuery.fn.fixed = function fixed(options) {
	        if (!window.requestAnimationFrame) {
	          return false;
	        }

	        var defaults = {
	          minWidth: 0,
	          offset: {
	            bottom: 0,
	            top: 0
	          },
	          until: null
	        };

	        var plugin = new _fixed.Fixed(this, jQuery(window), jQuery.extend(true, defaults, options));
	        plugin.init();
	        plugin.registerEvents();

	        return plugin;
	      };
	    }
	  }]);

	  return Plugin;
	}();

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Fixed = exports.Fixed = function () {
	  function Fixed(element, window, options) {
	    _classCallCheck(this, Fixed);

	    this.$element = element;
	    this.$until = options.until;
	    this.$window = window;
	    this.currentScroll = 0;
	    this.fixed = false;
	    this.flush = {};
	    this.lastFrame = null;
	    this.minWidth = options.minWidth;
	    this.offset = options.offset;
	  }

	  _createClass(Fixed, [{
	    key: 'init',
	    value: function init() {
	      this.height = this.$element.outerHeight();
	      this.fits = this.$window.height() > this.height + this.offset.bottom + this.offset.top;
	      this.initial = {
	        position: this.$element.css('position'),
	        top: this.$element.css('top')
	      };
	      this.minScroll = this.$element.offset().top - this.offset.top;

	      if (!this.lastFrame) {
	        this.next();
	      }
	    }
	  }, {
	    key: 'registerEvents',
	    value: function registerEvents() {
	      var _this = this;

	      this.$window.resize(function () {
	        // Remove fixed class for correct offset calculations
	        _this.removeFixed();
	        _this.render();

	        _this.init();
	      });
	    }
	  }, {
	    key: 'check',
	    value: function check() {
	      var _this2 = this;

	      return requestAnimationFrame(function () {
	        _this2.calculate();
	        _this2.render();
	        _this2.next();
	      });
	    }
	  }, {
	    key: 'calculate',
	    value: function calculate() {
	      this.currentScroll = this.$window.scrollTop();

	      if (this.fits && this.currentScroll > this.minScroll) {
	        this.setFixed();
	        this.checkBottom();
	      } else {
	        this.removeFixed();
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      if (this.flush) {
	        this.$element.css(this.flush);
	      }
	    }
	  }, {
	    key: 'next',
	    value: function next() {
	      if (this.$window.width() >= this.minWidth) {
	        this.lastFrame = this.check();
	      } else {
	        this.lastFrame = null;
	      }
	    }
	  }, {
	    key: 'setFixed',
	    value: function setFixed() {
	      if (!this.fixed) {
	        this.flush = {
	          position: 'fixed',
	          top: this.offset.top
	        };
	        this.fixed = true;
	      }
	    }
	  }, {
	    key: 'removeFixed',
	    value: function removeFixed() {
	      if (this.fixed) {
	        this.flush = this.initial;
	        this.fixed = false;
	      }
	    }
	  }, {
	    key: 'checkBottom',
	    value: function checkBottom() {
	      if (!this.$until) {
	        return;
	      }

	      var until = this.$until.offset().top - this.height - this.offset.bottom;

	      if (this.currentScroll >= until - this.offset.top) {
	        var top = until - this.currentScroll;
	        this.flush.top = top;
	      } else {
	        this.flush.top = this.offset.top;
	      }
	    }
	  }]);

	  return Fixed;
	}();

/***/ }
/******/ ]);