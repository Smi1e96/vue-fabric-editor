"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _fabric = require("fabric");
var _middlecontrol = _interopRequireDefault(require("../assets/editor/middlecontrol.svg"));
var _middlecontrolhoz = _interopRequireDefault(require("../assets/editor/middlecontrolhoz.svg"));
var _edgecontrol = _interopRequireDefault(require("../assets/editor/edgecontrol.svg"));
var _rotateicon = _interopRequireDefault(require("../assets/editor/rotateicon.svg"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } /*
                                                                                                                                                                                                                                                                                                                                                                                               * @Author: 秦少卫
                                                                                                                                                                                                                                                                                                                                                                                               * @Date: 2023-06-13 23:00:43
                                                                                                                                                                                                                                                                                                                                                                                               * @LastEditors: 秦少卫
                                                                                                                                                                                                                                                                                                                                                                                               * @LastEditTime: 2023-06-13 23:09:59
                                                                                                                                                                                                                                                                                                                                                                                               * @Description: 控制条插件
                                                                                                                                                                                                                                                                                                                                                                                               */
/**
 * 实际场景: 在进行某个对象缩放的时候，由于fabricjs默认精度使用的是toFixed(2)。
 * 此处为了缩放的精度更准确一些，因此将NUM_FRACTION_DIGITS默认值改为4，即toFixed(4).
 */
_fabric.fabric.Object.NUM_FRACTION_DIGITS = 4;
function drawImg(ctx, left, top, img, wSize, hSize, angle) {
  if (angle === undefined) return;
  ctx.save();
  ctx.translate(left, top);
  ctx.rotate(_fabric.fabric.util.degreesToRadians(angle));
  ctx.drawImage(img, -wSize / 2, -hSize / 2, wSize, hSize);
  ctx.restore();
}

// 中间横杠
function intervalControl() {
  var verticalImgIcon = document.createElement('img');
  verticalImgIcon.src = _middlecontrol.default;
  var horizontalImgIcon = document.createElement('img');
  horizontalImgIcon.src = _middlecontrolhoz.default;
  function renderIcon(ctx, left, top, _styleOverride, fabricObject) {
    drawImg(ctx, left, top, verticalImgIcon, 20, 25, fabricObject.angle);
  }
  function renderIconHoz(ctx, left, top, _styleOverride, fabricObject) {
    drawImg(ctx, left, top, horizontalImgIcon, 25, 20, fabricObject.angle);
  }
  // 中间横杠
  _fabric.fabric.Object.prototype.controls.ml = new _fabric.fabric.Control({
    x: -0.5,
    y: 0,
    offsetX: -1,
    cursorStyleHandler: _fabric.fabric.controlsUtils.scaleSkewCursorStyleHandler,
    actionHandler: _fabric.fabric.controlsUtils.scalingXOrSkewingY,
    getActionName: _fabric.fabric.controlsUtils.scaleOrSkewActionName,
    render: renderIcon
  });
  _fabric.fabric.Object.prototype.controls.mr = new _fabric.fabric.Control({
    x: 0.5,
    y: 0,
    offsetX: 1,
    cursorStyleHandler: _fabric.fabric.controlsUtils.scaleSkewCursorStyleHandler,
    actionHandler: _fabric.fabric.controlsUtils.scalingXOrSkewingY,
    getActionName: _fabric.fabric.controlsUtils.scaleOrSkewActionName,
    render: renderIcon
  });
  _fabric.fabric.Object.prototype.controls.mb = new _fabric.fabric.Control({
    x: 0,
    y: 0.5,
    offsetY: 1,
    cursorStyleHandler: _fabric.fabric.controlsUtils.scaleSkewCursorStyleHandler,
    actionHandler: _fabric.fabric.controlsUtils.scalingYOrSkewingX,
    getActionName: _fabric.fabric.controlsUtils.scaleOrSkewActionName,
    render: renderIconHoz
  });
  _fabric.fabric.Object.prototype.controls.mt = new _fabric.fabric.Control({
    x: 0,
    y: -0.5,
    offsetY: -1,
    cursorStyleHandler: _fabric.fabric.controlsUtils.scaleSkewCursorStyleHandler,
    actionHandler: _fabric.fabric.controlsUtils.scalingYOrSkewingX,
    getActionName: _fabric.fabric.controlsUtils.scaleOrSkewActionName,
    render: renderIconHoz
  });
}

// 顶点
function peakControl() {
  var img = document.createElement('img');
  img.src = _edgecontrol.default;
  function renderIconEdge(ctx, left, top, _styleOverride, fabricObject) {
    drawImg(ctx, left, top, img, 25, 25, fabricObject.angle);
  }
  // 四角图标
  _fabric.fabric.Object.prototype.controls.tl = new _fabric.fabric.Control({
    x: -0.5,
    y: -0.5,
    cursorStyleHandler: _fabric.fabric.controlsUtils.scaleCursorStyleHandler,
    actionHandler: _fabric.fabric.controlsUtils.scalingEqually,
    render: renderIconEdge
  });
  _fabric.fabric.Object.prototype.controls.bl = new _fabric.fabric.Control({
    x: -0.5,
    y: 0.5,
    cursorStyleHandler: _fabric.fabric.controlsUtils.scaleCursorStyleHandler,
    actionHandler: _fabric.fabric.controlsUtils.scalingEqually,
    render: renderIconEdge
  });
  _fabric.fabric.Object.prototype.controls.tr = new _fabric.fabric.Control({
    x: 0.5,
    y: -0.5,
    cursorStyleHandler: _fabric.fabric.controlsUtils.scaleCursorStyleHandler,
    actionHandler: _fabric.fabric.controlsUtils.scalingEqually,
    render: renderIconEdge
  });
  _fabric.fabric.Object.prototype.controls.br = new _fabric.fabric.Control({
    x: 0.5,
    y: 0.5,
    cursorStyleHandler: _fabric.fabric.controlsUtils.scaleCursorStyleHandler,
    actionHandler: _fabric.fabric.controlsUtils.scalingEqually,
    render: renderIconEdge
  });
}
// 删除
function deleteControl(canvas) {
  var deleteIcon = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";
  var delImg = document.createElement('img');
  delImg.src = deleteIcon;
  function renderDelIcon(ctx, left, top, _styleOverride, fabricObject) {
    drawImg(ctx, left, top, delImg, 24, 24, fabricObject.angle);
  }

  // 删除选中元素
  function deleteObject(_mouseEvent, target) {
    if (target.action === 'rotate') return true;
    var activeObject = canvas.getActiveObjects();
    if (activeObject) {
      activeObject.map(function (item) {
        return canvas.remove(item);
      });
      canvas.requestRenderAll();
      canvas.discardActiveObject();
    }
    return true;
  }

  // 删除图标
  _fabric.fabric.Object.prototype.controls.deleteControl = new _fabric.fabric.Control({
    x: 0.5,
    y: -0.5,
    offsetY: -16,
    offsetX: 16,
    cursorStyle: 'pointer',
    mouseUpHandler: deleteObject,
    render: renderDelIcon
    // cornerSize: 24,
  });
}

// 旋转
function rotationControl() {
  var img = document.createElement('img');
  img.src = _rotateicon.default;
  function renderIconRotate(ctx, left, top, _styleOverride, fabricObject) {
    drawImg(ctx, left, top, img, 40, 40, fabricObject.angle);
  }
  // 旋转图标
  _fabric.fabric.Object.prototype.controls.mtr = new _fabric.fabric.Control({
    x: 0,
    y: 0.5,
    cursorStyleHandler: _fabric.fabric.controlsUtils.rotationStyleHandler,
    actionHandler: _fabric.fabric.controlsUtils.rotationWithSnapping,
    offsetY: 30,
    // withConnecton: false,
    actionName: 'rotate',
    render: renderIconRotate
  });
}
var ControlsPlugin = /*#__PURE__*/function () {
  function ControlsPlugin(canvas, editor) {
    _classCallCheck(this, ControlsPlugin);
    _defineProperty(this, "canvas", void 0);
    _defineProperty(this, "editor", void 0);
    this.canvas = canvas;
    this.editor = editor;
    this.init();
  }
  _createClass(ControlsPlugin, [{
    key: "init",
    value: function init() {
      // 删除图标
      deleteControl(this.canvas);
      // 顶点图标
      peakControl();
      // 中间横杠图标
      intervalControl();
      // 旋转图标
      rotationControl();

      // 选中样式
      _fabric.fabric.Object.prototype.set({
        transparentCorners: false,
        borderColor: '#51B9F9',
        cornerColor: '#FFF',
        borderScaleFactor: 2.5,
        cornerStyle: 'circle',
        cornerStrokeColor: '#0E98FC',
        borderOpacityWhenMoving: 1
      });
      // textbox保持一致
      // fabric.Textbox.prototype.controls = fabric.Object.prototype.controls;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      console.log('pluginDestroy');
    }
  }]);
  return ControlsPlugin;
}();
_defineProperty(ControlsPlugin, "pluginName", 'ControlsPlugin');
var _default = ControlsPlugin;
exports.default = _default;