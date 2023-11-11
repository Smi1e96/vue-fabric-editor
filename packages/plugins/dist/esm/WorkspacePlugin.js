function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/*
 * @Author: 秦少卫
 * @Date: 2023-06-27 12:26:41
 * @LastEditors: 秦少卫
 * @LastEditTime: 2023-07-05 00:34:38
 * @Description: 画布区域插件
 */

import { fabric } from 'fabric';
import { throttle } from 'lodash-es';
var WorkspacePlugin = /*#__PURE__*/function () {
  function WorkspacePlugin(canvas, editor) {
    _classCallCheck(this, WorkspacePlugin);
    _defineProperty(this, "canvas", void 0);
    _defineProperty(this, "editor", void 0);
    _defineProperty(this, "workspaceEl", null);
    _defineProperty(this, "workspace", null);
    _defineProperty(this, "option", void 0);
    this.canvas = canvas;
    this.editor = editor;
    this.init({
      width: 1920,
      height: 1080
    });
  }
  _createClass(WorkspacePlugin, [{
    key: "init",
    value: function init(option) {
      var workspaceEl = document.querySelector('#workspace');
      if (!workspaceEl) {
        throw new Error('element #workspace is missing, plz check!');
      }
      console.log('======');
      this.workspaceEl = workspaceEl;
      this.workspace = null;
      this.option = option;
      this._initBackground();
      this._initWorkspace();
      this._initResizeObserve();
      this._bindWheel();
    }

    // hookImportBefore() {
    //   return new Promise((resolve, reject) => {
    //     resolve();
    //   });
    // }
  }, {
    key: "hookImportAfter",
    value: function hookImportAfter() {
      var _this = this;
      return new Promise(function (resolve) {
        var workspace = _this.canvas.getObjects().find(function (item) {
          return item.id === 'workspace';
        });
        if (workspace) {
          workspace.set('selectable', false);
          workspace.set('hasControls', false);
          //@ts-ignore
          _this.setSize(workspace.width, workspace.height);
          _this.editor.emit('sizeChange', workspace.width, workspace.height);
        }
        resolve(true);
      });
    }
  }, {
    key: "hookSaveAfter",
    value: function hookSaveAfter() {
      var _this2 = this;
      return new Promise(function (resolve) {
        _this2.auto();
        resolve(true);
      });
    }

    // 初始化背景
  }, {
    key: "_initBackground",
    value: function _initBackground() {
      this.canvas.backgroundImage = '';
      if (this.workspaceEl) {
        this.canvas.setWidth(this.workspaceEl.offsetWidth);
        this.canvas.setHeight(this.workspaceEl.offsetHeight);
      }
    }

    // 初始化画布
  }, {
    key: "_initWorkspace",
    value: function _initWorkspace() {
      var _this$option = this.option,
        width = _this$option.width,
        height = _this$option.height;
      console.log('_initWorkspace', width);
      var workspace = new fabric.Rect({
        fill: 'rgba(255,255,255,1)',
        width: width,
        height: height,
        id: 'workspace'
      });
      workspace.set('selectable', false);
      workspace.set('hasControls', false);
      workspace.hoverCursor = 'default';
      this.canvas.add(workspace);
      this.canvas.renderAll();
      this.workspace = workspace;
      this.auto();
    }

    /**
     * 设置画布中心到指定对象中心点上
     * @param {Object} obj 指定的对象
     */
  }, {
    key: "setCenterFromObject",
    value: function setCenterFromObject(obj) {
      var canvas = this.canvas;
      var objCenter = obj.getCenterPoint();
      var viewportTransform = canvas.viewportTransform;
      if (canvas.width === undefined || canvas.height === undefined || !viewportTransform) return;
      viewportTransform[4] = canvas.width / 2 - objCenter.x * viewportTransform[0];
      viewportTransform[5] = canvas.height / 2 - objCenter.y * viewportTransform[3];
      canvas.setViewportTransform(viewportTransform);
      canvas.renderAll();
    }

    // 初始化监听器
  }, {
    key: "_initResizeObserve",
    value: function _initResizeObserve() {
      var _this3 = this;
      var resizeObserver = new ResizeObserver(throttle(function () {
        _this3.auto();
      }, 50));
      if (this.workspaceEl) {
        resizeObserver.observe(this.workspaceEl);
      }
    }
  }, {
    key: "setSize",
    value: function setSize(width, height) {
      this._initBackground();
      this.option.width = width;
      this.option.height = height;
      // 重新设置workspace
      this.workspace = this.canvas.getObjects().find(function (item) {
        return item.id === 'workspace';
      });
      this.workspace.set('width', width);
      this.workspace.set('height', height);
      this.auto();
    }
  }, {
    key: "setZoomAuto",
    value: function setZoomAuto(scale, cb) {
      var _this4 = this;
      var workspaceEl = this.workspaceEl;
      if (workspaceEl) {
        var width = workspaceEl.offsetWidth;
        var height = workspaceEl.offsetHeight;
        this.canvas.setWidth(width);
        this.canvas.setHeight(height);
        var center = this.canvas.getCenter();
        this.canvas.setViewportTransform(fabric.iMatrix.concat());
        this.canvas.zoomToPoint(new fabric.Point(center.left, center.top), scale);
        if (!this.workspace) return;
        this.setCenterFromObject(this.workspace);

        // 超出画布不展示
        this.workspace.clone(function (cloned) {
          _this4.canvas.clipPath = cloned;
          _this4.canvas.requestRenderAll();
        });
        if (cb) cb(this.workspace.left, this.workspace.top);
      }
    }
  }, {
    key: "_getScale",
    value: function _getScale() {
      if (this.workspaceEl) {
        var viewPortWidth = this.workspaceEl.offsetWidth;
        var viewPortHeight = this.workspaceEl.offsetHeight;
        // 按照宽度
        if (viewPortWidth / viewPortHeight < this.option.width / this.option.height) {
          return viewPortWidth / this.option.width;
        } // 按照宽度缩放
        return viewPortHeight / this.option.height;
      }
    }

    // 放大
  }, {
    key: "big",
    value: function big() {
      var zoomRatio = this.canvas.getZoom();
      zoomRatio += 0.05;
      var center = this.canvas.getCenter();
      this.canvas.zoomToPoint(new fabric.Point(center.left, center.top), zoomRatio);
    }

    // 缩小
  }, {
    key: "small",
    value: function small() {
      var zoomRatio = this.canvas.getZoom();
      zoomRatio -= 0.05;
      var center = this.canvas.getCenter();
      this.canvas.zoomToPoint(new fabric.Point(center.left, center.top), zoomRatio < 0 ? 0.01 : zoomRatio);
    }

    // 自动缩放
  }, {
    key: "auto",
    value: function auto() {
      var scale = this._getScale();
      if (scale !== undefined) {
        this.setZoomAuto(scale - 0.08);
      }
    }

    // 1:1 放大
  }, {
    key: "one",
    value: function one() {
      this.setZoomAuto(0.8 - 0.08);
      this.canvas.requestRenderAll();
    }
  }, {
    key: "_bindWheel",
    value: function _bindWheel() {
      this.canvas.on('mouse:wheel', function (opt) {
        var delta = opt.e.deltaY;
        var zoom = this.getZoom();
        zoom *= Math.pow(0.999, delta);
        if (zoom > 20) zoom = 20;
        if (zoom < 0.01) zoom = 0.01;
        var center = this.getCenter();
        this.zoomToPoint(new fabric.Point(center.left, center.top), zoom);
        opt.e.preventDefault();
        opt.e.stopPropagation();
      });
    }
  }, {
    key: "destroy",
    value: function destroy() {
      console.log('pluginDestroy');
    }
  }]);
  return WorkspacePlugin;
}();
_defineProperty(WorkspacePlugin, "pluginName", 'WorkspacePlugin');
_defineProperty(WorkspacePlugin, "events", ['sizeChange']);
_defineProperty(WorkspacePlugin, "apis", ['big', 'small', 'auto', 'one', 'setSize']);
export default WorkspacePlugin;