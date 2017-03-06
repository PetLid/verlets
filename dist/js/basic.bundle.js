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
/******/ 	return __webpack_require__(__webpack_require__.s = 18);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Joint = function () {
    function Joint(a, b, distance, keepDistance) {
        _classCallCheck(this, Joint);

        this.a = a;
        this.b = b;

        this.maxDistance = distance || Math.sqrt(Math.pow(a.pos.x - b.pos.x, 2) + Math.pow(a.pos.y - b.pos.y, 2));
        this.keepDistance = keepDistance == false ? false : true;
    }

    _createClass(Joint, [{
        key: "update",
        value: function update(state) {
            var a = this.a,
                b = this.b;

            var dt = state.dt;

            var distance = Math.sqrt(Math.pow(a.pos.x - b.pos.x, 2) + Math.pow(a.pos.y - b.pos.y, 2));
            var diff = this.maxDistance - distance;

            // Percentage of movement
            var pom = diff / distance / 2;

            if (distance > this.maxDistance || this.keepDistance) {
                var dx = b.pos.x - a.pos.x;
                var dy = b.pos.y - a.pos.y;

                var offsetX = dx * pom;
                var offsetY = dy * pom;

                if (!a.pinned) {
                    if (typeof a.vel !== "undefined") {
                        a.vel.x -= offsetX;
                        a.vel.y -= offsetY;
                    } else {
                        a.pos.x -= offsetX;
                        a.pos.y -= offsetY;
                    }
                }

                if (!b.pinned) {
                    if (typeof b.vel !== "undefined") {
                        b.vel.x += offsetX;
                        b.vel.y += offsetY;
                    } else {
                        // No anchors
                        b.pos.x += offsetX;
                        b.pos.y += offsetY;
                    }
                }
            }
        }
    }, {
        key: "collidesWith",
        value: function collidesWith(point) {
            var aPos = this.a.pos,
                bPos = this.b.pos;

            var vector = { x: aPos.x - bPos.x, y: aPos.y - bPos.y };

            var slopeX = Math.abs(aPos.x - bPos.x) / Math.abs(aPos.y - bPos.y);
            var slopeY = Math.abs(aPos.y - bPos.y) / Math.abs(aPos.x - bPos.x);

            var x, y;

            //
            x = (point.y - aPos.y) * slopeX;
            x += slopeX > 0 ? aPos.x : bPos.x;
            x = x > bPos.x ? bPos.x : x < aPos.x ? aPos.x : x;

            y = (point.x - aPos.x) * slopeY;
            y += slopeY > 0 ? aPos.y : bPos.y;
            y = y > bPos.y ? bPos.y : y < aPos.y ? aPos.y : y;

            var margin = 10;

            if (Math.abs(point.x - x) < margin && Math.abs(point.y - y) < margin) {
                return true;
            }

            return false;
        }
    }, {
        key: "render",
        value: function render(ctx) {
            var a = this.a,
                b = this.b;

            ctx.save();

            //ctx.strokeStyle = "#888";
            //ctx.lineWidth = 1;

            ctx.beginPath();
            ctx.moveTo(a.pos.x, a.pos.y);
            ctx.lineTo(b.pos.x, b.pos.y);
            ctx.stroke();

            ctx.restore();
        }
    }]);

    return Joint;
}();

module.exports = Joint;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _physicsComponent = __webpack_require__(14);

