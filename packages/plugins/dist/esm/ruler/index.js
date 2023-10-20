function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import CanvasRuler from "./ruler";
function initRuler(canvas, options) {
  var ruler = new CanvasRuler(_objectSpread({
    canvas: canvas
  }, options));

  // 辅助线移动到画板外删除
  var workspace = undefined;

  /**
   * 获取workspace
   */
  var getWorkspace = function getWorkspace() {
    workspace = canvas.getObjects().find(function (item) {
      return item.id === 'workspace';
    });
  };

  /**
   * 判断target是否在object矩形外
   * @param object
   * @param target
   * @returns
   */
  var isRectOut = function isRectOut(object, target) {
    var top = object.top,
      height = object.height,
      left = object.left,
      width = object.width;
    if (top === undefined || height === undefined || left === undefined || width === undefined) {
      return false;
    }
    var targetRect = target.getBoundingRect(true, true);
    var targetTop = targetRect.top,
      targetHeight = targetRect.height,
      targetLeft = targetRect.left,
      targetWidth = targetRect.width;
    if (target.isHorizontal() && (top > targetTop + 1 || top + height < targetTop + targetHeight - 1)) {
      return true;
    } else if (!target.isHorizontal() && (left > targetLeft + 1 || left + width < targetLeft + targetWidth - 1)) {
      return true;
    }
    return false;
  };
  canvas.on('guideline:moving', function (e) {
    if (!workspace) {
      getWorkspace();
      return;
    }
    var target = e.target;
    if (isRectOut(workspace, target)) {
      target.moveCursor = 'not-allowed';
    }
  });
  canvas.on('guideline:mouseup', function (e) {
    if (!workspace) {
      getWorkspace();
      return;
    }
    var target = e.target;
    if (isRectOut(workspace, target)) {
      var _canvas$defaultCursor;
      canvas.remove(target);
      canvas.setCursor((_canvas$defaultCursor = canvas.defaultCursor) !== null && _canvas$defaultCursor !== void 0 ? _canvas$defaultCursor : '');
    }
  });
  return ruler;
}
export default initRuler;