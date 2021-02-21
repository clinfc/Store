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

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar __classPrivateFieldSet = this && this.__classPrivateFieldSet || function (receiver, privateMap, value) {\n  if (!privateMap.has(receiver)) {\n    throw new TypeError(\"attempted to set private field on non-instance\");\n  }\n\n  privateMap.set(receiver, value);\n  return value;\n};\n\nvar __classPrivateFieldGet = this && this.__classPrivateFieldGet || function (receiver, privateMap) {\n  if (!privateMap.has(receiver)) {\n    throw new TypeError(\"attempted to get private field on non-instance\");\n  }\n\n  return privateMap.get(receiver);\n};\n\nvar _uuid, _storage, _data;\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nclass Store {\n  constructor(dbtype, dbname = 'clinfc-store') {\n    this.dbtype = dbtype;\n    this.dbname = dbname;\n\n    _uuid.set(this, Math.random().toString(16).slice(2, 12));\n\n    _storage.set(this, void 0);\n\n    _data.set(this, {});\n\n    this.destoryfn = [];\n\n    __classPrivateFieldSet(this, _storage, dbtype === 'local' ? window.localStorage : window.sessionStorage);\n\n    this.synchrodata(false);\n\n    const storagefn = e => {\n      if (e.key === this.dbname) {\n        this.synchrodata(false);\n      }\n    };\n\n    const storagechangefn = e => {\n      if (e.detail && e.detail.dbname === this.dbname && e.detail.uuid !== __classPrivateFieldGet(this, _uuid)) {\n        this.synchrodata(false);\n      }\n    };\n\n    window.addEventListener('storage', storagefn);\n    window.addEventListener(`${this.dbtype}storagechange`, storagechangefn);\n    this.destoryfn.push(() => {\n      window.removeEventListener('storage', storagefn);\n      window.removeEventListener(`${this.dbtype}storagechange`, storagechangefn);\n    });\n  }\n\n  get data() {\n    return __classPrivateFieldGet(this, _data);\n  }\n\n  synchrodata(isSave = true) {\n    if (isSave) {\n      __classPrivateFieldGet(this, _storage).setItem(this.dbname, JSON.stringify(__classPrivateFieldGet(this, _data)));\n    } else {\n      const data = __classPrivateFieldGet(this, _storage).getItem(this.dbname);\n\n      if (data && /^\\{.*\\}$/.test(data)) {\n        __classPrivateFieldSet(this, _data, JSON.parse(data));\n      } else {\n        __classPrivateFieldSet(this, _data, {});\n      }\n    }\n  }\n\n  has(key) {\n    return key in __classPrivateFieldGet(this, _data);\n  }\n\n  get(key) {\n    if (this.has(key)) {\n      return __classPrivateFieldGet(this, _data)[key];\n    }\n\n    return null;\n  }\n\n  set(key, value) {\n    __classPrivateFieldGet(this, _data)[key] = value;\n    this.synchrodata(true);\n    this.dispatch();\n    return this;\n  }\n\n  remove(key) {\n    if (this.has(key)) {\n      delete __classPrivateFieldGet(this, _data)[key];\n      this.synchrodata(true);\n      this.dispatch();\n    }\n\n    return this;\n  }\n\n  clear() {\n    __classPrivateFieldSet(this, _data, {});\n\n    __classPrivateFieldGet(this, _storage).removeItem(this.dbname);\n\n    this.dispatch();\n    return this;\n  }\n\n  destroy() {\n    this.destoryfn.forEach(fn => fn.call(this));\n\n    __classPrivateFieldSet(this, _data, {});\n  }\n\n  dispatch() {\n    const event = new CustomEvent(`${this.dbtype}storagechange`, {\n      bubbles: true,\n      cancelable: true,\n      detail: {\n        uuid: __classPrivateFieldGet(this, _uuid),\n        dbname: this.dbname\n      }\n    });\n    window.dispatchEvent(event);\n  }\n\n  static session(dbname) {\n    return new Store('session', dbname);\n  }\n\n  static local(dbname) {\n    return new Store('local', dbname);\n  }\n\n}\n\nexports.default = Store;\n_uuid = new WeakMap(), _storage = new WeakMap(), _data = new WeakMap();//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXgudHMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9TdG9yZS8uL3NyYy9pbmRleC50cz9mZmI0Il0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAYXV0aG9yIOe/oOael1xyXG4gKiBAZGVwcmVjYXRlZCDlr7kgU3RvcmFnZSDnmoTlsIHoo4VcclxuICovXHJcblxyXG4vKipcclxuICogU3RvcmUg5a6e5L6L55qE5YaF6YOo57yT5a2YXHJcbiAqL1xyXG50eXBlIERhdGEgPSB7XHJcbiAgICBbcHJvcE5hbWU6IHN0cmluZ106IGFueVxyXG59XHJcblxyXG4vKipcclxuICogU3RvcmFnZSDnrqHnkIblmahcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0b3JlIHtcclxuICAgIC8qKiDlvZPliY3lrp7kvovnmoTmoIfor4YgKi9cclxuICAgICN1dWlkOiBzdHJpbmcgPSBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDE2KS5zbGljZSgyLCAxMilcclxuXHJcbiAgICAvKiogU3RvcmFnZSAqL1xyXG4gICAgI3N0b3JhZ2U6IFN0b3JhZ2VcclxuXHJcbiAgICAvKipcclxuICAgICAqIOW9k+WJjeWunuS+i+WvueaVsOaNrueahOe8k+WtmFxyXG4gICAgICovXHJcbiAgICAjZGF0YTogRGF0YSA9IHt9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlrp7kvovplIDmr4HliY3nmoTlm57osIPlh73mlbBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRlc3RvcnlmbjogRnVuY3Rpb25bXSA9IFtdXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5blvZPliY3nqbrpl7TkuIvnmoTmiYDmnInmlbDmja5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBkYXRhKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLiNkYXRhXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliJvlu7rmlbDmja7lupPnrqHnkIblmajlrp7kvotcclxuICAgICAqIEBwYXJhbSBkYnR5cGUgU3RvcmFnZSDnsbvlnotcclxuICAgICAqIEBwYXJhbSBkYm5hbWUgU3RvcmFnZSDnmoTplK7lkI1cclxuICAgICAqL1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgZGJ0eXBlOiAnbG9jYWwnIHwgJ3Nlc3Npb24nLCBwcml2YXRlIGRibmFtZTogc3RyaW5nID0gJ2NsaW5mYy1zdG9yZScpIHtcclxuICAgICAgICB0aGlzLiNzdG9yYWdlID0gZGJ0eXBlID09PSAnbG9jYWwnID8gd2luZG93LmxvY2FsU3RvcmFnZSA6IHdpbmRvdy5zZXNzaW9uU3RvcmFnZVxyXG5cclxuICAgICAgICB0aGlzLnN5bmNocm9kYXRhKGZhbHNlKVxyXG5cclxuICAgICAgICAvLyBzdG9yYWdlIOS6i+S7tueahOWbnuiwg+WHveaVsFxyXG4gICAgICAgIGNvbnN0IHN0b3JhZ2VmbiA9IChlOiBTdG9yYWdlRXZlbnQpID0+IHtcclxuICAgICAgICAgICAgaWYgKGUua2V5ID09PSB0aGlzLmRibmFtZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zeW5jaHJvZGF0YShmYWxzZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8g6Ieq5a6a5LmJIHN0b3JhZ2UgY2hhbmdlIOS6i+S7tueahOWbnuiwg+WHveaVsFxyXG4gICAgICAgIGNvbnN0IHN0b3JhZ2VjaGFuZ2VmbiA9IChlOiBDdXN0b21FdmVudEluaXQpID0+IHtcclxuICAgICAgICAgICAgaWYgKGUuZGV0YWlsICYmIGUuZGV0YWlsLmRibmFtZSA9PT0gdGhpcy5kYm5hbWUgJiYgZS5kZXRhaWwudXVpZCAhPT0gdGhpcy4jdXVpZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zeW5jaHJvZGF0YShmYWxzZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8g57uR5a6a55uR5ZCsXHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3N0b3JhZ2UnLCBzdG9yYWdlZm4pXHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoYCR7dGhpcy5kYnR5cGV9c3RvcmFnZWNoYW5nZWAsIHN0b3JhZ2VjaGFuZ2VmbilcclxuXHJcbiAgICAgICAgLy8g6ZSA5q+B5pe25Y+W5raI55uR5ZCs5LqL5Lu2XHJcbiAgICAgICAgdGhpcy5kZXN0b3J5Zm4ucHVzaCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdzdG9yYWdlJywgc3RvcmFnZWZuKVxyXG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihgJHt0aGlzLmRidHlwZX1zdG9yYWdlY2hhbmdlYCwgc3RvcmFnZWNoYW5nZWZuKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlkIzmraXlvZPliY3lrp7kvovkuI4gU3RvcmFnZSDkuK3nmoTmlbDmja5cclxuICAgICAqIEBwYXJhbSBpc1NhdmUgdHJ1ZTog5bCG5a6e5L6L57yT5a2Y5L+d5a2Y5YiwIFN0b3JhZ2Ug5Lit77ybZmFsc2U6IOWwhiBTdG9yYWdlIOS4reaVsOaNruWQjOatpeWIsOW9k+WJjeWunuS+i+S4rVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3luY2hyb2RhdGEoaXNTYXZlOiBib29sZWFuID0gdHJ1ZSkge1xyXG4gICAgICAgIGlmIChpc1NhdmUpIHtcclxuICAgICAgICAgICAgLy8g5bCG5b2T5YmN5a6e5L6L5Lit55qE5pWw5o2u5L+d5a2Y5Yiw57yT5a2Y5LitXHJcbiAgICAgICAgICAgIHRoaXMuI3N0b3JhZ2Uuc2V0SXRlbSh0aGlzLmRibmFtZSwgSlNPTi5zdHJpbmdpZnkodGhpcy4jZGF0YSkpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8g5bCG57yT5a2Y5Lit55qE5pWw5o2u5ZCM5q2l5Yiw5b2T5YmN5a6e5L6L5LitXHJcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLiNzdG9yYWdlLmdldEl0ZW0odGhpcy5kYm5hbWUpXHJcbiAgICAgICAgICAgIGlmIChkYXRhICYmIC9eXFx7LipcXH0kLy50ZXN0KGRhdGEpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiNkYXRhID0gSlNPTi5wYXJzZShkYXRhKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4jZGF0YSA9IHt9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliKTmlq3nvJPlrZjkuK3mmK/lkKbljIXlkKvor6XplK7lkI1cclxuICAgICAqIEBwYXJhbSBrZXkg6ZSu5ZCNXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBoYXMoa2V5OiBzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4ga2V5IGluIHRoaXMuI2RhdGFcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluaMh+WumumUruWQjeeahOaVsOaNrlxyXG4gICAgICogQHBhcmFtIGtleSDplK7lkI1cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldChrZXk6IHN0cmluZykge1xyXG4gICAgICAgIGlmICh0aGlzLmhhcyhrZXkpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiNkYXRhW2tleV1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGxcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa3u+WKoC/orr7nva7lgLxcclxuICAgICAqIEBwYXJhbSBrZXkg6ZSu5ZCNXHJcbiAgICAgKiBAcGFyYW0gdmFsdWUg5YC8XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXQoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLiNkYXRhW2tleV0gPSB2YWx1ZVxyXG4gICAgICAgIHRoaXMuc3luY2hyb2RhdGEodHJ1ZSlcclxuICAgICAgICB0aGlzLmRpc3BhdGNoKClcclxuICAgICAgICByZXR1cm4gdGhpc1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yig6Zmk5oyH5a6a6ZSu5ZCN5pWw5o2uXHJcbiAgICAgKiBAcGFyYW0ga2V5IOmcgOimgeiiq+WIoOmZpOeahOmUrlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVtb3ZlKGtleTogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaGFzKGtleSkpIHtcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMuI2RhdGFba2V5XVxyXG4gICAgICAgICAgICB0aGlzLnN5bmNocm9kYXRhKHRydWUpXHJcbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2goKVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpc1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5riF6Zmk5pWw5o2uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjbGVhcigpIHtcclxuICAgICAgICB0aGlzLiNkYXRhID0ge31cclxuICAgICAgICB0aGlzLiNzdG9yYWdlLnJlbW92ZUl0ZW0odGhpcy5kYm5hbWUpXHJcbiAgICAgICAgdGhpcy5kaXNwYXRjaCgpXHJcbiAgICAgICAgcmV0dXJuIHRoaXNcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmUgOavgeWunuS+i1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGVzdHJveSgpIHtcclxuICAgICAgICB0aGlzLmRlc3Rvcnlmbi5mb3JFYWNoKGZuID0+IGZuLmNhbGwodGhpcykpXHJcbiAgICAgICAgdGhpcy4jZGF0YSA9IHt9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlj5HluIMgc2Vzc2lvbnN0b3JhZ2VjaGFuZ2UvbG9jYWxzdG9yYWdlY2hhbmdlIOS6i+S7tlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGlzcGF0Y2goKSB7XHJcbiAgICAgICAgY29uc3QgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoYCR7dGhpcy5kYnR5cGV9c3RvcmFnZWNoYW5nZWAsIHtcclxuICAgICAgICAgICAgYnViYmxlczogdHJ1ZSxcclxuICAgICAgICAgICAgY2FuY2VsYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgZGV0YWlsOiB7XHJcbiAgICAgICAgICAgICAgICB1dWlkOiB0aGlzLiN1dWlkLFxyXG4gICAgICAgICAgICAgICAgZGJuYW1lOiB0aGlzLmRibmFtZSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KVxyXG4gICAgICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KGV2ZW50KVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5b+r5o235Yib5bu6IHNlc3Npb25TdG9yYWdlIOexu+Wei+aVsOaNruW6k+euoeeQhuWZqOWunuS+i1xyXG4gICAgICogQHBhcmFtIGRibmFtZSDmlbDmja7lupPlkI3np7BcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBzZXNzaW9uKGRibmFtZT86IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiBuZXcgU3RvcmUoJ3Nlc3Npb24nLCBkYm5hbWUpXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlv6vmjbfliJvlu7ogbG9jYWxTdG9yYWdlIOexu+Wei+aVsOaNruW6k+euoeeQhuWZqOWunuS+i1xyXG4gICAgICogQHBhcmFtIGRibmFtZSDmlbDmja7lupPlkI3np7BcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBsb2NhbChkYm5hbWU/OiBzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFN0b3JlKCdsb2NhbCcsIGRibmFtZSlcclxuICAgIH1cclxufVxyXG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFlQTtBQTZCQTtBQUFBO0FBQUE7QUFDQTtBQTVCQTtBQUNBO0FBRUE7QUFDQTtBQUlBO0FBQ0E7QUFJQTtBQUNBO0FBY0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBdENBO0FBQ0E7QUFDQTtBQUNBO0FBd0NBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUhBO0FBUUE7QUFDQTtBQUNBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQTFLQTtBQUNBO0FBREE7QSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/index.ts\n");

/***/ })

/******/ })["default"];
});