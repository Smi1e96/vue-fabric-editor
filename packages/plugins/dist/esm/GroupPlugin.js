function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/*
 * @Author: 秦少卫
 * @Date: 2023-06-20 13:21:10
 * @LastEditors: 秦少卫
 * @LastEditTime: 2023-06-20 13:42:32
 * @Description: 组合拆分组合插件
 */

import { v4 as uuid } from 'uuid';
var GroupPlugin = /*#__PURE__*/function () {
  function GroupPlugin(canvas, editor) {
    _classCallCheck(this, GroupPlugin);
    _defineProperty(this, "canvas", void 0);
    _defineProperty(this, "editor", void 0);
    this.canvas = canvas;
    this.editor = editor;
  }

  // 拆分组
  _createClass(GroupPlugin, [{
    key: "unGroup",
    value: function unGroup() {
      var activeObject = this.canvas.getActiveObject();
      if (!activeObject) return;
      // 先获取当前选中的对象，然后打散
      activeObject.toActiveSelection();
      activeObject.getObjects().forEach(function (item) {
        item.set('id', uuid());
      });
      this.canvas.discardActiveObject().renderAll();
    }
  }, {
    key: "group",
    value: function group() {
      var _this = this;
      // 组合元素
      var activeObj = this.canvas.getActiveObject();
      if (!activeObj) return;
      var activegroup = activeObj.toGroup();
      var objectsInGroup = activegroup.getObjects();
      activegroup.clone(function (newgroup) {
        newgroup.set('id', uuid());
        _this.canvas.remove(activegroup);
        objectsInGroup.forEach(function (object) {
          _this.canvas.remove(object);
        });
        _this.canvas.add(newgroup);
        _this.canvas.setActiveObject(newgroup);
      });
    }
  }, {
    key: "contextMenu",
    value: function contextMenu() {
      var _this2 = this;
      var activeObject = this.canvas.getActiveObject();
      console.log(activeObject, '111');
      if (activeObject && activeObject.type === 'group') {
        return [{
          text: '拆分组合',
          hotkey: 'Ctrl+V',
          disabled: false,
          onclick: function onclick() {
            return _this2.unGroup();
          }
        }];
      }
      if (this.canvas.getActiveObjects().length > 1) {
        return [{
          text: '组合',
          hotkey: 'Ctrl+V',
          disabled: false,
          onclick: function onclick() {
            return _this2.group();
          }
        }];
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      console.log('pluginDestroy');
    }
  }]);
  return GroupPlugin;
}();
_defineProperty(GroupPlugin, "pluginName", 'GroupPlugin');
_defineProperty(GroupPlugin, "apis", ['unGroup', 'group']);
export default GroupPlugin;