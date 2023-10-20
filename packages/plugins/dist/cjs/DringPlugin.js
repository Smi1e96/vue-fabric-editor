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
 * @Date: 2023-05-19 08:31:34
 * @LastEditors: 秦少卫
 * @LastEditTime: 2023-06-27 23:20:25
 * @Description: 拖拽插件
 */
var DringPlugin = /*#__PURE__*/function () {
  function DringPlugin(canvas, editor) {
    _classCallCheck(this, DringPlugin);
    _defineProperty(this, "canvas", void 0);
    _defineProperty(this, "editor", void 0);
    _defineProperty(this, "defautOption", {});
    _defineProperty(this, "hotkeys", ['space']);
    _defineProperty(this, "dragMode", false);
    this.canvas = canvas;
    this.editor = editor;
    this.dragMode = false;
    this.init();
  }
  _createClass(DringPlugin, [{
    key: "init",
    value: function init() {
      this._initDring();
    }
  }, {
    key: "startDring",
    value: function startDring() {
      this.dragMode = true;
      this.canvas.defaultCursor = 'grab';
      this.editor.emit('startDring');
      this.canvas.renderAll();
    }
  }, {
    key: "endDring",
    value: function endDring() {
      this.dragMode = false;
      this.canvas.defaultCursor = 'default';
      this.canvas.isDragging = false;
      this.editor.emit('endDring');
      this.canvas.renderAll();
    }

    // 拖拽模式;
  }, {
    key: "_initDring",
    value: function _initDring() {
      var This = this;
      this.canvas.on('mouse:down', function (opt) {
        var evt = opt.e;
        if (evt.altKey || This.dragMode) {
          This.canvas.defaultCursor = 'grabbing';
          This.canvas.discardActiveObject();
          This._setDring();
          this.selection = false;
          this.isDragging = true;
          this.lastPosX = evt.clientX;
          this.lastPosY = evt.clientY;
          this.requestRenderAll();
        }
      });
      this.canvas.on('mouse:move', function (opt) {
        if (this.isDragging) {
          This.canvas.discardActiveObject();
          This.canvas.defaultCursor = 'grabbing';
          var e = opt.e;
          if (!this.viewportTransform) return;
          var vpt = this.viewportTransform;
          vpt[4] += e.clientX - this.lastPosX;
          vpt[5] += e.clientY - this.lastPosY;
          this.lastPosX = e.clientX;
          this.lastPosY = e.clientY;
          this.requestRenderAll();
        }
      });
      this.canvas.on('mouse:up', function () {
        if (!this.viewportTransform) return;
        this.setViewportTransform(this.viewportTransform);
        this.isDragging = false;
        this.selection = true;
        this.getObjects().forEach(function (obj) {
          if (obj.id !== 'workspace' && obj.hasControls) {
            obj.selectable = true;
          }
        });
        This.canvas.defaultCursor = 'default';
        this.requestRenderAll();
      });
    }
  }, {
    key: "_setDring",
    value: function _setDring() {
      this.canvas.selection = false;
      this.canvas.defaultCursor = 'grab';
      this.canvas.getObjects().forEach(function (obj) {
        obj.selectable = false;
      });
      this.canvas.requestRenderAll();
    }
  }, {
    key: "destroy",
    value: function destroy() {
      console.log('pluginDestroy');
    }

    // 快捷键扩展回调
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }, {
    key: "hotkeyEvent",
    value: function hotkeyEvent(_eventName, e) {
      if (e.code === 'Space' && e.type === 'keydown') {
        if (!this.dragMode) {
          this.startDring();
        }
      }
      if (e.code === 'Space' && e.type === 'keyup') {
        this.endDring();
      }
    }
  }]);
  return DringPlugin;
}();
_defineProperty(DringPlugin, "pluginName", 'DringPlugin');
_defineProperty(DringPlugin, "events", ['startDring', 'endDring']);
_defineProperty(DringPlugin, "apis", ['startDring', 'endDring']);
var _default = DringPlugin;
exports.default = _default;