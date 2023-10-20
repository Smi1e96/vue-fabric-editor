"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _fabric = require("fabric");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } /*
                                                                                                                                                                                                                                                                                                                                                                                               * @Author: 秦少卫
                                                                                                                                                                                                                                                                                                                                                                                               * @Date: 2023-06-15 22:49:42
                                                                                                                                                                                                                                                                                                                                                                                               * @LastEditors: 秦少卫
                                                                                                                                                                                                                                                                                                                                                                                               * @LastEditTime: 2023-06-27 23:10:47
                                                                                                                                                                                                                                                                                                                                                                                               * @Description: 居中对齐插件
                                                                                                                                                                                                                                                                                                                                                                                               */
var CenterAlignPlugin = /*#__PURE__*/function () {
  // public hotkeys: string[] = ['space'];
  function CenterAlignPlugin(canvas, editor) {
    _classCallCheck(this, CenterAlignPlugin);
    _defineProperty(this, "canvas", void 0);
    _defineProperty(this, "editor", void 0);
    this.canvas = canvas;
    this.editor = editor;
  }
  _createClass(CenterAlignPlugin, [{
    key: "center",
    value: function center(workspace, object) {
      var center = workspace.getCenterPoint();
      return this.canvas._centerObject(object, center);
    }
  }, {
    key: "centerV",
    value: function centerV(workspace, object) {
      return this.canvas._centerObject(object, new _fabric.fabric.Point(object.getCenterPoint().x, workspace.getCenterPoint().y));
    }
  }, {
    key: "centerH",
    value: function centerH(workspace, object) {
      return this.canvas._centerObject(object, new _fabric.fabric.Point(workspace.getCenterPoint().x, object.getCenterPoint().y));
    }
  }, {
    key: "position",
    value: function position(name) {
      var anignType = ['centerH', 'center', 'centerV'];
      var activeObject = this.canvas.getActiveObject();
      if (anignType.includes(name) && activeObject) {
        //@ts-ignore
        var defaultWorkspace = this.canvas.getObjects().find(function (item) {
          return item.id === 'workspace';
        });
        if (defaultWorkspace) {
          console.log(this[name]);
          this[name](defaultWorkspace, activeObject);
        }
        this.canvas.renderAll();
      }
    }
  }, {
    key: "contextMenu",
    value: function contextMenu() {
      var _this = this;
      var activeObject = this.canvas.getActiveObject();
      if (activeObject) {
        return [{
          text: '水平垂直居中',
          hotkey: 'Ctrl+V',
          disabled: false,
          onclick: function onclick() {
            return _this.position('center');
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
  return CenterAlignPlugin;
}();
_defineProperty(CenterAlignPlugin, "pluginName", 'CenterAlignPlugin');
_defineProperty(CenterAlignPlugin, "apis", ['centerH', 'center', 'position', 'centerV']);
var _default = CenterAlignPlugin;
exports.default = _default;