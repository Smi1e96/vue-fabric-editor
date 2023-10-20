"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _uuid = require("uuid");
var _fabric = require("fabric");
var _Arrow = _interopRequireDefault(require("./objects/Arrow"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } /*
                                                                                                                                                                                                                                                                                                                                                                                               * @Author: 秦少卫
                                                                                                                                                                                                                                                                                                                                                                                               * @Date: 2023-06-21 22:09:36
                                                                                                                                                                                                                                                                                                                                                                                               * @LastEditors: 秦少卫
                                                                                                                                                                                                                                                                                                                                                                                               * @LastEditTime: 2023-06-22 16:07:52
                                                                                                                                                                                                                                                                                                                                                                                               * @Description: file content
                                                                                                                                                                                                                                                                                                                                                                                               */
var DrawLinePlugin = /*#__PURE__*/function () {
  function DrawLinePlugin(canvas, editor) {
    _classCallCheck(this, DrawLinePlugin);
    _defineProperty(this, "canvas", void 0);
    _defineProperty(this, "editor", void 0);
    _defineProperty(this, "isDrawingLineMode", void 0);
    _defineProperty(this, "isArrow", void 0);
    _defineProperty(this, "lineToDraw", void 0);
    _defineProperty(this, "pointer", void 0);
    _defineProperty(this, "pointerPoints", void 0);
    _defineProperty(this, "isDrawingLine", void 0);
    this.canvas = canvas;
    this.editor = editor;
    this.isDrawingLine = false;
    this.isDrawingLineMode = false;
    this.isArrow = false;
    this.lineToDraw = null;
    this.pointer = null;
    this.pointerPoints = null;
    this.init();
  }
  _createClass(DrawLinePlugin, [{
    key: "init",
    value: function init() {
      var _this = this;
      var canvas = this.canvas;
      canvas.on('mouse:down', function (o) {
        if (!_this.isDrawingLineMode) return;
        canvas.discardActiveObject();
        canvas.getObjects().forEach(function (obj) {
          obj.selectable = false;
          obj.hasControls = false;
        });
        canvas.requestRenderAll();
        _this.isDrawingLine = true;
        _this.pointer = canvas.getPointer(o.e);
        _this.pointerPoints = [_this.pointer.x, _this.pointer.y, _this.pointer.x, _this.pointer.y];
        var NodeHandler = _this.isArrow ? _Arrow.default : _fabric.fabric.Line;
        _this.lineToDraw = new NodeHandler(_this.pointerPoints, {
          strokeWidth: 2,
          stroke: '#000000',
          id: (0, _uuid.v4)()
        });
        _this.lineToDraw.selectable = false;
        _this.lineToDraw.evented = false;
        _this.lineToDraw.strokeUniform = true;
        canvas.add(_this.lineToDraw);
      });
      canvas.on('mouse:move', function (o) {
        if (!_this.isDrawingLine) return;
        canvas.discardActiveObject();
        var activeObject = canvas.getActiveObject();
        if (activeObject) return;
        _this.pointer = canvas.getPointer(o.e);
        if (o.e.shiftKey) {
          // calc angle
          var startX = _this.pointerPoints[0];
          var startY = _this.pointerPoints[1];
          var x2 = _this.pointer.x - startX;
          var y2 = _this.pointer.y - startY;
          var r = Math.sqrt(x2 * x2 + y2 * y2);
          var angle = Math.atan2(y2, x2) / Math.PI * 180;
          //@ts-ignore
          angle = parseInt((angle + 7.5) % 360 / 15) * 15;
          var cosx = r * Math.cos(angle * Math.PI / 180);
          var sinx = r * Math.sin(angle * Math.PI / 180);
          _this.lineToDraw.set({
            x2: cosx + startX,
            y2: sinx + startY
          });
        } else {
          _this.lineToDraw.set({
            x2: _this.pointer.x,
            y2: _this.pointer.y
          });
        }
        canvas.renderAll();
      });
      canvas.on('mouse:up', function () {
        if (!_this.isDrawingLine) return;
        _this.lineToDraw.setCoords();
        _this.isDrawingLine = false;
        canvas.discardActiveObject();
      });
    }
  }, {
    key: "setArrow",
    value: function setArrow(params) {
      this.isArrow = params;
    }
  }, {
    key: "setMode",
    value: function setMode(params) {
      this.isDrawingLineMode = params;
      if (!this.isDrawingLineMode) {
        this.endRest();
      }
    }
  }, {
    key: "endRest",
    value: function endRest() {
      this.canvas.getObjects().forEach(function (obj) {
        if (obj.id !== 'workspace') {
          obj.selectable = true;
          obj.hasControls = true;
        }
      });
    }
  }, {
    key: "destroy",
    value: function destroy() {
      console.log('pluginDestroy');
    }
  }]);
  return DrawLinePlugin;
}();
_defineProperty(DrawLinePlugin, "pluginName", 'DrawLinePlugin');
_defineProperty(DrawLinePlugin, "apis", ['setArrow', 'setMode']);
var _default = DrawLinePlugin;
exports.default = _default;