function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/*
 * @Author: 秦少卫
 * @Date: 2023-06-13 23:07:04
 * @LastEditors: 秦少卫
 * @LastEditTime: 2023-06-13 23:10:52
 * @Description: 控制条插件
 */

// 定义旋转光标样式，根据转动角度设定光标旋转
function rotateIcon(angle) {
  return "url(\"data:image/svg+xml,%3Csvg height='18' width='18' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg' style='color: black;'%3E%3Cg fill='none' transform='rotate(".concat(angle, " 16 16)'%3E%3Cpath d='M22.4484 0L32 9.57891L22.4484 19.1478V13.1032C17.6121 13.8563 13.7935 17.6618 13.0479 22.4914H19.2141L9.60201 32.01L0 22.4813H6.54912C7.36524 14.1073 14.0453 7.44023 22.4484 6.61688V0Z' fill='white'/%3E%3Cpath d='M24.0605 3.89587L29.7229 9.57896L24.0605 15.252V11.3562C17.0479 11.4365 11.3753 17.0895 11.3048 24.0879H15.3048L9.60201 29.7308L3.90932 24.0879H8.0806C8.14106 15.3223 15.2645 8.22345 24.0605 8.14313V3.89587Z' fill='black'/%3E%3C/g%3E%3C/svg%3E \") 12 12,crosshair");
}
var ControlsRotatePlugin = /*#__PURE__*/function () {
  function ControlsRotatePlugin(canvas, editor) {
    _classCallCheck(this, ControlsRotatePlugin);
    _defineProperty(this, "canvas", void 0);
    _defineProperty(this, "editor", void 0);
    this.canvas = canvas;
    this.editor = editor;
    this.init();
  }
  _createClass(ControlsRotatePlugin, [{
    key: "init",
    value: function init() {
      var canvas = this.canvas;
      // 添加旋转控制响应区域
      fabric.Object.prototype.controls.mtr = new fabric.Control({
        x: -0.5,
        y: -0.5,
        offsetY: -10,
        offsetX: -10,
        rotate: 20,
        actionName: 'rotate',
        actionHandler: fabric.controlsUtils.rotationWithSnapping,
        render: function render() {
          return '';
        }
      });
      // ↖左上
      fabric.Object.prototype.controls.mtr2 = new fabric.Control({
        x: 0.5,
        y: -0.5,
        offsetY: -10,
        offsetX: 10,
        rotate: 20,
        actionName: 'rotate',
        actionHandler: fabric.controlsUtils.rotationWithSnapping,
        render: function render() {
          return '';
        }
      }); // ↗右上
      fabric.Object.prototype.controls.mtr3 = new fabric.Control({
        x: 0.5,
        y: 0.5,
        offsetY: 10,
        offsetX: 10,
        rotate: 20,
        actionName: 'rotate',
        actionHandler: fabric.controlsUtils.rotationWithSnapping,
        render: function render() {
          return '';
        }
      }); // ↘右下
      fabric.Object.prototype.controls.mtr4 = new fabric.Control({
        x: -0.5,
        y: 0.5,
        offsetY: 10,
        offsetX: -10,
        rotate: 20,
        actionName: 'rotate',
        actionHandler: fabric.controlsUtils.rotationWithSnapping,
        render: function render() {
          return '';
        }
      }); // ↙左下

      // 渲染时，执行
      canvas.on('after:render', function () {
        var _activeObj$angle;
        var activeObj = canvas.getActiveObject();
        var angle = activeObj === null || activeObj === void 0 ? void 0 : (_activeObj$angle = activeObj.angle) === null || _activeObj$angle === void 0 ? void 0 : _activeObj$angle.toFixed(2);
        if (angle !== undefined) {
          fabric.Object.prototype.controls.mtr.cursorStyle = rotateIcon(Number(angle));
          fabric.Object.prototype.controls.mtr2.cursorStyle = rotateIcon(Number(angle) + 90);
          fabric.Object.prototype.controls.mtr3.cursorStyle = rotateIcon(Number(angle) + 180);
          fabric.Object.prototype.controls.mtr4.cursorStyle = rotateIcon(Number(angle) + 270);
        }
      });

      // 旋转时，实时更新旋转控制图标
      canvas.on('object:rotating', function (event) {
        var _canvas$getActiveObje, _canvas$getActiveObje2, _event$transform;
        var body = canvas.lowerCanvasEl.nextSibling;
        var angle = (_canvas$getActiveObje = canvas.getActiveObject()) === null || _canvas$getActiveObje === void 0 ? void 0 : (_canvas$getActiveObje2 = _canvas$getActiveObje.angle) === null || _canvas$getActiveObje2 === void 0 ? void 0 : _canvas$getActiveObje2.toFixed(2);
        if (angle === undefined) return;
        switch ((_event$transform = event.transform) === null || _event$transform === void 0 ? void 0 : _event$transform.corner) {
          case 'mtr':
            body.style.cursor = rotateIcon(Number(angle));
            break;
          case 'mtr2':
            body.style.cursor = rotateIcon(Number(angle) + 90);
            break;
          case 'mtr3':
            body.style.cursor = rotateIcon(Number(angle) + 180);
            break;
          case 'mtr4':
            body.style.cursor = rotateIcon(Number(angle) + 270);
            break;
          default:
            break;
        } // 设置四角旋转光标
      });
    }
  }, {
    key: "destroy",
    value: function destroy() {
      console.log('pluginDestroy');
    }
  }]);
  return ControlsRotatePlugin;
}();
_defineProperty(ControlsRotatePlugin, "pluginName", 'ControlsRotatePlugin');
export default ControlsRotatePlugin;
import { fabric } from 'fabric';