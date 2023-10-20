"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _fabric = require("fabric");
var _uuid = require("uuid");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } /*
                                                                                                                                                                                                                                                                                                                                                                                               * @Author: 秦少卫
                                                                                                                                                                                                                                                                                                                                                                                               * @Date: 2023-06-22 16:11:40
                                                                                                                                                                                                                                                                                                                                                                                               * @LastEditors: 秦少卫
                                                                                                                                                                                                                                                                                                                                                                                               * @LastEditTime: 2023-08-07 23:24:36
                                                                                                                                                                                                                                                                                                                                                                                               * @Description: 组内文字编辑
                                                                                                                                                                                                                                                                                                                                                                                               */
var GroupTextEditorPlugin = /*#__PURE__*/function () {
  function GroupTextEditorPlugin(canvas, editor) {
    _classCallCheck(this, GroupTextEditorPlugin);
    _defineProperty(this, "canvas", void 0);
    _defineProperty(this, "editor", void 0);
    _defineProperty(this, "isDown", false);
    this.canvas = canvas;
    this.editor = editor;
    this._init();
  }

  // 组内文本输入
  _createClass(GroupTextEditorPlugin, [{
    key: "_init",
    value: function _init() {
      var _this = this;
      this.canvas.on('mouse:down', function (opt) {
        _this.isDown = true;
        // 重置选中controls
        if (opt.target && !opt.target.lockMovementX && !opt.target.lockMovementY && !opt.target.lockRotation && !opt.target.lockScalingX && !opt.target.lockScalingY) {
          opt.target.hasControls = true;
        }
      });
      this.canvas.on('mouse:up', function () {
        _this.isDown = false;
      });
      this.canvas.on('mouse:dblclick', function (opt) {
        if (opt.target && opt.target.type === 'group') {
          var selectedObject = _this._getGroupObj(opt);
          if (!selectedObject) return;
          selectedObject.selectable = true;
          // 由于组内的元素，双击以后会导致controls偏移，因此隐藏他
          if (selectedObject.hasControls) {
            selectedObject.hasControls = false;
          }
          if (_this.isText(selectedObject)) {
            _this._bedingTextEditingEvent(selectedObject, opt);
            return;
          }
          _this.canvas.setActiveObject(selectedObject);
          _this.canvas.renderAll();
        }
      });
    }

    // 获取点击区域内的组内文字元素
  }, {
    key: "_getGroupTextObj",
    value: function _getGroupTextObj(opt) {
      var _opt$target;
      var pointer = this.canvas.getPointer(opt.e, true);
      //@ts-ignore
      var clickObj = this.canvas._searchPossibleTargets((_opt$target = opt.target) === null || _opt$target === void 0 ? void 0 : _opt$target._objects, pointer);
      if (clickObj && this.isText(clickObj)) {
        return clickObj;
      }
      return false;
    }
  }, {
    key: "_getGroupObj",
    value: function _getGroupObj(opt) {
      var _opt$target2;
      var pointer = this.canvas.getPointer(opt.e, true);
      //@ts-ignore
      var clickObj = this.canvas._searchPossibleTargets((_opt$target2 = opt.target) === null || _opt$target2 === void 0 ? void 0 : _opt$target2._objects, pointer);
      return clickObj;
    }

    // 通过组合重新组装来编辑文字，可能会耗性能。
  }, {
    key: "_bedingTextEditingEvent",
    value: function _bedingTextEditingEvent(textObject, opt) {
      var _this2 = this;
      if (!opt.target) return;
      var textObjectJSON = textObject.toObject();
      var groupObj = opt.target;
      var ftype = {
        'i-text': 'IText',
        text: 'Text',
        textbox: 'Textbox'
      };
      var eltype = ftype[textObjectJSON.type];
      var groupMatrix = groupObj.calcTransformMatrix();
      var a = groupMatrix[0];
      var b = groupMatrix[1];
      var c = groupMatrix[2];
      var d = groupMatrix[3];
      var e = groupMatrix[4];
      var f = groupMatrix[5];
      if (textObject) {
        //@ts-ignore
        var newX = a * textObject.left + c * textObject.top + e;
        //@ts-ignore
        var newY = b * textObject.left + d * textObject.top + f;

        //@ts-ignore
        var tempText = new _fabric.fabric[eltype](textObject.text, _objectSpread(_objectSpread({}, textObjectJSON), {}, {
          textAlign: textObject.textAlign,
          left: newX,
          top: newY,
          styles: textObject.styles,
          groupCopyed: textObject.group
        }));
        tempText.id = (0, _uuid.v4)();
        textObject.visible = false;
        //@ts-ignore
        opt.target.addWithUpdate();
        tempText.visible = true;
        tempText.selectable = true;
        tempText.hasConstrols = false;
        tempText.editable = true;
        this.canvas.add(tempText);
        this.canvas.setActiveObject(tempText);
        tempText.enterEditing();
        tempText.selectAll();
        tempText.on('editing:exited', function () {
          // 进入编辑模式时触发
          textObject.set({
            text: tempText.text,
            visible: true
          });
          //@ts-ignore
          opt.target.addWithUpdate();
          tempText.visible = false;
          _this2.canvas.remove(tempText);
          //@ts-ignore
          _this2.canvas.setActiveObject(opt.target);
        });
      }
    }

    // 绑定编辑取消事件
  }, {
    key: "_bedingEditingEvent",
    value: function _bedingEditingEvent(textObject, opt) {
      var _this3 = this;
      if (!opt.target) return;
      var left = opt.target.left;
      var top = opt.target.top;
      var ids = this._unGroup() || [];
      var resetGroup = function resetGroup() {
        var groupArr = _this3.canvas.getObjects().filter(function (item) {
          return item.id && ids.includes(item.id);
        });
        // 删除元素
        groupArr.forEach(function (item) {
          return _this3.canvas.remove(item);
        });

        // 生成新组
        var group = new _fabric.fabric.Group(_toConsumableArray(groupArr));
        group.set('left', left);
        group.set('top', top);
        group.set('id', (0, _uuid.v4)());
        textObject.off('editing:exited', resetGroup);
        _this3.canvas.add(group);
        _this3.canvas.discardActiveObject().renderAll();
      };
      // 绑定取消事件
      textObject.on('editing:exited', resetGroup);
    }

    // 拆分组合并返回ID
  }, {
    key: "_unGroup",
    value: function _unGroup() {
      var ids = [];
      var activeObj = this.canvas.getActiveObject();
      if (!activeObj) return;
      activeObj.getObjects().forEach(function (item) {
        var id = (0, _uuid.v4)();
        ids.push(id);
        item.set('id', id);
      });
      activeObj.toActiveSelection();
      return ids;
    }
  }, {
    key: "isText",
    value: function isText(obj) {
      return obj.type && ['i-text', 'text', 'textbox'].includes(obj.type);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      console.log('pluginDestroy');
    }
  }]);
  return GroupTextEditorPlugin;
}();
_defineProperty(GroupTextEditorPlugin, "pluginName", 'GroupTextEditorPlugin');
var _default = GroupTextEditorPlugin;
exports.default = _default;