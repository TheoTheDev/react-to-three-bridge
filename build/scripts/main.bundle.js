/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/App.tsx":
/*!*********************!*\
  !*** ./src/App.tsx ***!
  \*********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
var react_dom_1 = __importDefault(__webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js"));
var ReactApp_1 = __webpack_require__(/*! ./components/ReactApp */ "./src/components/ReactApp.tsx");
//
window.onload = function () {
    var rootElement = document.getElementById('root');
    react_dom_1.default.render(react_1.default.createElement(react_1.default.StrictMode, null,
        react_1.default.createElement(ReactApp_1.ReactApp, null)), rootElement);
};


/***/ }),

/***/ "./src/components/ReactApp.tsx":
/*!*************************************!*\
  !*** ./src/components/ReactApp.tsx ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var react_1 = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
var SceneParams_1 = __webpack_require__(/*! ./SceneParams */ "./src/components/SceneParams.tsx");
var UIButtonBlock_1 = __webpack_require__(/*! ./UIButtonBlock */ "./src/components/UIButtonBlock.tsx");
var RTEventBridge_1 = __webpack_require__(/*! ../utils/RTEventBridge */ "./src/utils/RTEventBridge.ts");
var WorldContainer_1 = __webpack_require__(/*! ../gfx/WorldContainer */ "./src/gfx/WorldContainer.ts");
//
var GlobalContext = react_1.createContext(null);
exports.ReactApp = function () {
    var _a = react_1.useState(null), worldContainerApp = _a[0], setWorldContainerApp = _a[1];
    var _b = react_1.useState(null), rtBridge = _b[0], setRtBridge = _b[1];
    var _c = react_1.useState(0xff5555), color = _c[0], setColor = _c[1];
    var _d = react_1.useState(0), frameNum = _d[0], setFrameNum = _d[1];
    var _e = react_1.useState([0, 0, 0]), cameraPosition = _e[0], setCameraPosition = _e[1];
    // events callbacks
    var updateFrame = react_1.useCallback(function (params) {
        setFrameNum(params.frame);
    }, []);
    var updateCameraPosition = react_1.useCallback(function (params) {
        setCameraPosition([params.x, params.y, params.z]);
    }, []);
    // add / remove event listeres to threeJS World container for frame update
    var pauseFrameUpdate = function () {
        rtBridge.removeGfxEventListener('FrameUpdate', updateFrame);
    };
    var resumeFrameUpdate = function () {
        rtBridge.onGfxEvent('FrameUpdate', updateFrame);
    };
    // create threeJS world container
    react_1.useEffect(function () {
        var rtBridge = new RTEventBridge_1.RTEventBridge();
        var container = new WorldContainer_1.WorldContainer(rtBridge);
        setWorldContainerApp(container);
        setRtBridge(rtBridge);
        rtBridge.onGfxEvent('FrameUpdate', updateFrame);
        rtBridge.onGfxEvent('CameraPositionUpdate', updateCameraPosition);
    }, [updateFrame, updateCameraPosition]);
    // when color prop updated add a new event to threeJS world container to queue
    react_1.useEffect(function () {
        if (worldContainerApp) {
            rtBridge.dispatchToGfx('SetColor', { color: color });
        }
    }, [worldContainerApp, color]);
    //
    return (react_1.default.createElement(GlobalContext.Provider, { value: worldContainerApp },
        react_1.default.createElement("div", { className: "container" },
            react_1.default.createElement(UIButtonBlock_1.UIButtonBlock, { setColor: setColor }),
            react_1.default.createElement(UIButtonBlock_1.Button, { onClick: pauseFrameUpdate }, "Pause frame update"),
            react_1.default.createElement(UIButtonBlock_1.Button, { onClick: resumeFrameUpdate }, "Resume frame update"),
            react_1.default.createElement(SceneParams_1.SceneParams, { frame: frameNum, cameraPosition: cameraPosition }),
            react_1.default.createElement("canvas", { id: "renderport" }))));
};


/***/ }),

/***/ "./src/components/SceneParams.tsx":
/*!****************************************!*\
  !*** ./src/components/SceneParams.tsx ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
//
exports.SceneParams = function (_a) {
    var frame = _a.frame, cameraPosition = _a.cameraPosition;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", null,
            "Frame ",
            frame,
            react_1.default.createElement("br", null),
            "Camera pos x: ",
            cameraPosition[0].toFixed(2),
            " y: ",
            cameraPosition[1].toFixed(2),
            " z: ",
            cameraPosition[2].toFixed(2))));
};


/***/ }),

