"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _fabric = require("fabric");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } /*
                                                                                                                                                                                                                                                                                                                                                                                               * @Author: 秦少卫
                                                                                                                                                                                                                                                                                                                                                                                               * @Date: 2023-06-22 16:19:46
                                                                                                                                                                                                                                                                                                                                                                                               * @LastEditors: 秦少卫
                                                                                                                                                                                                                                                                                                                                                                                               * @LastEditTime: 2023-07-16 12:14:55
                                                                                                                                                                                                                                                                                                                                                                                               * @Description: 组对齐插件
                                                                                                                                                                                                                                                                                                                                                                                               */
var GroupAlignPlugin = /*#__PURE__*/function () {
  // public hotkeys: string[] = ['space'];
  function GroupAlignPlugin(canvas, editor) {
    _classCallCheck(this, GroupAlignPlugin);
    _defineProperty(this, "canvas", void 0);
    _defineProperty(this, "editor", void 0);
    this.canvas = canvas;
    this.editor = editor;
  }
  _createClass(GroupAlignPlugin, [{
    key: "left",
    value: function left() {
      var canvas = this.canvas;
      // const activeObject = canvas.getActiveObject();
      // if (activeObject && activeObject.type === 'activeSelection') {
      //   const activeSelection = activeObject;
      //   const activeObjectLeft = -(activeObject.width / 2);
      //   activeSelection.forEachObject((item) => {
      //     item.set({
      //       left: activeObjectLeft,
      //     });
      //     item.setCoords();
      //     canvas.renderAll();
      //   });
      // }

      var activeObject = canvas.getActiveObject();
      var selectObjects = canvas.getActiveObjects();
      if (activeObject) {
        var left = activeObject.left;
        canvas.discardActiveObject();
        selectObjects.forEach(function (item) {
          var bounding = item.getBoundingRect(true);
          item.set({
            //@ts-ignore
            left: left - bounding.left + item.left
          });
          item.setCoords();
        });
        var activeSelection = new _fabric.fabric.ActiveSelection(selectObjects, {
          canvas: canvas
        });
        canvas.setActiveObject(activeSelection);
        canvas.requestRenderAll();
      }
    }
  }, {
    key: "right",
    value: function right() {
      var canvas = this.canvas;
      // const activeObject = canvas.getActiveObject();
      // if (activeObject && activeObject.type === 'activeSelection') {
      //   const activeSelection = activeObject;
      //   const activeObjectLeft = activeObject.width / 2;
      //   activeSelection.forEachObject((item) => {
      //     item.set({
      //       left: activeObjectLeft - item.width * item.scaleX,
      //     });
      //     item.setCoords();
      //     canvas.renderAll();
      //   });
      // }

      var activeObject = canvas.getActiveObject();
      var selectObjects = canvas.getActiveObjects();
      if (activeObject) {
        var left = activeObject.left,
          width = activeObject.width;
        canvas.discardActiveObject();
        selectObjects.forEach(function (item) {
          var bounding = item.getBoundingRect(true);
          item.set({
            // @ts-ignore
            left: left + width - (bounding.left + bounding.width) + item.left
          });
        });
        var activeSelection = new _fabric.fabric.ActiveSelection(selectObjects, {
          canvas: canvas
        });
        canvas.setActiveObject(activeSelection);
        canvas.requestRenderAll();
      }
    }
  }, {
    key: "xcenter",
    value: function xcenter() {
      var canvas = this.canvas;
      // const activeObject = canvas.getActiveObject();
      // if (activeObject && activeObject.type === 'activeSelection') {
      //   const activeSelection = activeObject;
      //   activeSelection.forEachObject((item) => {
      //     item.set({
      //       left: 0 - (item.width * item.scaleX) / 2,
      //     });
      //     item.setCoords();
      //     canvas.renderAll();
      //   });
      // }

      var activeObject = canvas.getActiveObject();
      var selectObjects = canvas.getActiveObjects();
      if (activeObject) {
        var left = activeObject.left,
          width = activeObject.width;
        canvas.discardActiveObject();
        selectObjects.forEach(function (item) {
          var bounding = item.getBoundingRect(true);
          item.set({
            //@ts-ignore
            left: left + width / 2 - (bounding.left + bounding.width / 2) + item.left
          });
        });
        var activeSelection = new _fabric.fabric.ActiveSelection(selectObjects, {
          canvas: canvas
        });
        canvas.setActiveObject(activeSelection);
        canvas.requestRenderAll();
      }
    }
  }, {
    key: "ycenter",
    value: function ycenter() {
      var canvas = this.canvas;
      // const activeObject = canvas.getActiveObject();
      // if (activeObject && activeObject.type === 'activeSelection') {
      //   const activeSelection = activeObject;
      //   activeSelection.forEachObject((item) => {
      //     item.set({
      //       top: 0 - (item.height * item.scaleY) / 2,
      //     });
      //     item.setCoords();
      //     canvas.renderAll();
      //   });
      // }

      var activeObject = canvas.getActiveObject();
      var selectObjects = canvas.getActiveObjects();
      if (activeObject) {
        var top = activeObject.top,
          height = activeObject.height;
        canvas.discardActiveObject();
        selectObjects.forEach(function (item) {
          var bounding = item.getBoundingRect(true);
          item.set({
            //@ts-ignore
            top: top + height / 2 - (bounding.top + bounding.height / 2) + item.top
          });
        });
        var activeSelection = new _fabric.fabric.ActiveSelection(selectObjects, {
          canvas: canvas
        });
        canvas.setActiveObject(activeSelection);
        canvas.requestRenderAll();
      }
    }
  }, {
    key: "top",
    value: function top() {
      var canvas = this.canvas;
      // const activeObject = canvas.getActiveObject();
      // if (activeObject && activeObject.type === 'activeSelection') {
      //   const activeSelection = activeObject;
      //   const activeObjectTop = -(activeObject.height / 2);
      //   activeSelection.forEachObject((item) => {
      //     item.set({
      //       top: activeObjectTop,
      //     });
      //     item.setCoords();
      //     canvas.renderAll();
      //   });
      // }

      var activeObject = canvas.getActiveObject();
      var selectObjects = canvas.getActiveObjects();
      if (activeObject) {
        var top = activeObject.top;
        canvas.discardActiveObject();
        selectObjects.forEach(function (item) {
          var bounding = item.getBoundingRect(true);
          item.set({
            //@ts-ignore
            top: top - bounding.top + item.top
          });
        });
        var activeSelection = new _fabric.fabric.ActiveSelection(selectObjects, {
          canvas: canvas
        });
        canvas.setActiveObject(activeSelection);
        canvas.requestRenderAll();
      }
    }
  }, {
    key: "bottom",
    value: function bottom() {
      var canvas = this.canvas;
      // const activeObject = canvas.getActiveObject();
      // if (activeObject && activeObject.type === 'activeSelection') {
      //   const activeSelection = activeObject;
      //   const activeObjectTop = activeObject.height / 2;
      //   activeSelection.forEachObject((item) => {
      //     item.set({
      //       top: activeObjectTop - item.height * item.scaleY,
      //     });
      //     item.setCoords();
      //     canvas.renderAll();
      //   });
      // }

      var activeObject = canvas.getActiveObject();
      var selectObjects = canvas.getActiveObjects();
      if (activeObject && activeObject.top !== undefined) {
        var top = activeObject.top,
          height = activeObject.height;
        canvas.discardActiveObject();
        selectObjects.forEach(function (item) {
          var bounding = item.getBoundingRect(true);
          item.set({
            // @ts-ignore
            top: top + height - (bounding.top + bounding.height) + item.top
          });
        });
        var activeSelection = new _fabric.fabric.ActiveSelection(selectObjects, {
          canvas: canvas
        });
        canvas.setActiveObject(activeSelection);
        canvas.requestRenderAll();
      }
    }
  }, {
    key: "xequation",
    value: function xequation() {
      var canvas = this.canvas;
      var activeObject = canvas.getActiveObject();
      if (activeObject) {
        // width属性不准确，需要坐标换算
        function getItemWidth(item) {
          return item.aCoords.tr.x - item.aCoords.tl.x;
        }

        // 获取所有元素高度
        function getAllItemHeight() {
          var count = 0;
          //@ts-ignore
          activeObject.forEachObject(function (item) {
            count += getItemWidth(item);
          });
          return count;
        }
        // 获取平均间距
        function spacWidth() {
          var count = getAllItemHeight();
          //@ts-ignore
          var allSpac = activeObject.width - count;
          //@ts-ignore
          return allSpac / (activeObject._objects.length - 1);
        }

        // 获取当前元素之前所有元素的高度
        function getItemLeft(i) {
          if (i === 0) return 0;
          var width = 0;
          for (var index = 0; index < i; index++) {
            //@ts-ignore
            width += getItemWidth(activeObject._objects[index]);
          }
          return width;
        }
        if (activeObject && activeObject.type === 'activeSelection') {
          var activeSelection = activeObject;
          // 排序
          // @ts-ignore
          activeSelection._objects.sort(function (a, b) {
            return a.left - b.left;
          });

          // 平均间距计算
          var itemSpac = spacWidth();
          // 组原点高度
          // @ts-ignore
          var yHeight = activeObject.width / 2;
          // @ts-ignore
          activeObject.forEachObject(function (item, i) {
            // 获取当前元素之前所有元素的高度
            var preHeight = getItemLeft(i);
            // 顶部距离 间距 * 索引 + 之前元素高度 - 原点高度
            var top = itemSpac * i + preHeight - yHeight;
            item.set('left', top);
          });
          canvas.renderAll();
        }
      }
    }
  }, {
    key: "yequation",
    value: function yequation() {
      var canvas = this.canvas;
      var activeObject = canvas.getActiveObject();
      if (activeObject) {
        // width属性不准确，需要坐标换算
        function getItemHeight(item) {
          return item.aCoords.bl.y - item.aCoords.tl.y;
        }
        // 获取所有元素高度
        function getAllItemHeight() {
          var count = 0;
          //@ts-ignore
          activeObject.forEachObject(function (item) {
            count += getItemHeight(item);
          });
          return count;
        }
        // 获取平均间距
        function spacHeight() {
          var count = getAllItemHeight();
          //@ts-ignore
          var allSpac = activeObject.height - count;
          //@ts-ignore
          return allSpac / (activeObject._objects.length - 1);
        }

        // 获取当前元素之前所有元素的高度
        function getItemTop(i) {
          if (i === 0) return 0;
          var height = 0;
          for (var index = 0; index < i; index++) {
            //@ts-ignore
            height += getItemHeight(activeObject._objects[index]);
          }
          return height;
        }
        if (activeObject && activeObject.type === 'activeSelection') {
          var activeSelection = activeObject;
          // 排序
          //@ts-ignore
          activeSelection._objects.sort(function (a, b) {
            return a.top - b.top;
          });

          // 平均间距计算
          var itemSpac = spacHeight();
          // 组原点高度
          //@ts-ignore
          var yHeight = activeObject.height / 2;

          //@ts-ignore
          activeObject.forEachObject(function (item, i) {
            // 获取当前元素之前所有元素的高度
            var preHeight = getItemTop(i);
            // 顶部距离 间距 * 索引 + 之前元素高度 - 原点高度
            var top = itemSpac * i + preHeight - yHeight;
            item.set('top', top);
          });
          canvas.renderAll();
        }
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      console.log('pluginDestroy');
    }
  }]);
  return GroupAlignPlugin;
}();
_defineProperty(GroupAlignPlugin, "pluginName", 'GroupAlignPlugin');
_defineProperty(GroupAlignPlugin, "apis", ['left', 'right', 'xcenter', 'ycenter', 'top', 'bottom', 'xequation', 'yequation']);
var _default = GroupAlignPlugin;
exports.default = _default;