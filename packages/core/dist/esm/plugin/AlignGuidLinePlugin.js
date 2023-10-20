function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/*
 * @Author: 秦少卫
 * @Date: 2023-05-21 08:55:25
 * @LastEditors: 秦少卫
 * @LastEditTime: 2023-06-09 13:17:27
 * @Description: 辅助线功能
 */

import { fabric } from 'fabric';
var AlignGuidLinePlugin = /*#__PURE__*/function () {
  function AlignGuidLinePlugin(canvas, editor) {
    _classCallCheck(this, AlignGuidLinePlugin);
    _defineProperty(this, "canvas", void 0);
    _defineProperty(this, "editor", void 0);
    _defineProperty(this, "defautOption", {
      color: 'rgba(255,95,95,1)',
      width: 1
    });
    _defineProperty(this, "hotkeys", ['']);
    _defineProperty(this, "dragMode", false);
    this.canvas = canvas;
    this.editor = editor;
    this.dragMode = false;
    this.init();
  }
  _createClass(AlignGuidLinePlugin, [{
    key: "init",
    value: function init() {
      var canvas = this.canvas;
      var ctx = canvas.getSelectionContext();
      var aligningLineOffset = 5;
      var aligningLineMargin = 4;
      var This = this;
      var viewportTransform;
      var zoom = 1;
      function drawVerticalLine(coords) {
        drawLine(coords.x + 0.5, coords.y1 > coords.y2 ? coords.y2 : coords.y1, coords.x + 0.5, coords.y2 > coords.y1 ? coords.y2 : coords.y1);
      }
      function drawHorizontalLine(coords) {
        drawLine(coords.x1 > coords.x2 ? coords.x2 : coords.x1, coords.y + 0.5, coords.x2 > coords.x1 ? coords.x2 : coords.x1, coords.y + 0.5);
      }
      function drawLine(x1, y1, x2, y2) {
        if (viewportTransform == null) return;
        ctx.save();
        ctx.lineWidth = This.defautOption.width;
        ctx.strokeStyle = This.defautOption.color;
        ctx.beginPath();
        ctx.moveTo(x1 * zoom + viewportTransform[4], y1 * zoom + viewportTransform[5]);
        ctx.lineTo(x2 * zoom + viewportTransform[4], y2 * zoom + viewportTransform[5]);
        ctx.stroke();
        ctx.restore();
      }
      function isInRange(value1, value2) {
        value1 = Math.round(value1);
        value2 = Math.round(value2);
        for (var i = value1 - aligningLineMargin, len = value1 + aligningLineMargin; i <= len; i++) {
          if (i === value2) {
            return true;
          }
        }
        return false;
      }
      var verticalLines = [];
      var horizontalLines = [];
      canvas.on('mouse:down', function () {
        viewportTransform = canvas.viewportTransform;
        zoom = canvas.getZoom();
      });
      canvas.on('object:moving', function (e) {
        if (viewportTransform === undefined || e.target === undefined) return;
        var activeObject = e.target;
        var canvasObjects = canvas.getObjects();
        var activeObjectCenter = activeObject.getCenterPoint();
        var activeObjectLeft = activeObjectCenter.x;
        var activeObjectTop = activeObjectCenter.y;
        var activeObjectBoundingRect = activeObject.getBoundingRect();
        var activeObjectHeight = activeObjectBoundingRect.height / viewportTransform[3];
        var activeObjectWidth = activeObjectBoundingRect.width / viewportTransform[0];
        var horizontalInTheRange = false;
        var verticalInTheRange = false;
        var transform = canvas._currentTransform;
        if (!transform) return;

        // It should be trivial to DRY this up by encapsulating (repeating) creation of x1, x2, y1, and y2 into functions,
        // but we're not doing it here for perf. reasons -- as this a function that's invoked on every mouse move

        for (var i = canvasObjects.length; i--;) {
          // eslint-disable-next-line no-continue
          if (canvasObjects[i] === activeObject) continue;

          // 排除辅助线
          if (activeObject instanceof fabric.GuideLine && canvasObjects[i] instanceof fabric.GuideLine) {
            continue;
          }
          var objectCenter = canvasObjects[i].getCenterPoint();
          var objectLeft = objectCenter.x;
          var objectTop = objectCenter.y;
          var objectBoundingRect = canvasObjects[i].getBoundingRect();
          var objectHeight = objectBoundingRect.height / viewportTransform[3];
          var objectWidth = objectBoundingRect.width / viewportTransform[0];

          // snap by the horizontal center line
          if (isInRange(objectLeft, activeObjectLeft)) {
            verticalInTheRange = true;
            verticalLines.push({
              x: objectLeft,
              y1: objectTop < activeObjectTop ? objectTop - objectHeight / 2 - aligningLineOffset : objectTop + objectHeight / 2 + aligningLineOffset,
              y2: activeObjectTop > objectTop ? activeObjectTop + activeObjectHeight / 2 + aligningLineOffset : activeObjectTop - activeObjectHeight / 2 - aligningLineOffset
            });
            activeObject.setPositionByOrigin(new fabric.Point(objectLeft, activeObjectTop), 'center', 'center');
          }

          // snap by the left edge
          if (isInRange(objectLeft - objectWidth / 2, activeObjectLeft - activeObjectWidth / 2)) {
            verticalInTheRange = true;
            verticalLines.push({
              x: objectLeft - objectWidth / 2,
              y1: objectTop < activeObjectTop ? objectTop - objectHeight / 2 - aligningLineOffset : objectTop + objectHeight / 2 + aligningLineOffset,
              y2: activeObjectTop > objectTop ? activeObjectTop + activeObjectHeight / 2 + aligningLineOffset : activeObjectTop - activeObjectHeight / 2 - aligningLineOffset
            });
            activeObject.setPositionByOrigin(new fabric.Point(objectLeft - objectWidth / 2 + activeObjectWidth / 2, activeObjectTop), 'center', 'center');
          }

          // snap by the right edge
          if (isInRange(objectLeft + objectWidth / 2, activeObjectLeft + activeObjectWidth / 2)) {
            verticalInTheRange = true;
            verticalLines.push({
              x: objectLeft + objectWidth / 2,
              y1: objectTop < activeObjectTop ? objectTop - objectHeight / 2 - aligningLineOffset : objectTop + objectHeight / 2 + aligningLineOffset,
              y2: activeObjectTop > objectTop ? activeObjectTop + activeObjectHeight / 2 + aligningLineOffset : activeObjectTop - activeObjectHeight / 2 - aligningLineOffset
            });
            activeObject.setPositionByOrigin(new fabric.Point(objectLeft + objectWidth / 2 - activeObjectWidth / 2, activeObjectTop), 'center', 'center');
          }

          // snap by the vertical center line
          if (isInRange(objectTop, activeObjectTop)) {
            horizontalInTheRange = true;
            horizontalLines.push({
              y: objectTop,
              x1: objectLeft < activeObjectLeft ? objectLeft - objectWidth / 2 - aligningLineOffset : objectLeft + objectWidth / 2 + aligningLineOffset,
              x2: activeObjectLeft > objectLeft ? activeObjectLeft + activeObjectWidth / 2 + aligningLineOffset : activeObjectLeft - activeObjectWidth / 2 - aligningLineOffset
            });
            activeObject.setPositionByOrigin(new fabric.Point(activeObjectLeft, objectTop), 'center', 'center');
          }

          // snap by the top edge
          if (isInRange(objectTop - objectHeight / 2, activeObjectTop - activeObjectHeight / 2)) {
            horizontalInTheRange = true;
            horizontalLines.push({
              y: objectTop - objectHeight / 2,
              x1: objectLeft < activeObjectLeft ? objectLeft - objectWidth / 2 - aligningLineOffset : objectLeft + objectWidth / 2 + aligningLineOffset,
              x2: activeObjectLeft > objectLeft ? activeObjectLeft + activeObjectWidth / 2 + aligningLineOffset : activeObjectLeft - activeObjectWidth / 2 - aligningLineOffset
            });
            activeObject.setPositionByOrigin(new fabric.Point(activeObjectLeft, objectTop - objectHeight / 2 + activeObjectHeight / 2), 'center', 'center');
          }

          // snap by the bottom edge
          if (isInRange(objectTop + objectHeight / 2, activeObjectTop + activeObjectHeight / 2)) {
            horizontalInTheRange = true;
            horizontalLines.push({
              y: objectTop + objectHeight / 2,
              x1: objectLeft < activeObjectLeft ? objectLeft - objectWidth / 2 - aligningLineOffset : objectLeft + objectWidth / 2 + aligningLineOffset,
              x2: activeObjectLeft > objectLeft ? activeObjectLeft + activeObjectWidth / 2 + aligningLineOffset : activeObjectLeft - activeObjectWidth / 2 - aligningLineOffset
            });
            activeObject.setPositionByOrigin(new fabric.Point(activeObjectLeft, objectTop + objectHeight / 2 - activeObjectHeight / 2), 'center', 'center');
          }
        }
        if (!horizontalInTheRange) {
          horizontalLines.length = 0;
        }
        if (!verticalInTheRange) {
          verticalLines.length = 0;
        }
      });
      canvas.on('before:render', function () {
        // fix 保存图片时报错
        try {
          canvas.clearContext(canvas.contextTop);
        } catch (error) {
          console.log(error);
        }
      });
      canvas.on('after:render', function () {
        for (var i = verticalLines.length; i--;) {
          drawVerticalLine(verticalLines[i]);
        }
        for (var j = horizontalLines.length; j--;) {
          drawHorizontalLine(horizontalLines[j]);
        }

        // noinspection NestedAssignmentJS
        verticalLines.length = 0;
        horizontalLines.length = 0;
      });
      canvas.on('mouse:up', function () {
        verticalLines.length = 0;
        horizontalLines.length = 0;
        canvas.renderAll();
      });
    }
  }, {
    key: "destroy",
    value: function destroy() {
      console.log('pluginDestroy');
    }
  }]);
  return AlignGuidLinePlugin;
}();
_defineProperty(AlignGuidLinePlugin, "pluginName", 'AlignGuidLinePlugin');
_defineProperty(AlignGuidLinePlugin, "events", ['', '']);
_defineProperty(AlignGuidLinePlugin, "apis", []);
export default AlignGuidLinePlugin;