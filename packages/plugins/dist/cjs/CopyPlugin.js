"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _uuid = require("uuid");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } /*
                                                                                                                                                                                                                                                                                                                                                                                               * @Author: 秦少卫
                                                                                                                                                                                                                                                                                                                                                                                               * @Date: 2023-06-20 12:38:37
                                                                                                                                                                                                                                                                                                                                                                                               * @LastEditors: 秦少卫
                                                                                                                                                                                                                                                                                                                                                                                               * @LastEditTime: 2023-06-20 13:34:21
                                                                                                                                                                                                                                                                                                                                                                                               * @Description: 复制插件
                                                                                                                                                                                                                                                                                                                                                                                               */
var CopyPlugin = /*#__PURE__*/function () {
  function CopyPlugin(canvas, editor) {
    _classCallCheck(this, CopyPlugin);
    _defineProperty(this, "canvas", void 0);
    _defineProperty(this, "editor", void 0);
    _defineProperty(this, "hotkeys", ['ctrl+v', 'ctrl+c']);
    _defineProperty(this, "cache", void 0);
    this.canvas = canvas;
    this.editor = editor;
    this.cache = null;
  }

  // 多选对象复制
  _createClass(CopyPlugin, [{
    key: "_copyActiveSelection",
    value: function _copyActiveSelection(activeObject) {
      // 间距设置
      var grid = 10;
      var canvas = this.canvas;
      activeObject === null || activeObject === void 0 ? void 0 : activeObject.clone(function (cloned) {
        // 再次进行克隆，处理选择多个对象的情况
        cloned.clone(function (clonedObj) {
          canvas.discardActiveObject();
          if (clonedObj.left === undefined || clonedObj.top === undefined) return;
          // 将克隆的画布重新赋值
          clonedObj.canvas = canvas;
          // 设置位置信息
          clonedObj.set({
            left: clonedObj.left + grid,
            top: clonedObj.top + grid,
            evented: true,
            id: (0, _uuid.v4)()
          });
          clonedObj.forEachObject(function (obj) {
            obj.id = (0, _uuid.v4)();
            canvas.add(obj);
          });
          // 解决不可选择问题
          clonedObj.setCoords();
          canvas.setActiveObject(clonedObj);
          canvas.requestRenderAll();
        });
      });
    }

    // 单个对象复制
  }, {
    key: "_copyObject",
    value: function _copyObject(activeObject) {
      // 间距设置
      var grid = 10;
      var canvas = this.canvas;
      activeObject === null || activeObject === void 0 ? void 0 : activeObject.clone(function (cloned) {
        if (cloned.left === undefined || cloned.top === undefined) return;
        canvas.discardActiveObject();
        // 设置位置信息
        cloned.set({
          left: cloned.left + grid,
          top: cloned.top + grid,
          evented: true,
          id: (0, _uuid.v4)()
        });
        canvas.add(cloned);
        canvas.setActiveObject(cloned);
        canvas.requestRenderAll();
      });
    }

    // 复制元素
  }, {
    key: "clone",
    value: function clone(paramsActiveObeject) {
      var activeObject = paramsActiveObeject || this.canvas.getActiveObject();
      if (!activeObject) return;
      if ((activeObject === null || activeObject === void 0 ? void 0 : activeObject.type) === 'activeSelection') {
        this._copyActiveSelection(activeObject);
      } else {
        this._copyObject(activeObject);
      }
    }

    // 快捷键扩展回调
  }, {
    key: "hotkeyEvent",
    value: function hotkeyEvent(eventName, e) {
      if (eventName === 'ctrl+c' && e.type === 'keydown') {
        var activeObject = this.canvas.getActiveObject();
        this.cache = activeObject;
      }
      if (eventName === 'ctrl+v' && e.type === 'keydown') {
        if (this.cache) {
          this.clone(this.cache);
        }
      }
    }
  }, {
    key: "contextMenu",
    value: function contextMenu() {
      var _this = this;
      var activeObject = this.canvas.getActiveObject();
      if (activeObject) {
        return [{
          text: '复制',
          hotkey: 'Ctrl+V',
          disabled: false,
          onclick: function onclick() {
            return _this.clone();
          }
        }];
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      console.log('pluginDestroy');
    }
  }]);
  return CopyPlugin;
}();
_defineProperty(CopyPlugin, "pluginName", 'CopyPlugin');
_defineProperty(CopyPlugin, "apis", ['clone']);
var _default = CopyPlugin;
exports.default = _default;