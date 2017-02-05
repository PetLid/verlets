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
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

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

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    'use strict';

    var canvas,
        ctx,
        game,
        keyboard,
        mouse,
        lastFrameTimeMs = 0,
        canvasWrapper,
        dt = GLOBALS.timestep;

    function init(canvasId, _game) {
        canvasWrapper = new CanvasWrapper({ id: canvasId });

        canvas = canvasWrapper.canvas;
        ctx = canvas.getContext("2d");

        // Set up input devices
        keyboard = (0, _keyEvent2.default)();
        mouse = new _mouseEvent2.default();

        game = _game;

        game.init(canvas);
    };

    function update() {
        // Updates input
        var keyboardInput = keyboard.pressedKeys();
        var mouseInput = mouse.getInput();

        var input = { keyboard: keyboardInput, mouse: mouseInput };

        game.update({ input: input });
    };

    function render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        game.render(ctx);
    };

    function gameLoop(timestamp) {
        // Limit frame rate
        if (timestamp < lastFrameTimeMs + GLOBALS.timestep) {
            window.requestAnimFrame(gameLoop);
        }

        lastFrameTimeMs = timestamp;

        update();
        render();
        requestAnimationFrame(gameLoop);
    };

    return {
        'init': init,
        'gameLoop': gameLoop
    };
};

var _keyEvent = __webpack_require__(5);

var _keyEvent2 = _interopRequireDefault(_keyEvent);

var _mouseEvent = __webpack_require__(6);

var _mouseEvent2 = _interopRequireDefault(_mouseEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UTILS_FOLDER = "./utils/";
var INPUT_FOLDER = "./input/";

var Vector = __webpack_require__(4)(UTILS_FOLDER + "vector.js");
var CanvasWrapper = __webpack_require__(2)(UTILS_FOLDER + "canvas-wrapper.js");
var GLOBALS = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./globals.js\""); e.code = 'MODULE_NOT_FOUND';; throw e; }()));
__webpack_require__(3)(UTILS_FOLDER + "request-anim-frame.js");

;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    function init(canvas) {
        this.canvas = canvas;

        this.rectangle = {
            x: 0,
            y: 0,
            dx: 5,
            dy: 5,
            width: 20,
            height: 20
        };
    }

    function update() {
        var rect = this.rectangle;

        rect.x += rect.dx;
        rect.y += rect.dy;

        var canvas = this.canvas;

        rect.dx = rect.x <= 0 || rect.x + rect.width >= canvas.width ? -rect.dx : rect.dx;
        rect.dy = rect.y <= 0 || rect.y + rect.height >= canvas.height ? -rect.dy : rect.dy;
    }

    function render(ctx) {
        var rect = this.rectangle;

        ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
    }

    return {
        'init': init,
        'update': update,
        'render': render
    };
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./utils/canvas-wrapper.js": 7
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 2;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./utils/request-anim-frame.js": 8
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 3;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./utils/vector.js": 9
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 4;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    "use strict";

    var pressed = {};

    // On key release
    window.addEventListener('keyup', function (event) {
        delete pressed[event.keyCode];
    });

    // On key press
    window.addEventListener('keydown', function (event) {
        pressed[event.keyCode] = true;
    });

    // Return what to export
    return {

        isDown: function isDown(key1, key2) {
            return pressed[key1] || pressed[key2];
        },

        pressedKeys: function pressedKeys() {
            return pressed;
        }
    };
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (canvas, offsetX, offsetY, scale) {
    "use strict";

    var _this = this;

    var pressed = {};
    var pos = {};

    this.test = 0;

    this.offset = { x: 0, y: 0 };
    this.scale = { x: 1, y: 1 };

    var that = this;

    // On mouse button release
    window.addEventListener('mouseup', function (event) {
        delete pressed[event.button];
    });

    // On mouse button press
    window.addEventListener('mousedown', function (event) {
        pressed[event.button] = true;
    });

    // On mouse move
    window.addEventListener('mousemove', function (event) {

        var x = event.clientX,
            y = event.clientY;

        pos.x = (x - _this.offset.x * 1) / _this.scale.x;
        pos.y = (y - _this.offset.y * 1) / _this.scale.y;
    });

    // Return what to export
    return {

        isDown: function isDown(button1, button2) {
            return pressed[button1] || pressed[button2];
        },

        getInput: function getInput() {
            return { pos: pos, buttons: pressed };
        },

        offset: this.offset,
        scale: this.scale
    };
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CanvasWrapper = function CanvasWrapper(options) {
    _classCallCheck(this, CanvasWrapper);

    options.resolution = options.resolution || {};

    this.displayMode = options.displayMode || "fullscreen";
    this.resolution = { x: options.resolution.x || window.innerWidth, y: options.resolution.y || window.innerHeight };

    // Create canvas element
    if (options.id) {
        this.canvas = document.getElementById(options.id);
    } else {
        var id = "canvas-" + CanvasWrapper.nr++;
        this.canvas = document.createElement("canvas");
        this.canvas.setAttribute("id", id);
    }

    // Set up canvas dimensions
    this.canvas.width = this.resolution.x;
    this.canvas.height = this.resolution.y;

    // Configure display settings
    if (this.displayMode === "fullscreen") {
        window.addEventListener("resize", function () {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        });
    }
};

CanvasWrapper.nr = 0;

module.exports = CanvasWrapper;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Shim layer, polyfill, for requestAnimationFrame with setTimeout fallback.
 */

/**
 * requestAnimFrame
 */
window.requestAnimFrame = function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
        window.setTimeout(callback, 1000 / 60);
    };
}();

