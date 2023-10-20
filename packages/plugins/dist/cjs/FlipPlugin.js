"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _types = require("./utils/event/types");
var _useHooks = require("./utils/useHooks");
var _notifier = _interopRequireDefault(require("./utils/event/notifier"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var FlipPlugin = /*#__PURE__*/function () {
  function FlipPlugin(canvas, editor) {
    _classCallCheck(this, FlipPlugin);
    _defineProperty(this, "canvas", void 0);
    _defineProperty(this, "editor", void 0);
    _defineProperty(this, "selectedMode", void 0);
    this.canvas = canvas;
    this.editor = editor;
    this.selectedMode = (0, _useHooks.ref)(_types.SelectMode.EMPTY);
    this.init();
  }
  _createClass(FlipPlugin, [{
    key: "init",
    value: function init() {
      var _this = this;
      _notifier.default.on(_types.SelectEvent.ONE, function () {
        return _this.selectedMode.value = _types.SelectMode.ONE;
      });
      _notifier.default.on(_types.SelectEvent.MULTI, function () {
        return _this.selectedMode.value = _types.SelectMode.MULTI;
      });
      _notifier.default.on(_types.SelectEvent.CANCEL, function () {
        return _this.selectedMode.value = _types.SelectMode.EMPTY;
      });
    }
  }, {
    key: "flip",
    value: function flip(type) {
      var activeObject = this.canvas.getActiveObject();
      if (activeObject) {
        activeObject.set("flip".concat(type), !activeObject["flip".concat(type)]).setCoords();
        this.canvas.requestRenderAll();
      }
    }
  }, {
    key: "contextMenu",
    value: function contextMenu() {
      var _this2 = this;
      if (this.selectedMode.value === _types.SelectMode.ONE) {
        return [{
          text: '翻转',
          hotkey: '❯',
          subitems: [{
            text: '水平翻转',
            hotkey: '|',
            onclick: function onclick() {
              return _this2.flip('X');
            }
          }, {
            text: '垂直翻转',
            hotkey: '-',
            onclick: function onclick() {
              return _this2.flip('Y');
            }
          }]
        }];
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      console.log('pluginDestroy');
    }
  }]);
  return FlipPlugin;
}();
exports.default = FlipPlugin;
_defineProperty(FlipPlugin, "pluginName", 'FlipPlugin');
_defineProperty(FlipPlugin, "apis", ['flip']);