/***/ "./src/components/UIButtonBlock.tsx":
/*!******************************************!*\
  !*** ./src/components/UIButtonBlock.tsx ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
var styled_components_1 = __importDefault(__webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js"));
//
var theme = {
    blue: {
        default: "#3f51b5",
        hover: "#283593"
    },
    pink: {
        default: "#e91e63",
        hover: "#ad1457"
    }
};
exports.Button = styled_components_1.default.button(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    background-color: ", ";\n    color: white;\n    padding: 5px 15px;\n    border-radius: 5px;\n    outline: 0;\n    text-transform: uppercase;\n    margin: 10px 0px;\n    cursor: pointer;\n    box-shadow: 0px 2px 2px lightgray;\n    transition: ease background-color 250ms;\n    &:hover {\n        background-color: ", ";\n    }\n    &:disabled {\n        cursor: default;\n        opacity: 0.7;\n    }\n"], ["\n    background-color: ", ";\n    color: white;\n    padding: 5px 15px;\n    border-radius: 5px;\n    outline: 0;\n    text-transform: uppercase;\n    margin: 10px 0px;\n    cursor: pointer;\n    box-shadow: 0px 2px 2px lightgray;\n    transition: ease background-color 250ms;\n    &:hover {\n        background-color: ", ";\n    }\n    &:disabled {\n        cursor: default;\n        opacity: 0.7;\n    }\n"])), function (props) { return theme[props.theme].default; }, function (props) { return theme[props.theme].hover; });
exports.Button.defaultProps = {
    theme: 'blue'
};
//
exports.UIButtonBlock = function (_a) {
    var setColor = _a.setColor;
    var colors = [0xff0000, 0x00ff00, 0x0000ff];
    var setRedColor = function () {
        setColor(0xff0000);
    };
    var setGreenColor = function () {
        setColor(0x00ff00);
    };
    var setRandomColor = function () {
        setColor(colors[Math.floor(Math.random() * colors.length)]);
    };
    //
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(exports.Button, { onClick: setRedColor }, "Red"),
        react_1.default.createElement(exports.Button, { onClick: setGreenColor }, "Green"),
        react_1.default.createElement(exports.Button, { onClick: setRandomColor }, "Random")));
};
var templateObject_1;


/***/ }),

/***/ "./src/gfx/WorldContainer.ts":
/*!***********************************!*\
  !*** ./src/gfx/WorldContainer.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var three_1 = __webpack_require__(/*! three */ "./node_modules/three/src/Three.js");
var three_stdlib_1 = __webpack_require__(/*! three-stdlib */ "./node_modules/three-stdlib/index.js");
var RTEventBridge_1 = __webpack_require__(/*! ../utils/RTEventBridge */ "./src/utils/RTEventBridge.ts");
//
var WorldContainer = /** @class */ (function () {
    //
    function WorldContainer(rtBridge) {
        var _this = this;
        this.prevRenderTime = 0;
        this.clock = new three_1.Clock();
        this.rtBridge = new RTEventBridge_1.RTEventBridge();
        this.updateBoxColor = function (params) {
            _this.box.material.color.set(params.color);
        };
        this.onResize = function () {
            _this.camera.aspect = window.innerWidth / window.innerHeight;
            _this.camera.updateProjectionMatrix();
            _this.renderer.setSize(window.innerWidth, window.innerHeight);
        };
        this.loop = function () {
            requestAnimationFrame(_this.loop);
            var delta = _this.clock.getDelta();
            // process in/out events queue
            _this.rtBridge.processEvents();
            // updates and render
            _this.animate(delta);
            _this.renderer.render(_this.scene, _this.camera);
        };
        this.rtBridge = rtBridge;
        this.init();
    }
    ;
    WorldContainer.prototype.init = function () {
        this.renderer = new three_1.WebGLRenderer({ canvas: document.querySelector('#renderport') });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.camera = new three_1.PerspectiveCamera(60, 1920 / 1080, 1, 1000);
        this.camera.position.set(5, 3, 5);
        var controls = new three_stdlib_1.OrbitControls(this.camera, this.renderer.domElement);
        controls.target.set(0, 0, 0);
        controls.update();
        this.scene = new three_1.Scene();
        this.scene.background = new three_1.Color(1.0, 1.0, 1.0);
        var light = new three_1.AmbientLight(0xFFFFFF, 0.2);
        this.scene.add(light);
        var spotLight = new three_1.SpotLight(0xff8888, 0.9, 15);
        spotLight.position.copy(this.camera.position);
        this.scene.add(spotLight);
        var material = new three_1.MeshPhongMaterial({ color: 0xff0000 });
        var geometry = new three_1.BoxGeometry(2, 2, 2);
        var box = new three_1.Mesh(geometry, material);
        box.position.set(0, 0, 0);
        this.scene.add(box);
        this.box = box;
        //
        window.addEventListener('resize', this.onResize);
        this.rtBridge.onReactEvent('SetColor', this.updateBoxColor);
        //
        this.onResize();
        this.loop();
    };
    ;
    WorldContainer.prototype.animate = function (delta) {
        this.box.rotation.x += delta;
        this.box.rotation.z += 1.3 * delta;
        this.rtBridge.dispatchToReact('CameraPositionUpdate', { x: this.camera.position.x, y: this.camera.position.y, z: this.camera.position.z });
        this.rtBridge.dispatchToReact('FrameUpdate', { frame: this.renderer.info.render.frame });
    };
    ;
    return WorldContainer;
}());
exports.WorldContainer = WorldContainer;
;