/**
 * cancelRequestAnimFrame
 */
window.cancelRequestAnimFrame = function () {
    return window.cancelRequestAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || window.clearTimeout;
}();

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vector = function () {
    function Vector(x, y) {
        _classCallCheck(this, Vector);

        this.x = x || 0;
        this.y = y || 0;
    }

    /**
     * Takes data and wraps it in a Vector-like object.
     *
     * @param data, the object or number to transform into a vector.
     */


    _createClass(Vector, [{
        key: "add",


        /**
         * Add a value to this vector.
         *
         * @param term, Vector object or number to add to this.
         */
        value: function add(term) {

            var vec = Vector.$_transformIntoVector(term);

            this.x += vec.x;
            this.y += vec.y;

            return this;
        }

        /**
         * Subtract a value from this vector.
         *
         * @param term, Vector object or number to subtract from this.
         */

    }, {
        key: "subtract",
        value: function subtract(term) {

            var vec = Vector.$_transformIntoVector(term);

            this.x -= vec.x;
            this.y -= vec.y;

            return this;
        }

        /**
         * Divide this vector with a value.
         *
         * @param divisor, Vector object or number to divide this with.
         */

    }, {
        key: "divide",
        value: function divide(divisor) {

            var vec = Vector.$_transformIntoVector(divisor);

            this.x /= vec.x;
            this.y /= vec.y;

            return this;
        }

        /**
         * Multiply this vector with a value.
         *
         * @param factor, Vector objet or number to multiply this with.
         */

    }, {
        key: "multiply",
        value: function multiply(factor) {

            var vec = Vector.$_transformIntoVector(factor);

            this.x *= vec.x;
            this.y *= vec.y;

            return this;
        }
    }, {
        key: "magnitude",
        value: function magnitude() {
            return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
        }
    }, {
        key: "distance",
        value: function distance(vector) {
            return Math.sqrt(Math.pow(this.x - vector.x, 2) + Math.pow(this.y - vector.y, 2));
        }
    }, {
        key: "normalize",
        value: function normalize() {
            var magnitude = this.magnitude();
            this.x /= magnitude;
            this.y /= magnitude;
        }
    }], [{
        key: "$_transformIntoVector",
        value: function $_transformIntoVector(data) {

            var x = data,
                y = data;

            // In case data is a vector-like object
            if (typeof data.x !== "undefined" && typeof data.y !== "undefined") {
                x = data.x;
                y = data.y;
            }

            return { x: x, y: y };
        }
    }, {
        key: "$_add",
        value: function $_add(vec, term) {
            var vec2 = Vector.$_transformIntoVector(term);
            return new Vector(vec.x + vec2.x, vec.y + vec2.y);
        }
    }, {
        key: "$_subtract",
        value: function $_subtract(vec, term) {
            var vec2 = Vector.$_transformIntoVector(term);
            return new Vector(vec.x - vec2.x, vec.y - vec2.y);
        }
    }, {
        key: "$_divide",
        value: function $_divide(vec, divisor) {
            var vec2 = Vector.$_transformIntoVector(divisor);
            return new Vector(vec.x / vec2.x, vec.y / vec2.y);
        }
    }, {
        key: "$_multiply",
        value: function $_multiply(vec, factor) {
            var vec2 = Vector.$_transformIntoVector(factor);
            return new Vector(vec.x * vec2.x, vec.y * vec2.y);
        }
    }, {
        key: "$_magnitude",
        value: function $_magnitude(vec) {
            return Math.sqrt(Math.pow(vec.x, 2) + Math.pow(vec.y, 2));
        }
    }, {
        key: "$_distance",
        value: function $_distance(vec1, vec2) {
            return Math.sqrt(Math.pow(vec1.x - vec2.x, 2) + Math.pow(vec1.y - vec2.y, 2));
        }
    }]);

    return Vector;
}();

module.exports = Vector;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _gameWrapper = __webpack_require__(0);

var _gameWrapper2 = _interopRequireDefault(_gameWrapper);

var _game = __webpack_require__(1);

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Function for determining if document is ready
// Imports
function onReady(fn) {
    if (document.readyState != 'loading') {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

function startGame() {
    var gameWrapper = (0, _gameWrapper2.default)();
    var game = (0, _game2.default)();

    gameWrapper.init('main-canvas', game);
    gameWrapper.gameLoop();

    console.log('Ready to play.');
}

// Start
onReady(function () {
    startGame();
});

/***/ })
/******/ ]);