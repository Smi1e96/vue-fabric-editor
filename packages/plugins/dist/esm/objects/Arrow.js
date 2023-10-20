/*
 * @Author: 秦少卫
 * @Date: 2023-01-07 01:15:50
 * @LastEditors: 秦少卫
 * @LastEditTime: 2023-02-08 00:08:40
 * @Description: 箭头元素
 */
import { fabric } from 'fabric';
//@ts-ignore
fabric.Arrow = fabric.util.createClass(fabric.Line, {
  type: 'arrow',
  superType: 'drawing',
  initialize: function initialize(points, options) {
    if (!points) {
      var _options = options,
        x1 = _options.x1,
        x2 = _options.x2,
        y1 = _options.y1,
        y2 = _options.y2;
      points = [x1, y1, x2, y2];
    }
    options = options || {};
    this.callSuper('initialize', points, options);
  },
  _render: function _render(ctx) {
    this.callSuper('_render', ctx);
    ctx.save();
    var xDiff = this.x2 - this.x1;
    var yDiff = this.y2 - this.y1;
    var angle = Math.atan2(yDiff, xDiff);
    ctx.translate((this.x2 - this.x1) / 2, (this.y2 - this.y1) / 2);
    ctx.rotate(angle);
    ctx.beginPath();
    // Move 5px in front of line to start the arrow so it does not have the square line end showing in front (0,0)
    ctx.moveTo(5, 0);
    ctx.lineTo(-5, 5);
    ctx.lineTo(-5, -5);
    ctx.closePath();
    ctx.fillStyle = this.stroke;
    ctx.fill();
    ctx.restore();
  }
});

//@ts-ignore
fabric.Arrow.fromObject = function (options, callback) {
  var x1 = options.x1,
    x2 = options.x2,
    y1 = options.y1,
    y2 = options.y2;
  return callback(new fabric.Arrow([x1, y1, x2, y2], options));
};
export default fabric.Arrow;