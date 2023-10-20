"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _uuid = require("uuid");
var _utils = require("./utils/utils");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } /*
                                                                                                                                                                                                                                                                                                                                                                                               * @Author: 秦少卫
                                                                                                                                                                                                                                                                                                                                                                                               * @Date: 2023-06-20 12:52:09
                                                                                                                                                                                                                                                                                                                                                                                               * @LastEditors: 秦少卫
                                                                                                                                                                                                                                                                                                                                                                                               * @LastEditTime: 2023-07-29 21:32:54
                                                                                                                                                                                                                                                                                                                                                                                               * @Description: 内部插件
                                                                                                                                                                                                                                                                                                                                                                                               */
// import { v4 as uuid } from 'uuid';

function downFile(fileStr, fileType) {
  var anchorEl = document.createElement('a');
  anchorEl.href = fileStr;
  anchorEl.download = "".concat((0, _uuid.v4)(), ".").concat(fileType);
  document.body.appendChild(anchorEl); // required for firefox
  anchorEl.click();
  anchorEl.remove();
}
var ServersPlugin = /*#__PURE__*/function () {
  // public hotkeys: string[] = ['left', 'right', 'down', 'up'];
  function ServersPlugin(canvas, editor) {
    _classCallCheck(this, ServersPlugin);
    _defineProperty(this, "canvas", void 0);
    _defineProperty(this, "editor", void 0);
    this.canvas = canvas;
    this.editor = editor;
  }
  _createClass(ServersPlugin, [{
    key: "insert",
    value: function insert() {
      var _this = this;
      (0, _utils.selectFiles)({
        accept: '.json'
      }).then(function (files) {
        //@ts-ignore
        var _files = _slicedToArray(files, 1),
          file = _files[0];
        var reader = new FileReader();
        reader.readAsText(file, 'UTF-8');
        reader.onload = function () {
          _this.insertSvgFile(reader.result);
        };
      });
    }
  }, {
    key: "insertSvgFile",
    value: function insertSvgFile(jsonFile) {
      var _this2 = this;
      // 加载前钩子
      this.editor.hooksEntity.hookImportBefore.callAsync(jsonFile, function () {
        console.log(jsonFile, '2222');
        _this2.canvas.loadFromJSON(jsonFile, function () {
          console.log(jsonFile, '33333');
          _this2.canvas.renderAll();
          // 加载后钩子
          _this2.editor.hooksEntity.hookImportAfter.callAsync(jsonFile, function () {
            _this2.canvas.renderAll();
          });
        });
      });
    }
  }, {
    key: "getJson",
    value: function getJson() {
      return this.canvas.toJSON(['id', 'gradientAngle', 'selectable', 'hasControls']);
    }

    /**
     * @description: 拖拽添加到画布
     * @param {Event} event
     * @param {Object} item
     */
  }, {
    key: "dragAddItem",
    value: function dragAddItem(event, item) {
      var _this$canvas$getSelec = this.canvas.getSelectionElement().getBoundingClientRect(),
        left = _this$canvas$getSelec.left,
        top = _this$canvas$getSelec.top;
      if (event.x < left || event.y < top || item.width === undefined) return;
      var point = {
        x: event.x - left,
        y: event.y - top
      };
      var pointerVpt = this.canvas.restorePointerVpt(point);
      item.left = pointerVpt.x - item.width / 2;
      item.top = pointerVpt.y;
      this.canvas.add(item);
      this.canvas.requestRenderAll();
    }
  }, {
    key: "clipboard",
    value: function clipboard() {
      var jsonStr = this.getJson();
      (0, _utils.clipboardText)(JSON.stringify(jsonStr, null, '\t'));
    }
  }, {
    key: "saveJson",
    value: function saveJson() {
      var dataUrl = this.getJson();
      var fileStr = "data:text/json;charset=utf-8,".concat(encodeURIComponent(JSON.stringify(dataUrl, null, '\t')));
      downFile(fileStr, 'json');
    }
  }, {
    key: "saveSvg",
    value: function saveSvg() {
      var _this3 = this;
      this.editor.hooksEntity.hookSaveBefore.callAsync('', function () {
        var option = _this3._getSaveSvgOption();
        var dataUrl = _this3.canvas.toSVG(option);
        var fileStr = "data:image/svg+xml;charset=utf-8,".concat(encodeURIComponent(dataUrl));
        _this3.editor.hooksEntity.hookSaveAfter.callAsync(fileStr, function () {
          downFile(fileStr, 'svg');
        });
      });
    }
  }, {
    key: "saveImg",
    value: function saveImg() {
      var _this4 = this;
      this.editor.hooksEntity.hookSaveBefore.callAsync('', function () {
        var option = _this4._getSaveOption();
        _this4.canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
        var dataUrl = _this4.canvas.toDataURL(option);
        _this4.editor.hooksEntity.hookSaveAfter.callAsync(dataUrl, function () {
          downFile(dataUrl, 'png');
        });
      });
    }
  }, {
    key: "preview",
    value: function preview() {
      var _this5 = this;
      return new Promise(function (resolve) {
        _this5.editor.hooksEntity.hookSaveBefore.callAsync('', function () {
          var option = _this5._getSaveOption();
          _this5.canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
          _this5.canvas.renderAll();
          var dataUrl = _this5.canvas.toDataURL(option);
          _this5.editor.hooksEntity.hookSaveAfter.callAsync(dataUrl, function () {
            resolve(dataUrl);
          });
        });
      });
    }
  }, {
    key: "_getSaveSvgOption",
    value: function _getSaveSvgOption() {
      var workspace = this.canvas.getObjects().find(function (item) {
        return item.id === 'workspace';
      });
      //@ts-ignore
      var left = workspace.left,
        top = workspace.top,
        width = workspace.width,
        height = workspace.height;
      return {
        width: width,
        height: height,
        viewBox: {
          x: left,
          y: top,
          width: width,
          height: height
        }
      };
    }
  }, {
    key: "_getSaveOption",
    value: function _getSaveOption() {
      var workspace = this.canvas.getObjects().find(function (item) {
        return item.id === 'workspace';
      });
      var _ref = workspace,
        left = _ref.left,
        top = _ref.top,
        width = _ref.width,
        height = _ref.height;
      var option = {
        name: 'New Image',
        format: 'png',
        quality: 1,
        width: width,
        height: height,
        left: left,
        top: top
      };
      return option;
    }
  }, {
    key: "clear",
    value: function clear() {
      var _this6 = this;
      this.canvas.getObjects().forEach(function (obj) {
        if (obj.id !== 'workspace') {
          _this6.canvas.remove(obj);
        }
      });
      this.canvas.discardActiveObject();
      this.canvas.renderAll();
    }
  }, {
    key: "destroy",
    value: function destroy() {
      console.log('pluginDestroy');
    }
  }]);
  return ServersPlugin;
}();
_defineProperty(ServersPlugin, "pluginName", 'ServersPlugin');
_defineProperty(ServersPlugin, "apis", ['insert', 'insertSvgFile', 'getJson', 'dragAddItem', 'clipboard', 'saveJson', 'saveSvg', 'saveImg', 'clear', 'preview']);
var _default = ServersPlugin;
exports.default = _default;