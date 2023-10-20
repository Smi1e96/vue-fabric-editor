function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
import { fabric } from 'fabric';

/**
 * 计算尺子间距
 * @param zoom 缩放比例
 * @returns 返回计算出的尺子间距
 */
var getGap = function getGap(zoom) {
  var zooms = [0.02, 0.03, 0.05, 0.1, 0.2, 0.5, 1, 2, 5, 10, 18];
  var gaps = [5000, 2500, 1000, 500, 250, 100, 50, 25, 10, 5, 2];
  var i = 0;
  while (i < zooms.length && zooms[i] < zoom) {
    i++;
  }
  return gaps[i - 1] || 5000;
};

/**
 * 线段合并
 * @param rect Rect数组
 * @param isHorizontal
 * @returns 合并后的Rect数组
 */
var mergeLines = function mergeLines(rect, isHorizontal) {
  var axis = isHorizontal ? 'left' : 'top';
  var length = isHorizontal ? 'width' : 'height';
  // 先按照 axis 的大小排序
  rect.sort(function (a, b) {
    return a[axis] - b[axis];
  });
  var mergedLines = [];
  var currentLine = Object.assign({}, rect[0]);
  var _iterator = _createForOfIteratorHelper(rect),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var item = _step.value;
      var line = Object.assign({}, item);
      if (currentLine[axis] + currentLine[length] >= line[axis]) {
        // 当前线段和下一个线段相交，合并宽度
        currentLine[length] = Math.max(currentLine[axis] + currentLine[length], line[axis] + line[length]) - currentLine[axis];
      } else {
        // 当前线段和下一个线段不相交，将当前线段加入结果数组中，并更新当前线段为下一个线段
        mergedLines.push(currentLine);
        currentLine = Object.assign({}, line);
      }
    }
    // 加入数组
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  mergedLines.push(currentLine);
  return mergedLines;
};
var darwLine = function darwLine(ctx, options) {
  ctx.save();
  var left = options.left,
    top = options.top,
    width = options.width,
    height = options.height,
    stroke = options.stroke,
    lineWidth = options.lineWidth;
  ctx.beginPath();
  stroke && (ctx.strokeStyle = stroke);
  ctx.lineWidth = lineWidth !== null && lineWidth !== void 0 ? lineWidth : 1;
  ctx.moveTo(left, top);
  ctx.lineTo(left + width, top + height);
  ctx.stroke();
  ctx.restore();
};
var darwText = function darwText(ctx, options) {
  ctx.save();
  var left = options.left,
    top = options.top,
    text = options.text,
    fill = options.fill,
    align = options.align,
    angle = options.angle,
    fontSize = options.fontSize;
  fill && (ctx.fillStyle = fill);
  ctx.textAlign = align !== null && align !== void 0 ? align : 'left';
  ctx.textBaseline = 'top';
  ctx.font = "".concat(fontSize !== null && fontSize !== void 0 ? fontSize : 10, "px sans-serif");
  if (angle) {
    ctx.translate(left, top);
    ctx.rotate(Math.PI / 180 * angle);
    ctx.translate(-left, -top);
  }
  ctx.fillText(text, left, top);
  ctx.restore();
};
var darwRect = function darwRect(ctx, options) {
  ctx.save();
  var left = options.left,
    top = options.top,
    width = options.width,
    height = options.height,
    fill = options.fill,
    stroke = options.stroke,
    strokeWidth = options.strokeWidth;
  ctx.beginPath();
  fill && (ctx.fillStyle = fill);
  ctx.rect(left, top, width, height);
  ctx.fill();
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = strokeWidth !== null && strokeWidth !== void 0 ? strokeWidth : 1;
    ctx.stroke();
  }
  ctx.restore();
};
var drawMask = function drawMask(ctx, options) {
  ctx.save();
  var isHorizontal = options.isHorizontal,
    left = options.left,
    top = options.top,
    width = options.width,
    height = options.height,
    backgroundColor = options.backgroundColor;
  // 创建一个线性渐变对象
  var gradient = isHorizontal ? ctx.createLinearGradient(left, height / 2, left + width, height / 2) : ctx.createLinearGradient(width / 2, top, width / 2, height + top);
  var transparentColor = new fabric.Color(backgroundColor);
  transparentColor.setAlpha(0);
  gradient.addColorStop(0, transparentColor.toRgba());
  gradient.addColorStop(0.33, backgroundColor);
  gradient.addColorStop(0.67, backgroundColor);
  gradient.addColorStop(1, transparentColor.toRgba());
  darwRect(ctx, {
    left: left,
    top: top,
    width: width,
    height: height,
    fill: gradient
  });
  ctx.restore();
};
export { getGap, mergeLines, darwRect, darwText, darwLine, drawMask };