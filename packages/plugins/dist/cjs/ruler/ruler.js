"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _fabric = require("fabric");
var _utils = require("./utils");
var _lodashEs = require("lodash-es");
var _guideline = require("./guideline");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } /* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * 配置
 */
var CanvasRuler = /*#__PURE__*/function () {
  function CanvasRuler(_options) {
    var _this = this;
    _classCallCheck(this, CanvasRuler);
    _defineProperty(this, "ctx", void 0);
    /**
     * 配置
     */
    _defineProperty(this, "options", void 0);
    /**
     * 标尺起始点
     */
    _defineProperty(this, "startCalibration", void 0);
    _defineProperty(this, "activeOn", 'up');
    /**
     * 选取对象矩形坐标
     */
    _defineProperty(this, "objectRect", void 0);
    /**
     * 事件句柄缓存
     */
    _defineProperty(this, "eventHandler", {
      // calcCalibration: this.calcCalibration.bind(this),
      calcObjectRect: (0, _lodashEs.throttle)(this.calcObjectRect.bind(this), 15),
      clearStatus: this.clearStatus.bind(this),
      canvasMouseDown: this.canvasMouseDown.bind(this),
      canvasMouseMove: (0, _lodashEs.throttle)(this.canvasMouseMove.bind(this), 15),
      canvasMouseUp: this.canvasMouseUp.bind(this),
      render: function render(e) {
        // 避免多次渲染
        if (!e.ctx) return;
        _this.render();
      }
    });
    _defineProperty(this, "lastAttr", {
      status: 'out',
      cursor: undefined,
      selection: undefined
    });
    _defineProperty(this, "tempGuidelLine", void 0);
    _defineProperty(this, "getCommonEventInfo", function (e) {
      if (!_this.tempGuidelLine || !e.absolutePointer) return;
      return {
        e: e.e,
        transform: _this.tempGuidelLine.get('transform'),
        pointer: {
          x: e.absolutePointer.x,
          y: e.absolutePointer.y
        },
        target: _this.tempGuidelLine
      };
    });
    // 合并默认配置
    this.options = Object.assign({
      ruleSize: 20,
      fontSize: 10,
      enabled: false,
      backgroundColor: '#fff',
      borderColor: '#ddd',
      highlightColor: '#007fff',
      textColor: '#888'
    }, _options);
    this.ctx = this.options.canvas.getContext();
    _fabric.fabric.util.object.extend(this.options.canvas, {
      ruler: this
    });
    (0, _guideline.setupGuideLine)();
    if (this.options.enabled) {
      this.enable();
    }
  }

  // 销毁
  _createClass(CanvasRuler, [{
    key: "destroy",
    value: function destroy() {
      this.disable();
    }

    /**
     * 移除全部辅助线
     */
  }, {
    key: "clearGuideline",
    value: function clearGuideline() {
      var _this$options$canvas;
      (_this$options$canvas = this.options.canvas).remove.apply(_this$options$canvas, _toConsumableArray(this.options.canvas.getObjects(_fabric.fabric.GuideLine.prototype.type)));
    }

    /**
     * 显示全部辅助线
     */
  }, {
    key: "showGuideline",
    value: function showGuideline() {
      this.options.canvas.getObjects(_fabric.fabric.GuideLine.prototype.type).forEach(function (guideLine) {
        guideLine.set('visible', true);
      });
      this.options.canvas.renderAll();
    }

    /**
     * 隐藏全部辅助线
     */
  }, {
    key: "hideGuideline",
    value: function hideGuideline() {
      this.options.canvas.getObjects(_fabric.fabric.GuideLine.prototype.type).forEach(function (guideLine) {
        guideLine.set('visible', false);
      });
      this.options.canvas.renderAll();
    }

    /**
     * 启用
     */
  }, {
    key: "enable",
    value: function enable() {
      this.options.enabled = true;

      // 绑定事件
      this.options.canvas.on('after:render', this.eventHandler.calcObjectRect);
      this.options.canvas.on('after:render', this.eventHandler.render);
      this.options.canvas.on('mouse:down', this.eventHandler.canvasMouseDown);
      this.options.canvas.on('mouse:move', this.eventHandler.canvasMouseMove);
      this.options.canvas.on('mouse:up', this.eventHandler.canvasMouseUp);
      this.options.canvas.on('selection:cleared', this.eventHandler.clearStatus);

      // 显示辅助线
      this.showGuideline();

      // 绘制一次
      this.render();
    }

    /**
     * 禁用
     */
  }, {
    key: "disable",
    value: function disable() {
      // 解除事件
      this.options.canvas.off('after:render', this.eventHandler.calcObjectRect);
      this.options.canvas.off('after:render', this.eventHandler.render);
      this.options.canvas.off('mouse:down', this.eventHandler.canvasMouseDown);
      this.options.canvas.off('mouse:move', this.eventHandler.canvasMouseMove);
      this.options.canvas.off('mouse:up', this.eventHandler.canvasMouseUp);
      this.options.canvas.off('selection:cleared', this.eventHandler.clearStatus);

      // 隐藏辅助线
      this.hideGuideline();
      this.options.enabled = false;
    }

    /**
     * 绘制
     */
  }, {
    key: "render",
    value: function render() {
      var _this$startCalibratio, _this$startCalibratio2;
      // if (!this.options.enabled) return;
      var vpt = this.options.canvas.viewportTransform;
      if (!vpt) return;
      // 绘制尺子
      this.draw({
        isHorizontal: true,
        rulerLength: this.getSize().width,
        // startCalibration: -(vpt[4] / vpt[0]),
        startCalibration: (_this$startCalibratio = this.startCalibration) !== null && _this$startCalibratio !== void 0 && _this$startCalibratio.x ? this.startCalibration.x : -(vpt[4] / vpt[0])
      });
      this.draw({
        isHorizontal: false,
        rulerLength: this.getSize().height,
        // startCalibration: -(vpt[5] / vpt[3]),
        startCalibration: (_this$startCalibratio2 = this.startCalibration) !== null && _this$startCalibratio2 !== void 0 && _this$startCalibratio2.y ? this.startCalibration.y : -(vpt[5] / vpt[3])
      });
      // 绘制左上角的遮罩
      (0, _utils.drawMask)(this.ctx, {
        isHorizontal: true,
        left: -10,
        top: -10,
        width: this.options.ruleSize * 2 + 10,
        height: this.options.ruleSize + 10,
        backgroundColor: this.options.backgroundColor
      });
      (0, _utils.drawMask)(this.ctx, {
        isHorizontal: false,
        left: -10,
        top: -10,
        width: this.options.ruleSize + 10,
        height: this.options.ruleSize * 2 + 10,
        backgroundColor: this.options.backgroundColor
      });
    }

    /**
     * 获取画板尺寸
     */
  }, {
    key: "getSize",
    value: function getSize() {
      var _this$options$canvas$, _this$options$canvas$2;
      return {
        width: (_this$options$canvas$ = this.options.canvas.width) !== null && _this$options$canvas$ !== void 0 ? _this$options$canvas$ : 0,
        height: (_this$options$canvas$2 = this.options.canvas.height) !== null && _this$options$canvas$2 !== void 0 ? _this$options$canvas$2 : 0
      };
    }
  }, {
    key: "getZoom",
    value: function getZoom() {
      return this.options.canvas.getZoom();
    }
  }, {
    key: "draw",
    value: function draw(opt) {
      var _this2 = this;
      var isHorizontal = opt.isHorizontal,
        rulerLength = opt.rulerLength,
        startCalibration = opt.startCalibration;
      var zoom = this.getZoom();
      var gap = (0, _utils.getGap)(zoom);
      var unitLength = rulerLength / zoom;
      var startValue = Math[startCalibration > 0 ? 'floor' : 'ceil'](startCalibration / gap) * gap;
      var startOffset = startValue - startCalibration;

      // 标尺背景
      var canvasSize = this.getSize();
      (0, _utils.darwRect)(this.ctx, {
        left: 0,
        top: 0,
        width: isHorizontal ? canvasSize.width : this.options.ruleSize,
        height: isHorizontal ? this.options.ruleSize : canvasSize.height,
        fill: this.options.backgroundColor,
        stroke: this.options.borderColor
      });

      // 颜色
      var textColor = new _fabric.fabric.Color(this.options.textColor);
      // 标尺文字显示
      for (var i = 0; i + startOffset <= Math.ceil(unitLength); i += gap) {
        var position = (startOffset + i) * zoom;
        var textValue = startValue + i + '';
        var textLength = 10 * textValue.length / 4;
        var textX = isHorizontal ? position - textLength - 1 : this.options.ruleSize / 2 - this.options.fontSize / 2 - 4;
        var textY = isHorizontal ? this.options.ruleSize / 2 - this.options.fontSize / 2 - 4 : position + textLength;
        (0, _utils.darwText)(this.ctx, {
          text: textValue,
          left: textX,
          top: textY,
          fill: textColor.toRgb(),
          angle: isHorizontal ? 0 : -90
        });
      }

      // 标尺刻度线显示
      for (var j = 0; j + startOffset <= Math.ceil(unitLength); j += gap) {
        var _position = Math.round((startOffset + j) * zoom);
        var left = isHorizontal ? _position : this.options.ruleSize - 8;
        var top = isHorizontal ? this.options.ruleSize - 8 : _position;
        var width = isHorizontal ? 0 : 8;
        var height = isHorizontal ? 8 : 0;
        (0, _utils.darwLine)(this.ctx, {
          left: left,
          top: top,
          width: width,
          height: height,
          stroke: textColor.toRgb()
        });
      }

      // 标尺蓝色遮罩
      if (this.objectRect) {
        var axis = isHorizontal ? 'x' : 'y';
        this.objectRect[axis].forEach(function (rect) {
          // 跳过指定矩形
          if (rect.skip === axis) {
            return;
          }

          // 获取数字的值
          var roundFactor = function roundFactor(x) {
            return Math.round(x / zoom + startCalibration) + '';
          };
          var leftTextVal = roundFactor(isHorizontal ? rect.left : rect.top);
          var rightTextVal = roundFactor(isHorizontal ? rect.left + rect.width : rect.top + rect.height);
          var isSameText = leftTextVal === rightTextVal;

          // 背景遮罩
          var maskOpt = {
            isHorizontal: isHorizontal,
            width: isHorizontal ? 160 : _this2.options.ruleSize - 8,
            height: isHorizontal ? _this2.options.ruleSize - 8 : 160,
            backgroundColor: _this2.options.backgroundColor
          };
          (0, _utils.drawMask)(_this2.ctx, _objectSpread(_objectSpread({}, maskOpt), {}, {
            left: isHorizontal ? rect.left - 80 : 0,
            top: isHorizontal ? 0 : rect.top - 80
          }));
          if (!isSameText) {
            (0, _utils.drawMask)(_this2.ctx, _objectSpread(_objectSpread({}, maskOpt), {}, {
              left: isHorizontal ? rect.width + rect.left - 80 : 0,
              top: isHorizontal ? 0 : rect.height + rect.top - 80
            }));
          }

          // 颜色
          var highlightColor = new _fabric.fabric.Color(_this2.options.highlightColor);

          // 高亮遮罩
          highlightColor.setAlpha(0.5);
          (0, _utils.darwRect)(_this2.ctx, {
            left: isHorizontal ? rect.left : _this2.options.ruleSize - 8,
            top: isHorizontal ? _this2.options.ruleSize - 8 : rect.top,
            width: isHorizontal ? rect.width : 8,
            height: isHorizontal ? 8 : rect.height,
            fill: highlightColor.toRgba()
          });

          // 两边的数字
          var pad = _this2.options.ruleSize / 2 - _this2.options.fontSize / 2 - 4;
          var textOpt = {
            fill: highlightColor.toRgba(),
            angle: isHorizontal ? 0 : -90
          };
          (0, _utils.darwText)(_this2.ctx, _objectSpread(_objectSpread({}, textOpt), {}, {
            text: leftTextVal,
            left: isHorizontal ? rect.left - 2 : pad,
            top: isHorizontal ? pad : rect.top - 2,
            align: isSameText ? 'center' : isHorizontal ? 'right' : 'left'
          }));
          if (!isSameText) {
            (0, _utils.darwText)(_this2.ctx, _objectSpread(_objectSpread({}, textOpt), {}, {
              text: rightTextVal,
              left: isHorizontal ? rect.left + rect.width + 2 : pad,
              top: isHorizontal ? pad : rect.top + rect.height + 2,
              align: isHorizontal ? 'left' : 'right'
            }));
          }

          // 两边的线
          var lineSize = isSameText ? 8 : 14;
          highlightColor.setAlpha(1);
          var lineOpt = {
            width: isHorizontal ? 0 : lineSize,
            height: isHorizontal ? lineSize : 0,
            stroke: highlightColor.toRgba()
          };
          (0, _utils.darwLine)(_this2.ctx, _objectSpread(_objectSpread({}, lineOpt), {}, {
            left: isHorizontal ? rect.left : _this2.options.ruleSize - lineSize,
            top: isHorizontal ? _this2.options.ruleSize - lineSize : rect.top
          }));
          if (!isSameText) {
            (0, _utils.darwLine)(_this2.ctx, _objectSpread(_objectSpread({}, lineOpt), {}, {
              left: isHorizontal ? rect.left + rect.width : _this2.options.ruleSize - lineSize,
              top: isHorizontal ? _this2.options.ruleSize - lineSize : rect.top + rect.height
            }));
          }
        });
      }
      // draw end
    }

    /**
     * 计算起始点
     */
    // private calcCalibration() {
    //   if (this.startCalibration) return;
    //   // console.log('calcCalibration');
    //   const workspace = this.options.canvas.getObjects().find((item: any) => {
    //     return item.id === 'workspace';
    //   });
    //   if (!workspace) return;
    //   const rect = workspace.getBoundingRect(false);
    //   this.startCalibration = new fabric.Point(-rect.left, -rect.top).divide(this.getZoom());
    // }
  }, {
    key: "calcObjectRect",
    value: function calcObjectRect() {
      var _this3 = this;
      var activeObjects = this.options.canvas.getActiveObjects();
      if (activeObjects.length === 0) return;
      var allRect = activeObjects.reduce(function (rects, obj) {
        var rect = obj.getBoundingRect(false, true);
        // 如果是分组单独计算坐标
        if (obj.group) {
          var _obj$left, _obj$top;
          var group = _objectSpread({
            top: 0,
            left: 0,
            width: 0,
            height: 0,
            scaleX: 1,
            scaleY: 1
          }, obj.group);
          // 计算矩形坐标
          rect.width *= group.scaleX;
          rect.height *= group.scaleY;
          var groupCenterX = group.width / 2 + group.left;
          var objectOffsetFromCenterX = (group.width / 2 + ((_obj$left = obj.left) !== null && _obj$left !== void 0 ? _obj$left : 0)) * (1 - group.scaleX);
          rect.left += (groupCenterX - objectOffsetFromCenterX) * _this3.getZoom();
          var groupCenterY = group.height / 2 + group.top;
          var objectOffsetFromCenterY = (group.height / 2 + ((_obj$top = obj.top) !== null && _obj$top !== void 0 ? _obj$top : 0)) * (1 - group.scaleY);
          rect.top += (groupCenterY - objectOffsetFromCenterY) * _this3.getZoom();
        }
        if (obj instanceof _fabric.fabric.GuideLine) {
          rect.skip = obj.isHorizontal() ? 'x' : 'y';
        }
        rects.push(rect);
        return rects;
      }, []);
      if (allRect.length === 0) return;
      this.objectRect = {
        x: (0, _utils.mergeLines)(allRect, true),
        y: (0, _utils.mergeLines)(allRect, false)
      };
    }

    /**
     * 清除起始点和矩形坐标
     */
  }, {
    key: "clearStatus",
    value: function clearStatus() {
      // this.startCalibration = undefined;
      this.objectRect = undefined;
    }

    /**
      判断鼠标是否在标尺上
     * @param point 
     * @returns "vertical" | "horizontal" | false
     */
  }, {
    key: "isPointOnRuler",
    value: function isPointOnRuler(point) {
      if (new _fabric.fabric.Rect({
        left: 0,
        top: 0,
        width: this.options.ruleSize,
        height: this.options.canvas.height
      }).containsPoint(point)) {
        return 'vertical';
      } else if (new _fabric.fabric.Rect({
        left: 0,
        top: 0,
        width: this.options.canvas.width,
        height: this.options.ruleSize
      }).containsPoint(point)) {
        return 'horizontal';
      }
      return false;
    }
  }, {
    key: "canvasMouseDown",
    value: function canvasMouseDown(e) {
      if (!e.pointer || !e.absolutePointer) return;
      var hoveredRuler = this.isPointOnRuler(e.pointer);
      if (hoveredRuler && this.activeOn === 'up') {
        // 备份属性
        this.lastAttr.selection = this.options.canvas.selection;
        this.options.canvas.selection = false;
        this.activeOn = 'down';
        this.tempGuidelLine = new _fabric.fabric.GuideLine(hoveredRuler === 'horizontal' ? e.absolutePointer.y : e.absolutePointer.x, {
          axis: hoveredRuler,
          visible: false
        });
        this.options.canvas.add(this.tempGuidelLine);
        this.options.canvas.setActiveObject(this.tempGuidelLine);
        this.options.canvas._setupCurrentTransform(e.e, this.tempGuidelLine, true);
        this.tempGuidelLine.fire('down', this.getCommonEventInfo(e));
      }
    }
  }, {
    key: "canvasMouseMove",
    value: function canvasMouseMove(e) {
      if (!e.pointer) return;
      if (this.tempGuidelLine && e.absolutePointer) {
        var pos = {};
        if (this.tempGuidelLine.axis === 'horizontal') {
          pos.top = e.absolutePointer.y;
        } else {
          pos.left = e.absolutePointer.x;
        }
        this.tempGuidelLine.set(_objectSpread(_objectSpread({}, pos), {}, {
          visible: true
        }));
        this.options.canvas.requestRenderAll();
        var event = this.getCommonEventInfo(e);
        this.options.canvas.fire('object:moving', event);
        this.tempGuidelLine.fire('moving', event);
      }
      var hoveredRuler = this.isPointOnRuler(e.pointer);
      if (!hoveredRuler) {
        // 鼠标从里面出去
        if (this.lastAttr.status !== 'out') {
          // 更改鼠标指针
          this.options.canvas.defaultCursor = this.lastAttr.cursor;
          this.lastAttr.status = 'out';
        }
        return;
      }
      // const activeObjects = this.options.canvas.getActiveObjects();
      // if (activeObjects.length === 1 && activeObjects[0] instanceof fabric.GuideLine) {
      //   return;
      // }
      // 鼠标从外边进入 或 在另一侧标尺
      if (this.lastAttr.status === 'out' || hoveredRuler !== this.lastAttr.status) {
        // 更改鼠标指针
        this.lastAttr.cursor = this.options.canvas.defaultCursor;
        this.options.canvas.defaultCursor = hoveredRuler === 'horizontal' ? 'ns-resize' : 'ew-resize';
        this.lastAttr.status = hoveredRuler;
      }
    }
  }, {
    key: "canvasMouseUp",
    value: function canvasMouseUp(e) {
      var _this$tempGuidelLine;
      if (this.activeOn !== 'down') return;

      // 还原属性
      this.options.canvas.selection = this.lastAttr.selection;
      this.activeOn = 'up';
      (_this$tempGuidelLine = this.tempGuidelLine) === null || _this$tempGuidelLine === void 0 ? void 0 : _this$tempGuidelLine.fire('up', this.getCommonEventInfo(e));
      this.tempGuidelLine = undefined;
    }
  }]);
  return CanvasRuler;
}();
var _default = CanvasRuler;
exports.default = _default;