var _physicsComponent2 = _interopRequireDefault(_physicsComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Point = function () {
    function Point(options) {
        _classCallCheck(this, Point);

        this.pos = { x: options.pos.x, y: options.pos.y };
        this.oldPos = options.oldPos ? { x: options.oldPos.x, y: options.oldPos.y } : { x: this.pos.x, y: this.pos.y };

        this.pinned = options.pinned || false;

        this.physicsComponent = new _physicsComponent2.default(this, { gravity: 1.81, drag: 10000 });
    }

    _createClass(Point, [{
        key: "update",
        value: function update(state) {
            var pos = this.pos,
                oldPos = this.oldPos;

            var dt = state.dt;

            if (!this.pinned) {
                var vx = pos.x - oldPos.x,
                    vy = pos.y - oldPos.y;

                // Save unmodified position since physics component changes it
                var uPos = { x: pos.x, y: pos.y };

                // Modifies pos.x, must be done after calculating velocity
                this.physicsComponent.update(state);

                oldPos.x = uPos.x;
                oldPos.y = uPos.y;

                pos.x += vx; //+ a.x * dt * dt;
                pos.y += vy; //+ a.y * dt * dt;
            }

            this.constrain(state.boundaries);
        }
    }, {
        key: "constrain",
        value: function constrain(boundaries) {
            if (!this.pinned) {
                var pos = this.pos,
                    oldPos = this.oldPos;

                var friction = .85;

                var vx = (this.pos.x - this.oldPos.x) * friction,
                    vy = (this.pos.y - this.oldPos.y) * friction;

                if (pos.y > boundaries.height) {
                    this.pos.y = boundaries.height;
                    this.oldPos.y = pos.y + vy;
                    this.pos.x = oldPos.x + vx;
                } else if (pos.y < 0) {
                    this.pos.y = 0;
                    this.oldPos.y = pos.y + vy;
                }

                if (pos.x > boundaries.width) {
                    this.pos.x = boundaries.width;
                    this.oldPos.x = pos.x + vx;
                } else if (pos.x < 0) {
                    pos.x = 0;
                    oldPos.x = pos.x + vx;
                }
            }
        }
    }, {
        key: "render",
        value: function render(ctx) {
            var pos = this.pos;

            var size = 5;

            ctx.save();

            ctx.fillStyle = this.pinned ? "red" : "black";
            ctx.fillRect(pos.x - size / 2, pos.y - size / 2, 5, 5);

            ctx.restore();
        }
    }]);

    return Point;
}();

module.exports = Point;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var World = function () {
    function World() {
        _classCallCheck(this, World);
    }

    _createClass(World, null, [{
        key: "init",
        value: function init() {
            this.gravity = 9.81 * 100;
            this.drag = 1000;
        }
    }, {
        key: "test",
        value: function test() {
            console.log("I AM ALIVE, gravity = " + this.gravity);
        }
    }, {
        key: "setGravity",
        value: function setGravity(a) {
            this.gravity = a * 100;
        }
    }, {
        key: "getGravity",
        value: function getGravity() {
            return this.gravity;
        }
    }]);

    return World;
}();

module.exports = World;

/***/ }),
/* 3 */
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
        canvasWrapper;

    // Time stuff
    var t = 0.0;
    var dt = GLOBALS.timestep * 0.01;
    var currentTime = new Date().getTime() / 1000;
    var accumulator = 0.0;

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

    function update(dt) {
        // Updates input
        var keyboardInput = keyboard.pressedKeys();
        var mouseInput = mouse.getInput();

        var input = { keyboard: keyboardInput, mouse: mouseInput };

        game.update({ input: input, dt: dt });
    };

    function render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        game.render(ctx);
    };

    function gameLoop() {
        // NEW
        var newTime = new Date().getTime() / 1000;
        var frameTime = newTime - currentTime;
        currentTime = newTime;

        accumulator += frameTime;

        while (accumulator >= dt) {
            update(dt);
            accumulator -= dt;
            t += dt;
        }

        // NEW
        //console.log("FPS: " + 1/frameTime);

        render();
        requestAnimationFrame(gameLoop);
    };

    return {
        'init': init,
        'gameLoop': gameLoop
    };
};

var _keyEvent = __webpack_require__(8);

var _keyEvent2 = _interopRequireDefault(_keyEvent);

var _mouseEvent = __webpack_require__(9);

var _mouseEvent2 = _interopRequireDefault(_mouseEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UTILS_FOLDER = "./utils/";
var INPUT_FOLDER = "./input/";

var Vector = __webpack_require__(6)(UTILS_FOLDER + "vector.js");
var CanvasWrapper = __webpack_require__(4)(UTILS_FOLDER + "canvas-wrapper.js");
var GLOBALS = __webpack_require__(7);
__webpack_require__(5)(UTILS_FOLDER + "request-anim-frame.js");

;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./utils/canvas-wrapper.js": 10
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

var map = {
	"./utils/request-anim-frame.js": 11
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
webpackContext.id = 5;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./utils/vector.js": 12
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
webpackContext.id = 6;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
    timestep: 60 / 1000
};

/***/ }),
/* 8 */
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
/* 9 */
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
/* 10 */
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
/* 11 */
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
/* 12 */
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
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _point = __webpack_require__(1);

