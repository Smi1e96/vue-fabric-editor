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
 * @Date: 2023-06-15 23:23:18
 * @LastEditors: 秦少卫
 * @LastEditTime: 2023-06-27 23:07:57
 * @Description: 图层调整插件
 */
var LayerPlugin = /*#__PURE__*/function () {
  function LayerPlugin(canvas, editor) {
    _classCallCheck(this, LayerPlugin);
    _defineProperty(this, "canvas", void 0);
    _defineProperty(this, "editor", void 0);
    this.canvas = canvas;
    this.editor = editor;
  }
  _createClass(LayerPlugin, [{
    key: "_getWorkspace",
    value: function _getWorkspace() {
      return this.canvas.getObjects().find(function (item) {
        return item.id === 'workspace';
      });
    }
  }, {
    key: "_workspaceSendToBack",
    value: function _workspaceSendToBack() {
      var workspace = this._getWorkspace();
      workspace && workspace.sendToBack();
    }
  }, {
    key: "up",
    value: function up() {
      var actives = this.canvas.getActiveObjects();
      if (actives && actives.length === 1) {
        var activeObject = this.canvas.getActiveObjects()[0];
        activeObject && activeObject.bringForward();
        this.canvas.renderAll();
        this._workspaceSendToBack();
      }
    }
  }, {
    key: "upTop",
    value: function upTop() {
      var actives = this.canvas.getActiveObjects();
      if (actives && actives.length === 1) {
        var activeObject = this.canvas.getActiveObjects()[0];
        activeObject && activeObject.bringToFront();
        this.canvas.renderAll();
        console.log(this);
        this._workspaceSendToBack();
      }
    }
  }, {
    key: "down",
    value: function down() {
      var actives = this.canvas.getActiveObjects();
      if (actives && actives.length === 1) {
        var activeObject = this.canvas.getActiveObjects()[0];
        activeObject && activeObject.sendBackwards();
        this.canvas.renderAll();
        this._workspaceSendToBack();
      }
    }
  }, {
    key: "downTop",
    value: function downTop() {
      var actives = this.canvas.getActiveObjects();
      if (actives && actives.length === 1) {
        var activeObject = this.canvas.getActiveObjects()[0];
        activeObject && activeObject.sendToBack();
        this.canvas.renderAll();
        this._workspaceSendToBack();
      }
    }
  }, {
    key: "contextMenu",
    value: function contextMenu() {
      var _this = this;
      var activeObject = this.canvas.getActiveObject();
      if (activeObject) {
        return [{
          text: '图层管理',
          hotkey: '❯',
          subitems: [{
            text: '上一个',
            hotkey: 'key',
            onclick: function onclick() {
              return _this.up();
            }
          }, {
            text: '下一个',
            hotkey: 'key',
            onclick: function onclick() {
              return _this.down();
            }
          }, {
            text: '置顶',
            hotkey: 'key',
            onclick: function onclick() {
              return _this.upTop();
            }
          }, {
            text: '置底',
            hotkey: 'key',
            onclick: function onclick() {
              return _this.downTop();
            }
          }]
        }];
        // return [{ text: '复制', hotkey: 'Ctrl+V', disabled: false, onclick: () => this.clone() }];
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      console.log('pluginDestroy');
    }
  }]);
  return LayerPlugin;
}();
_defineProperty(LayerPlugin, "pluginName", 'LayerPlugin');
_defineProperty(LayerPlugin, "apis", ['up', 'upTop', 'down', 'downTop']);
var _default = LayerPlugin;
exports.default = _default;