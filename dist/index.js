(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Store"] = factory();
	else
		root["Store"] = factory();
})(window, function() {
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

/***/ "./src/event.ts":
/*!**********************!*\
  !*** ./src/event.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.EventStatus = void 0;\nvar EventStatus;\n\n(function (EventStatus) {\n  EventStatus[EventStatus[\"NEXT\"] = 0] = \"NEXT\";\n  EventStatus[EventStatus[\"END\"] = 1] = \"END\";\n  EventStatus[EventStatus[\"DELETE\"] = 2] = \"DELETE\";\n  EventStatus[EventStatus[\"DELETE_AND_END\"] = 3] = \"DELETE_AND_END\";\n})(EventStatus = exports.EventStatus || (exports.EventStatus = {}));\n\nclass Events {\n  constructor() {\n    this.data = new Map();\n  }\n\n  add(type, data) {\n    if (!this.data.has(type)) {\n      this.data.set(type, []);\n    }\n\n    ;\n    this.data.get(type).push(data);\n  }\n\n  forEach(type, callfn) {\n    if (this.data.has(type)) {\n      const events = this.data.get(type);\n\n      for (let i = 0; i < events.length; i++) {\n        const status = callfn(events[i], i);\n\n        if (EventStatus.END == status) {\n          break;\n        } else if (EventStatus.DELETE == status) {\n          events.splice(i--, 1);\n        } else if (EventStatus.DELETE_AND_END == status) {\n          events.splice(i--, 1);\n          break;\n        }\n      }\n    }\n  }\n\n  on(type, fn) {\n    this.add(type, {\n      fn,\n      once: false\n    });\n    return this;\n  }\n\n  once(type, fn) {\n    this.add(type, {\n      fn,\n      once: true\n    });\n    return this;\n  }\n\n  emeit(type, ...args) {\n    this.forEach(type, ({\n      fn,\n      once\n    }) => {\n      fn(...args);\n\n      if (once) {\n        return EventStatus.DELETE;\n      }\n    });\n    return this;\n  }\n\n  off(type, offFn) {\n    this.forEach(type, ({\n      fn\n    }) => {\n      if (offFn === fn) {\n        return EventStatus.DELETE_AND_END;\n      }\n    });\n    return this;\n  }\n\n  remove(type) {\n    this.data.delete(type);\n    return this;\n  }\n\n  clear() {\n    this.data.clear();\n    return this;\n  }\n\n}\n\nexports.default = Events;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvZXZlbnQudHMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9TdG9yZS8uL3NyYy9ldmVudC50cz8yYWI4Il0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGRlcHJlY2F0ZWQg5LqL5Lu2566h55CG5ZmoXG4gKi9cblxuLyoqXG4gKiDkuovku7bpobnmlbDmja5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBFdmVudEl0ZW0ge1xuICAgIGZuOiBGdW5jdGlvblxuICAgIG9uY2U6IGJvb2xlYW5cbn1cblxuZXhwb3J0IGVudW0gRXZlbnRTdGF0dXMge1xuICAgIC8qKiDnu6fnu63lvqrnjq8gKi9cbiAgICBORVhULFxuICAgIC8qKiDnu4jmraLlvqrnjq8gKi9cbiAgICBFTkQsXG4gICAgLyoqIOWIoOmZpOW9k+WJjeWFg+e0oCAqL1xuICAgIERFTEVURSxcbiAgICAvKiog5Yig6Zmk5b2T5YmN5YWD57Sg5bm257uI5q2i5b6q546vICovXG4gICAgREVMRVRFX0FORF9FTkQsXG59XG5cbi8qKlxuICog6YGN5Y6G5LqL5Lu25rGg5pe255qE6Ieq5a6a5LmJ5Zue6LCD5Ye95pWwXG4gKi9cbmV4cG9ydCB0eXBlIGVhY2hjYWxsID0gKHZhbHVlOiBFdmVudEl0ZW0sIGluZGV4OiBudW1iZXIpID0+IEV2ZW50U3RhdHVzIHwgdm9pZFxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudHMge1xuICAgIC8qKlxuICAgICAqIOS6i+S7tuaxoFxuICAgICAqL1xuICAgIHByb3RlY3RlZCBkYXRhOiBNYXA8c3RyaW5nLCBFdmVudEl0ZW1bXT4gPSBuZXcgTWFwKClcblxuICAgIC8qKlxuICAgICAqIOWwhuS6i+S7tuWHveaVsOebuOWFs+aVsOaNruS/neWtmOWIsOS6i+S7tuaxoOS4rVxuICAgICAqIEBwYXJhbSB0eXBlIOS6i+S7tuexu+Wei1xuICAgICAqIEBwYXJhbSBkYXRhIOS6i+S7tuaVsOaNrlxuICAgICAqL1xuICAgIHByb3RlY3RlZCBhZGQodHlwZTogc3RyaW5nLCBkYXRhOiBFdmVudEl0ZW0pIHtcbiAgICAgICAgaWYgKCF0aGlzLmRhdGEuaGFzKHR5cGUpKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGEuc2V0KHR5cGUsIFtdKVxuICAgICAgICB9XG4gICAgICAgIDsodGhpcy5kYXRhLmdldCh0eXBlKSBhcyBFdmVudEl0ZW1bXSkucHVzaChkYXRhKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOmBjeWOhuS6i+S7tuaxoFxuICAgICAqIEBwYXJhbSB0eXBlIOS6i+S7tuexu+Wei1xuICAgICAqIEBwYXJhbSBjYWxsZm4g6Ieq5a6a5LmJ5Zue6LCD5Ye95pWwXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGZvckVhY2godHlwZTogc3RyaW5nLCBjYWxsZm46IGVhY2hjYWxsKSB7XG4gICAgICAgIGlmICh0aGlzLmRhdGEuaGFzKHR5cGUpKSB7XG4gICAgICAgICAgICBjb25zdCBldmVudHMgPSB0aGlzLmRhdGEuZ2V0KHR5cGUpIGFzIEV2ZW50SXRlbVtdXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGV2ZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHN0YXR1cyA9IGNhbGxmbihldmVudHNbaV0sIGkpXG4gICAgICAgICAgICAgICAgLy8g57uI5q2i5b6q546vXG4gICAgICAgICAgICAgICAgaWYgKEV2ZW50U3RhdHVzLkVORCA9PSBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8g5Yig6Zmk5b2T5YmN5YWD57SgXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoRXZlbnRTdGF0dXMuREVMRVRFID09IHN0YXR1cykge1xuICAgICAgICAgICAgICAgICAgICBldmVudHMuc3BsaWNlKGktLSwgMSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8g5Yig6Zmk5b2T5YmN5YWD57Sg5bm257uI5q2i5b6q546vXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoRXZlbnRTdGF0dXMuREVMRVRFX0FORF9FTkQgPT0gc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50cy5zcGxpY2UoaS0tLCAxKVxuICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOe7keWumuS6i+S7tlxuICAgICAqIEBwYXJhbSB0eXBlIOS6i+S7tuexu+Wei1xuICAgICAqIEBwYXJhbSBmbiDkuovku7blm57osINcbiAgICAgKi9cbiAgICBwdWJsaWMgb24odHlwZTogc3RyaW5nLCBmbjogRnVuY3Rpb24pIHtcbiAgICAgICAgdGhpcy5hZGQodHlwZSwgeyBmbiwgb25jZTogZmFsc2UgfSlcbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDnu5HlrprkuIDmrKHmgKfkuovku7bkuovku7ZcbiAgICAgKiBAcGFyYW0gdHlwZSDkuovku7bnsbvlnotcbiAgICAgKiBAcGFyYW0gZm4g5LqL5Lu25Zue6LCDXG4gICAgICovXG4gICAgcHVibGljIG9uY2UodHlwZTogc3RyaW5nLCBmbjogRnVuY3Rpb24pIHtcbiAgICAgICAgdGhpcy5hZGQodHlwZSwgeyBmbiwgb25jZTogdHJ1ZSB9KVxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWPkeW4g+S6i+S7tlxuICAgICAqIEBwYXJhbSB0eXBlIOS6i+S7tuexu+Wei1xuICAgICAqIEBwYXJhbSBhcmdzIOWPguaVsOmbhuWQiFxuICAgICAqL1xuICAgIHB1YmxpYyBlbWVpdCh0eXBlOiBzdHJpbmcsIC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgICAgIHRoaXMuZm9yRWFjaCh0eXBlLCAoeyBmbiwgb25jZSB9KSA9PiB7XG4gICAgICAgICAgICBmbiguLi5hcmdzKVxuICAgICAgICAgICAgaWYgKG9uY2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gRXZlbnRTdGF0dXMuREVMRVRFXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5LqL5Lu26Kej57uRXG4gICAgICogQHBhcmFtIHR5cGUg5LqL5Lu257G75Z6LXG4gICAgICogQHBhcmFtIG9mZkZuIOino+e7keeahOWHveaVsFxuICAgICAqL1xuICAgIHB1YmxpYyBvZmYodHlwZTogc3RyaW5nLCBvZmZGbjogRnVuY3Rpb24pIHtcbiAgICAgICAgdGhpcy5mb3JFYWNoKHR5cGUsICh7IGZuIH0pID0+IHtcbiAgICAgICAgICAgIGlmIChvZmZGbiA9PT0gZm4pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gRXZlbnRTdGF0dXMuREVMRVRFX0FORF9FTkRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDnp7vpmaTmn5DkuIDkuovku7bnsbvlnovnmoTnm5HlkKxcbiAgICAgKiBAcGFyYW0gdHlwZSDkuovku7bnsbvlnotcbiAgICAgKi9cbiAgICBwdWJsaWMgcmVtb3ZlKHR5cGU6IHN0cmluZykge1xuICAgICAgICB0aGlzLmRhdGEuZGVsZXRlKHR5cGUpXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5riF6Zmk5omA5pyJ5LqL5Lu257G75Z6L55qE55uR5ZCsXG4gICAgICovXG4gICAgcHVibGljIGNsZWFyKCkge1xuICAgICAgICB0aGlzLmRhdGEuY2xlYXIoKVxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH1cbn1cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBWUE7QUFDQTtBQURBO0FBRUE7QUFFQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBTUE7QUFBQTtBQUlBO0FBMEdBO0FBQ0E7QUFwR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFNQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBTUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQU1BO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFNQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUE5R0E7QUFDQTtBQURBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/event.ts\n");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar __classPrivateFieldSet = this && this.__classPrivateFieldSet || function (receiver, privateMap, value) {\n  if (!privateMap.has(receiver)) {\n    throw new TypeError(\"attempted to set private field on non-instance\");\n  }\n\n  privateMap.set(receiver, value);\n  return value;\n};\n\nvar __classPrivateFieldGet = this && this.__classPrivateFieldGet || function (receiver, privateMap) {\n  if (!privateMap.has(receiver)) {\n    throw new TypeError(\"attempted to get private field on non-instance\");\n  }\n\n  return privateMap.get(receiver);\n};\n\nvar __importDefault = this && this.__importDefault || function (mod) {\n  return mod && mod.__esModule ? mod : {\n    \"default\": mod\n  };\n};\n\nvar _uuid, _storage, _data;\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nconst event_1 = __importDefault(__webpack_require__(/*! ./event */ \"./src/event.ts\"));\n\nclass Store {\n  constructor(storage, namespace = 'clinfc-store') {\n    this.storage = storage;\n    this.namespace = namespace;\n\n    _uuid.set(this, Math.random().toString(16).slice(2, 12));\n\n    _storage.set(this, void 0);\n\n    _data.set(this, {});\n\n    this.events = new event_1.default();\n\n    __classPrivateFieldSet(this, _storage, storage === 'local' ? window.localStorage : window.sessionStorage);\n\n    this.synchrodata(false);\n\n    const storagefn = e => {\n      if (e.key === this.namespace) {\n        this.synchrodata(false);\n      }\n    };\n\n    const storagechangefn = e => {\n      if (e.detail && e.detail.namespace === this.namespace) {\n        if (e.detail.uuid !== __classPrivateFieldGet(this, _uuid)) {\n          this.synchrodata(false);\n        }\n\n        this.events.emeit('change');\n      }\n    };\n\n    window.addEventListener('storage', storagefn);\n    window.addEventListener(`${this.storage}storagechange`, storagechangefn);\n    this.events.once('destory', () => {\n      window.removeEventListener('storage', storagefn);\n      window.removeEventListener(`${this.storage}storagechange`, storagechangefn);\n    });\n  }\n\n  get data() {\n    return __classPrivateFieldGet(this, _data);\n  }\n\n  get size() {\n    return this.keys().length;\n  }\n\n  keys() {\n    return Object.keys(__classPrivateFieldGet(this, _data));\n  }\n\n  has(key) {\n    return key in __classPrivateFieldGet(this, _data);\n  }\n\n  get(key) {\n    if (this.has(key)) {\n      return __classPrivateFieldGet(this, _data)[key];\n    }\n\n    return null;\n  }\n\n  gets(...keys) {\n    const temp = {};\n    keys.forEach(key => {\n      temp[key] = this.get(key);\n    });\n    return temp;\n  }\n\n  only(...keys) {\n    const temp = {};\n    keys.forEach(key => {\n      if (this.has(key)) {\n        temp[key] = this.get(key);\n      }\n    });\n    return temp;\n  }\n\n  set(key, value) {\n    __classPrivateFieldGet(this, _data)[key] = value;\n    this.synchrodata(true);\n    this.dispatch();\n    return this;\n  }\n\n  sets(data) {\n    const entries = Object.entries(data);\n\n    if (entries.length) {\n      entries.forEach(([key, value]) => {\n        __classPrivateFieldGet(this, _data)[key] = value;\n      });\n      this.synchrodata(true);\n      this.dispatch();\n    }\n\n    return this;\n  }\n\n  remove(...keys) {\n    keys = keys.filter(key => this.has(key));\n\n    if (keys.length) {\n      keys.forEach(key => {\n        delete __classPrivateFieldGet(this, _data)[key];\n      });\n      this.synchrodata(true);\n      this.dispatch();\n    }\n\n    return this;\n  }\n\n  clear() {\n    __classPrivateFieldSet(this, _data, {});\n\n    __classPrivateFieldGet(this, _storage).removeItem(this.namespace);\n\n    this.dispatch();\n    return this;\n  }\n\n  destroy() {\n    this.events.emeit('destory');\n    this.events.clear();\n\n    __classPrivateFieldSet(this, _data, {});\n  }\n\n  dispatch() {\n    const event = new CustomEvent(`${this.storage}storagechange`, {\n      bubbles: true,\n      cancelable: true,\n      detail: {\n        uuid: __classPrivateFieldGet(this, _uuid),\n        namespace: this.namespace\n      }\n    });\n    window.dispatchEvent(event);\n  }\n\n  synchrodata(isSave = true) {\n    if (isSave) {\n      __classPrivateFieldGet(this, _storage).setItem(this.namespace, JSON.stringify(__classPrivateFieldGet(this, _data)));\n    } else {\n      const data = __classPrivateFieldGet(this, _storage).getItem(this.namespace);\n\n      if (data && /^\\{.*\\}$/.test(data)) {\n        __classPrivateFieldSet(this, _data, JSON.parse(data));\n      } else {\n        __classPrivateFieldSet(this, _data, {});\n      }\n    }\n  }\n\n  static session(namespace) {\n    return new Store('session', namespace);\n  }\n\n  static local(namespace) {\n    return new Store('local', namespace);\n  }\n\n}\n\nexports.default = Store;\n_uuid = new WeakMap(), _storage = new WeakMap(), _data = new WeakMap();//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXgudHMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9TdG9yZS8uL3NyYy9pbmRleC50cz9mZmI0Il0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGF1dGhvciDnv6DmnpdcbiAqIEBkZXByZWNhdGVkIOWvuSBTdG9yYWdlIOeahOWwgeijhVxuICovXG5cbmltcG9ydCBFdmVudHMgZnJvbSAnLi9ldmVudCdcblxuLyoqXG4gKiBTdG9yZSDlrp7kvovnmoTlhoXpg6jnvJPlrZhcbiAqL1xudHlwZSBEYXRhID0ge1xuICAgIFtwcm9wTmFtZTogc3RyaW5nXTogYW55XG59XG5cbi8qKlxuICogU3RvcmFnZSDnrqHnkIblmahcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RvcmUge1xuICAgIC8qKiDlvZPliY3lrp7kvovnmoTmoIfor4YgKi9cbiAgICAjdXVpZDogc3RyaW5nID0gTWF0aC5yYW5kb20oKS50b1N0cmluZygxNikuc2xpY2UoMiwgMTIpXG5cbiAgICAvKiogU3RvcmFnZSAqL1xuICAgICNzdG9yYWdlOiBTdG9yYWdlXG5cbiAgICAvKipcbiAgICAgKiDlvZPliY3lrp7kvovlr7nmlbDmja7nmoTnvJPlrZhcbiAgICAgKi9cbiAgICAjZGF0YTogRGF0YSA9IHt9XG5cbiAgICAvKiog5LqL5Lu2566h55CG5ZmoICovXG4gICAgcHVibGljIGV2ZW50czogRXZlbnRzID0gbmV3IEV2ZW50cygpXG5cbiAgICAvKipcbiAgICAgKiDojrflj5blvZPliY3nqbrpl7TkuIvnmoTmiYDmnInmlbDmja5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IGRhdGEoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiNkYXRhXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6I635Y+W5b2T5YmN56m66Ze05LiL6ZSu5YC85a+555qE5Liq5pWwXG4gICAgICovXG4gICAgcHVibGljIGdldCBzaXplKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5rZXlzKCkubGVuZ3RoXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Yib5bu65pWw5o2u5bqT566h55CG5Zmo5a6e5L6LXG4gICAgICogQHBhcmFtIHN0b3JhZ2UgU3RvcmFnZSDnsbvlnotcbiAgICAgKiBAcGFyYW0gbmFtZXNwYWNlIFN0b3JhZ2Ug55qE6ZSu5ZCNXG4gICAgICovXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBzdG9yYWdlOiAnbG9jYWwnIHwgJ3Nlc3Npb24nLCBwcm90ZWN0ZWQgbmFtZXNwYWNlOiBzdHJpbmcgPSAnY2xpbmZjLXN0b3JlJykge1xuICAgICAgICB0aGlzLiNzdG9yYWdlID0gc3RvcmFnZSA9PT0gJ2xvY2FsJyA/IHdpbmRvdy5sb2NhbFN0b3JhZ2UgOiB3aW5kb3cuc2Vzc2lvblN0b3JhZ2VcblxuICAgICAgICB0aGlzLnN5bmNocm9kYXRhKGZhbHNlKVxuXG4gICAgICAgIC8vIHN0b3JhZ2Ug5LqL5Lu255qE5Zue6LCD5Ye95pWwXG4gICAgICAgIGNvbnN0IHN0b3JhZ2VmbiA9IChlOiBTdG9yYWdlRXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmIChlLmtleSA9PT0gdGhpcy5uYW1lc3BhY2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN5bmNocm9kYXRhKGZhbHNlKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8g6Ieq5a6a5LmJIHN0b3JhZ2UgY2hhbmdlIOS6i+S7tueahOWbnuiwg+WHveaVsFxuICAgICAgICBjb25zdCBzdG9yYWdlY2hhbmdlZm4gPSAoZTogQ3VzdG9tRXZlbnRJbml0KSA9PiB7XG4gICAgICAgICAgICBpZiAoZS5kZXRhaWwgJiYgZS5kZXRhaWwubmFtZXNwYWNlID09PSB0aGlzLm5hbWVzcGFjZSkge1xuICAgICAgICAgICAgICAgIGlmIChlLmRldGFpbC51dWlkICE9PSB0aGlzLiN1dWlkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3luY2hyb2RhdGEoZmFsc2UpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRzLmVtZWl0KCdjaGFuZ2UnKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8g57uR5a6a55uR5ZCsXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzdG9yYWdlJywgc3RvcmFnZWZuKVxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihgJHt0aGlzLnN0b3JhZ2V9c3RvcmFnZWNoYW5nZWAsIHN0b3JhZ2VjaGFuZ2VmbilcblxuICAgICAgICAvLyDplIDmr4Hml7blj5bmtojnm5HlkKzkuovku7ZcbiAgICAgICAgdGhpcy5ldmVudHMub25jZSgnZGVzdG9yeScsICgpID0+IHtcbiAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdzdG9yYWdlJywgc3RvcmFnZWZuKVxuICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoYCR7dGhpcy5zdG9yYWdlfXN0b3JhZ2VjaGFuZ2VgLCBzdG9yYWdlY2hhbmdlZm4pXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6I635Y+W5b2T5YmN5ZG95ZCN56m66Ze05LiL5omA5pyJ55qE6ZSu55qE6ZuG5ZCI44CC6L+U5Zue5LiA5Liq5pWw57uE44CCXG4gICAgICovXG4gICAgcHVibGljIGtleXMoKSB7XG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLiNkYXRhKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWIpOaWree8k+WtmOS4reaYr+WQpuWMheWQq+ivpemUruWQjVxuICAgICAqIEBwYXJhbSBrZXkg6ZSu5ZCNXG4gICAgICovXG4gICAgcHVibGljIGhhcyhrZXk6IHN0cmluZykge1xuICAgICAgICByZXR1cm4ga2V5IGluIHRoaXMuI2RhdGFcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDojrflj5bmjIflrprplK7lkI3nmoTmlbDmja5cbiAgICAgKiBAcGFyYW0ga2V5IOmUruWQjVxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQoa2V5OiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHRoaXMuaGFzKGtleSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiNkYXRhW2tleV1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbFxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOaJuemHj+iOt+WPluaVsOaNruOAguS4jeWtmOWcqOeahOmUruWQjeWFtuWAvOWwhuS4uiBudWxsXG4gICAgICogQHBhcmFtIGtleXMg6ZyA6KaB6I635Y+W55qE6ZSu5ZCN6ZuG5ZCIXG4gICAgICovXG4gICAgcHVibGljIGdldHMoLi4ua2V5czogc3RyaW5nW10pIHtcbiAgICAgICAgY29uc3QgdGVtcDogRGF0YSA9IHt9XG4gICAgICAgIGtleXMuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgICAgdGVtcFtrZXldID0gdGhpcy5nZXQoa2V5KVxuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gdGVtcFxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOaJuemHj+iOt+WPluaVsOaNruOAguWPqui/lOWbnuWtmOWcqOeahOmUruWPiuWFtuWAvFxuICAgICAqIEBwYXJhbSBrZXlzIOmcgOimgeiOt+WPlueahOmUruWQjembhuWQiFxuICAgICAqL1xuICAgIHB1YmxpYyBvbmx5KC4uLmtleXM6IHN0cmluZ1tdKSB7XG4gICAgICAgIGNvbnN0IHRlbXA6IERhdGEgPSB7fVxuICAgICAgICBrZXlzLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmhhcyhrZXkpKSB7XG4gICAgICAgICAgICAgICAgdGVtcFtrZXldID0gdGhpcy5nZXQoa2V5KVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gdGVtcFxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOa3u+WKoC/orr7nva7lgLxcbiAgICAgKiBAcGFyYW0ga2V5IOmUruWQjVxuICAgICAqIEBwYXJhbSB2YWx1ZSDlgLxcbiAgICAgKi9cbiAgICBwdWJsaWMgc2V0KGtleTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgICAgIHRoaXMuI2RhdGFba2V5XSA9IHZhbHVlXG4gICAgICAgIHRoaXMuc3luY2hyb2RhdGEodHJ1ZSlcbiAgICAgICAgdGhpcy5kaXNwYXRjaCgpXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5om56YeP6K6+572u5pWw5o2uXG4gICAgICogQHBhcmFtIGRhdGEgT2JqZWN0IOWvueixoVxuICAgICAqL1xuICAgIHB1YmxpYyBzZXRzKGRhdGE6IERhdGEpIHtcbiAgICAgICAgY29uc3QgZW50cmllcyA9IE9iamVjdC5lbnRyaWVzKGRhdGEpXG4gICAgICAgIGlmIChlbnRyaWVzLmxlbmd0aCkge1xuICAgICAgICAgICAgZW50cmllcy5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLiNkYXRhW2tleV0gPSB2YWx1ZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHRoaXMuc3luY2hyb2RhdGEodHJ1ZSlcbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2goKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Yig6Zmk5oyH5a6a6ZSu5ZCN5pWw5o2uXG4gICAgICogQHBhcmFtIGtleSDpnIDopoHooqvliKDpmaTnmoTplK5cbiAgICAgKi9cbiAgICBwdWJsaWMgcmVtb3ZlKC4uLmtleXM6IHN0cmluZ1tdKSB7XG4gICAgICAgIGtleXMgPSBrZXlzLmZpbHRlcihrZXkgPT4gdGhpcy5oYXMoa2V5KSlcbiAgICAgICAgaWYgKGtleXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBrZXlzLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy4jZGF0YVtrZXldXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgdGhpcy5zeW5jaHJvZGF0YSh0cnVlKVxuICAgICAgICAgICAgdGhpcy5kaXNwYXRjaCgpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmuIXpmaTmlbDmja5cbiAgICAgKi9cbiAgICBwdWJsaWMgY2xlYXIoKSB7XG4gICAgICAgIHRoaXMuI2RhdGEgPSB7fVxuICAgICAgICB0aGlzLiNzdG9yYWdlLnJlbW92ZUl0ZW0odGhpcy5uYW1lc3BhY2UpXG4gICAgICAgIHRoaXMuZGlzcGF0Y2goKVxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOmUgOavgeWunuS+i1xuICAgICAqL1xuICAgIHB1YmxpYyBkZXN0cm95KCkge1xuICAgICAgICB0aGlzLmV2ZW50cy5lbWVpdCgnZGVzdG9yeScpXG4gICAgICAgIHRoaXMuZXZlbnRzLmNsZWFyKClcbiAgICAgICAgdGhpcy4jZGF0YSA9IHt9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Y+R5biDIHNlc3Npb25zdG9yYWdlY2hhbmdlL2xvY2Fsc3RvcmFnZWNoYW5nZSDkuovku7ZcbiAgICAgKi9cbiAgICBwdWJsaWMgZGlzcGF0Y2goKSB7XG4gICAgICAgIGNvbnN0IGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KGAke3RoaXMuc3RvcmFnZX1zdG9yYWdlY2hhbmdlYCwge1xuICAgICAgICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgICAgICAgIGNhbmNlbGFibGU6IHRydWUsXG4gICAgICAgICAgICBkZXRhaWw6IHtcbiAgICAgICAgICAgICAgICB1dWlkOiB0aGlzLiN1dWlkLFxuICAgICAgICAgICAgICAgIG5hbWVzcGFjZTogdGhpcy5uYW1lc3BhY2UsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KVxuICAgICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChldmVudClcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlkIzmraXlvZPliY3lrp7kvovkuI4gU3RvcmFnZSDkuK3nmoTmlbDmja5cbiAgICAgKiBAcGFyYW0gaXNTYXZlIHRydWU6IOWwhuWunuS+i+S4reeahOe8k+WtmOaVsOaNruS/neWtmOWIsCBTdG9yYWdlIOS4re+8m2ZhbHNlOiDlsIYgU3RvcmFnZSDkuK3mlbDmja7lkIzmraXliLDlvZPliY3lrp7kvovnmoTnvJPlrZjkuK1cbiAgICAgKi9cbiAgICBwdWJsaWMgc3luY2hyb2RhdGEoaXNTYXZlOiBib29sZWFuID0gdHJ1ZSkge1xuICAgICAgICBpZiAoaXNTYXZlKSB7XG4gICAgICAgICAgICAvLyDlsIblvZPliY3lrp7kvovkuK3nmoTmlbDmja7kv53lrZjliLDnvJPlrZjkuK1cbiAgICAgICAgICAgIHRoaXMuI3N0b3JhZ2Uuc2V0SXRlbSh0aGlzLm5hbWVzcGFjZSwgSlNPTi5zdHJpbmdpZnkodGhpcy4jZGF0YSkpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyDlsIbnvJPlrZjkuK3nmoTmlbDmja7lkIzmraXliLDlvZPliY3lrp7kvovkuK1cbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLiNzdG9yYWdlLmdldEl0ZW0odGhpcy5uYW1lc3BhY2UpXG4gICAgICAgICAgICBpZiAoZGF0YSAmJiAvXlxcey4qXFx9JC8udGVzdChkYXRhKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuI2RhdGEgPSBKU09OLnBhcnNlKGRhdGEpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuI2RhdGEgPSB7fVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5b+r5o235Yib5bu6IHNlc3Npb25TdG9yYWdlIOexu+Wei+aVsOaNruW6k+euoeeQhuWZqOWunuS+i1xuICAgICAqIEBwYXJhbSBuYW1lc3BhY2Ug5pWw5o2u5bqT5ZCN56ewXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBzZXNzaW9uKG5hbWVzcGFjZT86IHN0cmluZykge1xuICAgICAgICByZXR1cm4gbmV3IFN0b3JlKCdzZXNzaW9uJywgbmFtZXNwYWNlKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOW/q+aNt+WIm+W7uiBsb2NhbFN0b3JhZ2Ug57G75Z6L5pWw5o2u5bqT566h55CG5Zmo5a6e5L6LXG4gICAgICogQHBhcmFtIG5hbWVzcGFjZSDmlbDmja7lupPlkI3np7BcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGxvY2FsKG5hbWVzcGFjZT86IHN0cmluZykge1xuICAgICAgICByZXR1cm4gbmV3IFN0b3JlKCdsb2NhbCcsIG5hbWVzcGFjZSlcbiAgICB9XG59XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFLQTtBQUNBO0FBV0E7QUFrQ0E7QUFBQTtBQUFBO0FBQ0E7QUFqQ0E7QUFDQTtBQUVBO0FBQ0E7QUFJQTtBQUNBO0FBRUE7QUFDQTtBQXFCQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWhEQTtBQUNBO0FBQ0E7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBMENBO0FBQ0E7QUFDQTtBQUNBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFLQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBS0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUhBO0FBUUE7QUFDQTtBQUNBO0FBS0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUF2T0E7QUFDQTtBQURBO0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/index.ts\n");

/***/ })

/******/ })["default"];
});