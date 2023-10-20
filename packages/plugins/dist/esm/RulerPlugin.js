function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/*
 * @Author: 秦少卫
 * @Date: 2023-07-04 23:45:49
 * @LastEditors: 秦少卫
 * @LastEditTime: 2023-07-05 00:26:39
 * @Description: 标尺插件
 */

// import { throttle } from 'lodash-es';

import initRuler from "./ruler";
var RulerPlugin = /*#__PURE__*/function () {
  function RulerPlugin(canvas, editor) {
    _classCallCheck(this, RulerPlugin);
    _defineProperty(this, "canvas", void 0);
    _defineProperty(this, "editor", void 0);
    _defineProperty(this, "ruler", void 0);
    this.canvas = canvas;
    this.editor = editor;
    this.init();
  }
  _createClass(RulerPlugin, [{
    key: "hookSaveBefore",
    value: function hookSaveBefore() {
      var _this = this;
      return new Promise(function (resolve) {
        _this.hideGuideline();
        resolve(true);
      });
    }
  }, {
    key: "hookSaveAfter",
    value: function hookSaveAfter() {
      var _this2 = this;
      return new Promise(function (resolve) {
        _this2.showGuideline();
        resolve(true);
      });
    }
  }, {
    key: "init",
    value: function init() {
      this.ruler = initRuler(this.canvas);
    }
  }, {
    key: "hideGuideline",
    value: function hideGuideline() {
      this.ruler.hideGuideline();
    }
  }, {
    key: "showGuideline",
    value: function showGuideline() {
      this.ruler.showGuideline();
    }
  }, {
    key: "rulerEnable",
    value: function rulerEnable() {
      this.ruler.enable();
    }
  }, {
    key: "rulerDisable",
    value: function rulerDisable() {
      this.ruler.disable();
    }
  }, {
    key: "destroy",
    value: function destroy() {
      console.log('pluginDestroy');
    }
  }]);
  return RulerPlugin;
}();
_defineProperty(RulerPlugin, "pluginName", 'RulerPlugin');
// static events = ['sizeChange'];
_defineProperty(RulerPlugin, "apis", ['hideGuideline', 'showGuideline', 'rulerEnable', 'rulerDisable']);
export default RulerPlugin;