var _point2 = _interopRequireDefault(_point);

var _joint = __webpack_require__(0);

var _joint2 = _interopRequireDefault(_joint);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Box = function () {
    function Box(options) {
        _classCallCheck(this, Box);

        this.pos = { x: options.pos.x, y: options.pos.y };
        this.size = options.size || 50;

        this.joints = [];

        var rotation = options.rotation || 0;
        rotation += Math.PI / 4;

        var halfSide = this.size / 2;

        this.points = [new _point2.default({ pos: { x: this.pos.x + halfSide * Math.cos(rotation), y: this.pos.y + halfSide * Math.sin(rotation) } }), new _point2.default({ pos: { x: this.pos.x + halfSide * Math.cos(rotation + Math.PI / 2), y: this.pos.y + halfSide * Math.sin(rotation + Math.PI / 2) } }), new _point2.default({ pos: { x: this.pos.x + halfSide * Math.cos(rotation + Math.PI), y: this.pos.y + halfSide * Math.sin(rotation + Math.PI) } }), new _point2.default({ pos: { x: this.pos.x + halfSide * Math.cos(rotation + 3 * Math.PI / 2), y: this.pos.y + halfSide * Math.sin(rotation + 3 * Math.PI / 2) } })];

        if (options.pinned) {
            for (var i = 0; i < this.points.length; i += 1) {
                this.points[i].pinned = true;
            }
        }

        console.log(this.points);

        for (var i = 0; i < this.points.length - 1; i += 1) {
            this.joints[i] = new _joint2.default(this.points[i], this.points[i + 1]);
        }

        // Connect last with first
        this.joints[this.joints.length] = new _joint2.default(this.points[this.points.length - 1], this.points[0]);

        // Stability joint
        this.joints[this.joints.length] = new _joint2.default(this.points[0], this.points[2]);
    }

    _createClass(Box, [{
        key: "update",
        value: function update(state) {
            var points = this.points,
                joints = this.joints;

            for (var i = 0; i < points.length; i += 1) {
                points[i].update(state);
            }

            for (var i = 0; i < joints.length; i += 1) {
                joints[i].update(state);
            }
        }
    }, {
        key: "render",
        value: function render(ctx) {
            var points = this.points,
                joints = this.joints;

            ctx.strokeStyle = "#000";
            ctx.lineWidth = 2;

            for (var i = 0; i < points.length; i += 1) {
                points[i].render(ctx);
            }

            for (var i = 0; i < joints.length; i += 1) {
                joints[i].render(ctx);
            }
        }
    }]);

    return Box;
}();

module.exports = Box;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _world = __webpack_require__(2);

var _world2 = _interopRequireDefault(_world);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PhysicsComponent = function () {
        function PhysicsComponent(obj, options) {
                _classCallCheck(this, PhysicsComponent);

                this.obj = obj;
                options = options || {};
                this.gravity = options.gravity || 0;
                this.drag = options.drag || 5 * 100 * 10;
                this.forces = { x: 0, y: 0 };
        }

        _createClass(PhysicsComponent, [{
                key: "update",
                value: function update(state) {
                        this.drage();

                        // Add gravity
                        this.addForce({ x: 0, y: _world2.default.gravity });

                        //console.log("grav: " + World.gravity);

                        var obj = this.obj,
                            dt = state.dt;

                        var a = this.forces;

                        obj.pos.x += a.x * dt * dt;
                        obj.pos.y += a.y * dt * dt;

                        // Reset forces
                        this.forces.x = 0;
                        this.forces.y = 0;
                }
        }, {
                key: "drage",
                value: function drage() {
                        var obj = this.obj;
                        var pos = obj.pos,
                            oldPos = obj.oldPos;

                        var vx = pos.x - oldPos.x,
                            vy = pos.y - oldPos.y,
                            drag = _world2.default.drag; //this.drag;

                        //console.log("Stragne");

                        //console.log(World.drag + " vx: " + vx);

                        var dragForce = { x: -1 * drag * vx * vx * vx / Math.abs(vx + 0.001), y: -1 * drag * vy * vy * vy / Math.abs(vy + 0.001) };

                        //console.log("Adding force " + dragForce.x + "x" + dragForce.y);
                        this.addForce(dragForce);
                }
        }, {
                key: "addForce",
                value: function addForce(a, m) {
                        m = m || 1;

                        this.forces.x += m * a.x;
                        this.forces.y += m * a.y;
                }
        }]);

        return PhysicsComponent;
}();

