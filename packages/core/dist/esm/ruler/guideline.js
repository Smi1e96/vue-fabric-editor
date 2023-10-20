/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { fabric } from 'fabric';
export function setupGuideLine() {
  if (fabric.GuideLine) {
    return;
  }
  fabric.GuideLine = fabric.util.createClass(fabric.Line, {
    type: 'GuideLine',
    selectable: false,
    hasControls: false,
    hasBorders: false,
    stroke: '#4bec13',
    originX: 'center',
    originY: 'center',
    padding: 4,
    // 填充，让辅助线选择范围更大，方便选中
    globalCompositeOperation: 'difference',
    axis: 'horizontal',
    // excludeFromExport: true,
    initialize: function initialize(points, options) {
      var _this = this;
      var isHorizontal = options.axis === 'horizontal';
      // 指针
      this.hoverCursor = isHorizontal ? 'ns-resize' : 'ew-resize';
      // 设置新的点
      var newPoints = isHorizontal ? [-999999, points, 999999, points] : [points, -999999, points, 999999];
      // 锁定移动
      options[isHorizontal ? 'lockMovementX' : 'lockMovementY'] = true;
      // 调用父类初始化
      this.callSuper('initialize', newPoints, options);

      // 绑定事件
      this.on('mousedown:before', function (e) {
        if (_this.activeOn === 'down') {
          // 设置selectable:false后激活对象才能进行移动
          //@ts-ignore
          _this.canvas.setActiveObject(_this, e.e);
        }
      });
      this.on('moving', function (e) {
        if (_this.canvas.ruler.options.enabled && _this.isPointOnRuler(e.e)) {
          _this.moveCursor = 'not-allowed';
        } else {
          _this.moveCursor = _this.isHorizontal() ? 'ns-resize' : 'ew-resize';
        }
        _this.canvas.fire('guideline:moving', {
          target: _this,
          e: e.e
        });
      });
      this.on('mouseup', function (e) {
        // 移动到标尺上，移除辅助线
        if (_this.canvas.ruler.options.enabled && _this.isPointOnRuler(e.e)) {
          // console.log('移除辅助线', this);
          //@ts-ignore
          _this.canvas.remove(_this);
          return;
        }
        _this.moveCursor = _this.isHorizontal() ? 'ns-resize' : 'ew-resize';
        _this.canvas.fire('guideline:mouseup', {
          target: _this,
          e: e.e
        });
      });
      this.on('removed', function () {
        _this.off('removed');
        _this.off('mousedown:before');
        _this.off('moving');
        _this.off('mouseup');
      });
    },
    getBoundingRect: function getBoundingRect(absolute, calculate) {
      this.bringToFront();
      var isHorizontal = this.isHorizontal();
      var rect = this.callSuper('getBoundingRect', absolute, calculate);
      rect[isHorizontal ? 'top' : 'left'] += rect[isHorizontal ? 'height' : 'width'] / 2;
      rect[isHorizontal ? 'height' : 'width'] = 0;
      return rect;
    },
    isPointOnRuler: function isPointOnRuler(e) {
      var isHorizontal = this.isHorizontal();
      var hoveredRuler = this.canvas.ruler.isPointOnRuler(new fabric.Point(e.offsetX, e.offsetY));
      if (isHorizontal && hoveredRuler === 'horizontal' || !isHorizontal && hoveredRuler === 'vertical') {
        return hoveredRuler;
      }
      return false;
    },
    isHorizontal: function isHorizontal() {
      return this.height === 0;
    }
  });
  fabric.GuideLine.fromObject = function (object, callback) {
    var clone = fabric.util.object.clone;
    function _callback(instance) {
      delete instance.xy;
      callback && callback(instance);
    }
    var options = clone(object, true);
    var isHorizontal = options.height === 0;
    options.xy = isHorizontal ? options.y1 : options.x1;
    options.axis = isHorizontal ? 'horizontal' : 'vertical';
    fabric.Object._fromObject(options.type, options, _callback, 'xy');
  };
}
export default fabric.GuideLine;