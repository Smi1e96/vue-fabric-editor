"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPolygonVertices = void 0;
/**
 * 获取多边形顶点坐标
 * @param edges 变数
 * @param radius 半径
 * @returns 坐标数组
 */
var getPolygonVertices = function getPolygonVertices(edges, radius) {
  var vertices = [];
  var interiorAngle = Math.PI * 2 / edges;
  var rotationAdjustment = -Math.PI / 2;
  if (edges % 2 === 0) {
    rotationAdjustment += interiorAngle / 2;
  }
  for (var i = 0; i < edges; i++) {
    // 画圆取顶点坐标
    var rad = i * interiorAngle + rotationAdjustment;
    vertices.push({
      x: Math.cos(rad) * radius,
      y: Math.sin(rad) * radius
    });
  }
  return vertices;
};
exports.getPolygonVertices = getPolygonVertices;