module.exports = PhysicsComponent;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _point = __webpack_require__(1);

var _point2 = _interopRequireDefault(_point);

var _joint = __webpack_require__(0);

var _joint2 = _interopRequireDefault(_joint);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Rope = function () {
        function Rope(pos, length, resolution) {
                _classCallCheck(this, Rope);

                //this.pos = { x: pos.x, y: pos.y };

                length = length || 200;

                resolution = resolution || 10;

                //this.points = [ new Point({ pos: { this.pos.x, this.pos.y } } ];

                this.points = [];
                this.joints = [];

                for (var i = 0; i < resolution; i += 1) {
                        this.points[i] = new _point2.default({ pos: { x: pos.x + Math.random() * 5 - 2.5, y: pos.y + i * length / resolution } });
                }

                for (var i = 0; i < resolution - 1; i += 1) {
                        this.joints[i] = new _joint2.default(this.points[i], this.points[i + 1], false, false);
                }

                // Pin base
                this.points[0].pinned = true;
        }

        _createClass(Rope, [{
                key: "update",
                value: function update(state) {
                        for (var i = 0; i < this.points.length; i += 1) {
                                this.points[i].update(state);
                        }

                        for (var i = 0; i < this.joints.length; i += 1) {
                                this.joints[i].update(state);
                        }
                }
        }, {
                key: "render",
                value: function render(ctx) {
                        ctx.save();

                        ctx.beginPath();

                        ctx.strokeStyle = "#f00";
                        ctx.lineWidth = 5;

                        var points = this.points;

                        ctx.moveTo(points[0].pos.x, points[0].pos.y);

                        for (var i = 1; i < points.length - 1; i += 1) {
                                var xc = (points[i].pos.x + points[i + 1].pos.x) / 2;
                                var yc = (points[i].pos.y + points[i + 1].pos.y) / 2;

                                ctx.quadraticCurveTo(points[i].pos.x, points[i].pos.y, xc, yc);
                        }

                        ctx.lineTo(points[points.length - 1].pos.x, points[points.length - 1].pos.y);
                        ctx.stroke();

                        ctx.restore();
                }
        }, {
                key: "collidesWith",
                value: function collidesWith(point) {
                        var edges = this.joints,
                            index;

                        var collides = false;

                        // For each edge
                        for (index = 0; index < edges.length && !collides; index += 1) {
                                collides = edges[index].collidesWith(point);
                        }

                        if (collides) {
                                index -= 1;

                                var vector = { x: edges[index].b.pos.x - point.x, y: edges[index].b.pos.y - point.y };

                                // !!! Change to nearest point
                                edges[index].b.physicsComponent.addForce(vector, 100 * 100);

                                console.log("Collision!!!");
                        }
                }
        }]);

        return Rope;
}();