/***/ }),

/***/ "./src/utils/RTEventBridge.ts":
/*!************************************!*\
  !*** ./src/utils/RTEventBridge.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
//
var RTEventBridge = /** @class */ (function () {
    function RTEventBridge() {
        this.reactEventsQueue = new Map();
        this.reactEventListeners = new Map();
        this.gfxEventsQueue = new Map();
        this.gfxEventListeners = new Map();
    }
    //
    RTEventBridge.prototype.clear = function () {
        this.reactEventsQueue.clear();
        this.reactEventListeners.clear();
        this.gfxEventsQueue.clear();
        this.gfxEventListeners.clear();
    };
    ;
    RTEventBridge.prototype.onReactEvent = function (eventName, callback) {
        var listeners = this.reactEventListeners.get(eventName);
        if (!listeners) {
            listeners = new Set();
            this.reactEventListeners.set(eventName, listeners);
        }
        listeners.add(callback);
    };
    ;
    RTEventBridge.prototype.removeReactEventListener = function (eventName, callback) {
        var listeners = this.reactEventListeners.get(eventName);
        if (listeners) {
            listeners.delete(callback);
            if (!listeners.size) {
                this.gfxEventListeners.delete(eventName);
            }
        }
    };
    ;
    RTEventBridge.prototype.dispatchToGfx = function (eventName, params) {
        var reactEvents = this.reactEventsQueue.get(eventName);
        if (!reactEvents) {
            reactEvents = new Set();
            this.reactEventsQueue.set(eventName, reactEvents);
        }
        reactEvents.add(params);
    };
    ;
    //
    RTEventBridge.prototype.onGfxEvent = function (eventName, callback) {
        var listeners = this.gfxEventListeners.get(eventName);
        if (!listeners) {
            listeners = new Set();
            this.gfxEventListeners.set(eventName, listeners);
        }
        listeners.add(callback);
    };
    ;
    RTEventBridge.prototype.removeGfxEventListener = function (eventName, callback) {
        var listeners = this.gfxEventListeners.get(eventName);
        if (listeners) {
            listeners.delete(callback);
            if (!listeners.size) {
                this.gfxEventListeners.delete(eventName);
            }
        }
    };
    ;
    RTEventBridge.prototype.dispatchToReact = function (eventName, params) {
        var gfxEvents = this.gfxEventsQueue.get(eventName);
        if (!gfxEvents) {
            gfxEvents = new Set();
            this.gfxEventsQueue.set(eventName, gfxEvents);
        }
        gfxEvents.add(params);
    };
    ;
    //
    RTEventBridge.prototype.processEvents = function () {
        // process events sent to gfx
        var _this = this;
        this.gfxEventsQueue.forEach(function (paramsList, eventName) {
            var listeners = _this.gfxEventListeners.get(eventName);
            if (listeners && listeners.size) {
                paramsList.forEach(function (params) {
                    listeners.forEach(function (listener) {
                        listener(params);
                    });
                });
            }
        });
        this.gfxEventsQueue.clear();
        // process events sent to react
        this.reactEventsQueue.forEach(function (paramsList, eventName) {
            var listeners = _this.reactEventListeners.get(eventName);
            if (listeners && listeners.size) {
                paramsList.forEach(function (params) {
                    listeners.forEach(function (listener) {
                        listener(params);
                    });
                });
            }
        });
        this.reactEventsQueue.clear();
    };
    ;
    return RTEventBridge;
}());
exports.RTEventBridge = RTEventBridge;
;


/***/ }),

/***/ "?4db5":
/*!********************!*\
  !*** fs (ignored) ***!
  \********************/
/***/ (() => {

/* (ignored) */

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
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
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
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkreact_to_three_bridge"] = self["webpackChunkreact_to_three_bridge"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendor"], () => (__webpack_require__("./src/App.tsx")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=main.js.map