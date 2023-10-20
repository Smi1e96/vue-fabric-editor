"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/*
 * @Author: 秦少卫
 * @Date: 2023-06-20 12:57:35
 * @LastEditors: 秦少卫
 * @LastEditTime: 2023-06-27 23:10:02
 * @Description: 删除快捷键
 */
// import { v4 as uuid } from 'uuid';
var DeleteHotKeyPlugin = /*#__PURE__*/function () {
  function DeleteHotKeyPlugin(canvas, editor) {
    _classCallCheck(this, DeleteHotKeyPlugin);
    _defineProperty(this, "canvas", void 0);
    _defineProperty(this, "editor", void 0);
    _defineProperty(this, "hotkeys", ['backspace']);
    this.canvas = canvas;
    this.editor = editor;
  }

  // 快捷键扩展回调
  _createClass(DeleteHotKeyPlugin, [{
    key: "hotkeyEvent",
    value: function hotkeyEvent(eventName, e) {
      if (e.type === 'keydown' && eventName === 'backspace') {
        this.del();
      }
    }
  }, {
    key: "del",
    value: function del() {
      var canvas = this.canvas;
      var activeObject = canvas.getActiveObjects();
      if (activeObject) {
        activeObject.map(function (item) {
          return canvas.remove(item);
        });
        canvas.requestRenderAll();
        canvas.discardActiveObject();
      }
    }
  }, {
    key: "contextMenu",
    value: function contextMenu() {
      var _this = this;
      var activeObject = this.canvas.getActiveObject();
      if (activeObject) {
        return [null, {
          text: '删除',
          hotkey: 'Ctrl+V',
          disabled: false,
          onclick: function onclick() {
            return _this.del();
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
  return DeleteHotKeyPlugin;
}();
_defineProperty(DeleteHotKeyPlugin, "pluginName", 'DeleteHotKeyPlugin');
_defineProperty(DeleteHotKeyPlugin, "apis", ['del']);
var _default = DeleteHotKeyPlugin;
exports.default = _default;