module.exports = Rope;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    var canvas,
        points = [],
        joints = [],
        free = false,
        smoothMode = true,
        boxes = [],
        rope;

    function init(_canvas) {
        _world2.default.init();
        _world2.default.test();
        console.log("..well?");

        canvas = _canvas;

        points = [new _point2.default({
            pos: {
                x: 150,
                y: 140
            },
            oldPos: {
                x: 149,
                y: 160
            },
            pinned: true
        }), new _point2.default({
            pos: {
                x: 180,
                y: 160
            }
        })];

        joints = [new _joint2.default(points[0], points[1])];

        boxes[0] = new _box2.default({ pos: { x: 200, y: 300 } });

        rope = new _rope2.default({ x: 200, y: 100 });
    }

    function update(state) {
        state.boundaries = { width: canvas.width, height: canvas.height };

        for (var i = 0; i < points.length; i += 1) {
            points[i].update(state);
        }

        for (var i = 0; i < joints.length; i += 1) {
            joints[i].update(state);
        }

        for (var i = 0; i < boxes.length; i += 1) {
            boxes[i].update(state);
        }

        rope.update(state);
    }

    function render(ctx) {

        ctx.fillStyle = "#000";

        for (var i = 0; i < points.length; i += 1) {
            points[i].render(ctx);
        }

        if (smoothMode) {
            ctx.strokeStyle = "#ddd";
            ctx.lineWidth = 1;
        } else {
            ctx.strokeStyle = "#222";
            ctx.lineWidth = 2;
        }

        for (var i = 0; i < joints.length; i += 1) {
            var a = joints[i].a,
                b = joints[i].b;

            var grd = ctx.createLinearGradient(a.pos.x, a.pos.y, b.pos.x, b.pos.y);

            var colorA = a.pinned ? "red" : "black";
            var colorB = b.pinned ? "red" : "black";

            grd.addColorStop(0, colorA);
            grd.addColorStop(1, colorB);

            ctx.strokeStyle = grd;

            joints[i].render(ctx);
        }

        if (smoothMode) {
            ctx.strokeStyle = "#222";
            ctx.lineWidth = 2;
        } else {
            ctx.strokeStyle = "#ddd";
            ctx.lineWidth = 1;
        }

        ctx.beginPath();

        ctx.moveTo(points[0].pos.x, points[0].pos.y);

        for (var i = 1; i < points.length - 1; i += 1) {
            var xc = (points[i].pos.x + points[i + 1].pos.x) / 2;
            var yc = (points[i].pos.y + points[i + 1].pos.y) / 2;

            ctx.quadraticCurveTo(points[i].pos.x, points[i].pos.y, xc, yc);
        }

        ctx.lineTo(points[points.length - 1].pos.x, points[points.length - 1].pos.y);
        ctx.stroke();

        for (var i = 0; i < boxes.length; i += 1) {
            boxes[i].render(ctx);
        }

        rope.render(ctx);
    }

    document.addEventListener("mousedown", function (e) {
        console.log("clickity at " + e.clientX + "x" + e.clientY);

        addJointPoint(e.clientX, e.clientY, e.button != 0);
        //addJointBox(e.clientX, e.clientY, e.button != 0);
    });

    document.addEventListener("mousemove", function (e) {
        rope.collidesWith({ x: e.clientX, y: e.clientY });
        /*for (var i = 0; i < rope.points.length; i += 1)
        {
            var point = rope.points[i];
              var vector = { x: point.pos.x - e.clientX, y: point.pos.y - e.clientY };
              var dist = Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2));
              if (dist < 10)
            {
                point.physicsComponent.addForce(vector, 100 * 1000);
            }
        }*/
    });

    document.addEventListener("keydown", function (e) {
        console.log("you pressed " + e.keyCode);
        // Free all points
        if (e.keyCode == 70) {
            for (var i = 0; i < points.length; i += 1) {
                points[i].pinned = free;
            }

            free = !free;
        }

        // Change rendering mode
        if (e.keyCode == 82) {
            smoothMode = !smoothMode;
        }

        if (e.keyCode == 32) {
            _world2.default.gravity = -1 * _world2.default.gravity;
        }
    });

    function addJointBox(x, y, pinned) {
        boxes[boxes.length] = new _box2.default({ pos: { x: x, y: y }, size: Math.random() * 20 + 20, rotation: -Math.PI / 4, pinned: pinned });

        var box = boxes[boxes.length - 1];

        points[points.length] = box.points[3];
        joints[joints.length] = new _joint2.default(points[points.length - 2], points[points.length - 1]);
        points[points.length] = box.points[1];
    }

    function addJointPoint(x, y, pinned) {
        points[points.length] = new _point2.default({ pos: { x: x, y: y }, pinned: pinned });
        joints[joints.length] = new _joint2.default(points[points.length - 2], points[points.length - 1]);

        document.getElementById("nrPoints").innerHTML = points.length;
        document.getElementById("nrJoints").innerHTML = joints.length;
    }

    return {
        'init': init,
        'update': update,
        'render': render
    };
};

var _point = __webpack_require__(1);

var _point2 = _interopRequireDefault(_point);

var _joint = __webpack_require__(0);

var _joint2 = _interopRequireDefault(_joint);

var _box = __webpack_require__(13);

var _box2 = _interopRequireDefault(_box);

var _world = __webpack_require__(2);

var _world2 = _interopRequireDefault(_world);

var _rope = __webpack_require__(15);

var _rope2 = _interopRequireDefault(_rope);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;

/***/ }),
/* 17 */,
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _gameWrapper = __webpack_require__(3);

var _gameWrapper2 = _interopRequireDefault(_gameWrapper);

var _game = __webpack_require__(16);

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