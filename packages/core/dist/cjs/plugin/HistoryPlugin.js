"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _useHooks = require("../utils/useHooks");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } /* eslint-disable @typescript-eslint/no-explicit-any */ /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                       * @Author: 秦少卫
                                                                                                                                                                                                                                                                                                                                                                                                                                                       * @Date: 2023-06-20 13:06:31
                                                                                                                                                                                                                                                                                                                                                                                                                                                       * @LastEditors: 秦少卫
                                                                                                                                                                                                                                                                                                                                                                                                                                                       * @LastEditTime: 2023-07-04 23:37:07
                                                                                                                                                                                                                                                                                                                                                                                                                                                       * @Description: 历史记录插件
                                                                                                                                                                                                                                                                                                                                                                                                                                                       */
// import { v4 as uuid } from 'uuid';
var HistoryPlugin = /*#__PURE__*/function () {
  function HistoryPlugin(canvas, editor) {
    var _this = this;
    _classCallCheck(this, HistoryPlugin);
    _defineProperty(this, "canvas", void 0);
    _defineProperty(this, "editor", void 0);
    _defineProperty(this, "hotkeys", ['ctrl+z']);
    _defineProperty(this, "history", void 0);
    _defineProperty(this, "renderCanvas", function () {
      _this.history.pause();
      _this.canvas.clear();
      _this.canvas.loadFromJSON(_this.history.source.value, function () {
        _this.canvas.renderAll();
        _this.history.resume();
      });
    });
    this.canvas = canvas;
    this.editor = editor;
    this._init();
  }
  _createClass(HistoryPlugin, [{
    key: "_init",
    value: function _init() {
      var _this2 = this;
      this.history = (0, _useHooks.useRefHistory)({
        capacity: 50
      });
      this.canvas.on({
        'object:added': function objectAdded(event) {
          return _this2._save(event);
        },
        'object:modified': function objectModified(event) {
          return _this2._save(event);
        },
        'selection:updated': function selectionUpdated(event) {
          return _this2._save(event);
        }
      });
    }
  }, {
    key: "getHistory",
    value: function getHistory() {
      return this.history;
    }
  }, {
    key: "_save",
    value: function _save(event) {
      // 过滤选择元素事件
      var isSelect = event.action === undefined && event.e;
      if (isSelect || !this.canvas) return;
      var workspace = this.canvas.getObjects().find(function (item) {
        return item.id === 'workspace';
      });
      if (!workspace) {
        return;
      }
      if (this.history.isTracking.value) {
        //@ts-ignore
        this.history.source.value = this.editor.getJson();
      }
    }
  }, {
    key: "undo",
    value: function undo() {
      if (this.history.canUndo.value) {
        this.renderCanvas();
        this.history.undo();
      }
    }
  }, {
    key: "redo",
    value: function redo() {
      this.history.redo();
      this.renderCanvas();
    }
  }, {
    key: "hotkeyEvent",
    value:
    // 快捷键扩展回调
    function hotkeyEvent(eventName, e) {
      if (eventName === 'ctrl+z' && e.type === 'keydown') {
        this.undo();
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      console.log('pluginDestroy');
    }
  }]);
  return HistoryPlugin;
}();
_defineProperty(HistoryPlugin, "pluginName", 'HistoryPlugin');
_defineProperty(HistoryPlugin, "apis", ['undo', 'redo', 'getHistory']);
_defineProperty(HistoryPlugin, "events", ['historyInitSuccess']);
var _default = HistoryPlugin;
exports.default = _default;