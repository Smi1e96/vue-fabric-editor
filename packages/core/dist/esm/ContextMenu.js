function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/* eslint-disable no-prototype-builtins */
/*
 * @Author: 秦少卫
 * @Date: 2023-05-25 22:33:23
 * @LastEditors: 秦少卫
 * @LastEditTime: 2023-05-25 23:06:29
 * @Description: 右键菜单
 */
/* Author: @UnrealSec */
// import '@/styles/contextMenu.css';
// @ts-nocheck
var ContextMenu = /*#__PURE__*/function () {
  function ContextMenu(container, items) {
    var _this = this;
    _classCallCheck(this, ContextMenu);
    this.container = container;
    this.dom = null;
    this.shown = false;
    this.root = true;
    this.parent = null;
    this.submenus = [];
    this.items = items;
    this._onclick = function (e) {
      if (_this.dom && e.target != _this.dom && e.target.parentElement != _this.dom && !e.target.classList.contains('item') && !e.target.parentElement.classList.contains('item')) {
        _this.hideAll();
      }
    };
    this._oncontextmenu = function (e) {
      e.preventDefault();
      if (e.target != _this.dom && e.target.parentElement != _this.dom && !e.target.classList.contains('item') && !e.target.parentElement.classList.contains('item')) {
        _this.hideAll();
        _this.show(e.clientX, e.clientY);
      }
    };
    this._oncontextmenu_keydown = function (e) {
      if (e.keyCode != 93) return;
      e.preventDefault();
      _this.hideAll();
      _this.show(e.clientX, e.clientY);
    };
    this._onblur = function () {
      _this.hideAll();
    };
  }
  _createClass(ContextMenu, [{
    key: "getMenuDom",
    value: function getMenuDom() {
      var menu = document.createElement('div');
      menu.classList.add('context');
      var _iterator = _createForOfIteratorHelper(this.items),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var item = _step.value;
          menu.appendChild(this.itemToDomEl(item));
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return menu;
    }
  }, {
    key: "itemToDomEl",
    value: function itemToDomEl(data) {
      var _this2 = this;
      var item = document.createElement('div');
      if (data === null) {
        item.classList = 'separator';
        return item;
      }
      if (data.hasOwnProperty('color') && /^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(data.color.toString())) {
        item.style.cssText = "color: ".concat(data.color);
      }
      item.classList.add('item');
      var label = document.createElement('span');
      label.classList = 'label';
      label.innerText = data.hasOwnProperty('text') ? data['text'].toString() : '';
      item.appendChild(label);
      if (data.hasOwnProperty('disabled') && data['disabled']) {
        item.classList.add('disabled');
      } else {
        item.classList.add('enabled');
      }
      var hotkey = document.createElement('span');
      hotkey.classList = 'hotkey';
      hotkey.innerText = data.hasOwnProperty('hotkey') ? data['hotkey'].toString() : '';
      item.appendChild(hotkey);
      if (data.hasOwnProperty('subitems') && Array.isArray(data['subitems']) && data['subitems'].length > 0) {
        var menu = new ContextMenu(this.container, data['subitems']);
        menu.root = false;
        menu.parent = this;
        var openSubItems = function openSubItems() {
          if (data.hasOwnProperty('disabled') && data['disabled'] == true) return;
          _this2.hideSubMenus();
          var x = _this2.dom.offsetLeft + _this2.dom.clientWidth + item.offsetLeft;
          var y = _this2.dom.offsetTop + item.offsetTop;
          if (!menu.shown) {
            menu.show(x, y);
          } else {
            menu.hide();
          }
        };
        this.submenus.push(menu);
        item.classList.add('has-subitems');
        item.addEventListener('click', openSubItems);
        item.addEventListener('mousemove', openSubItems);
      } else if (data.hasOwnProperty('submenu') && data['submenu'] instanceof ContextMenu) {
        var _menu = data['submenu'];
        _menu.root = false;
        _menu.parent = this;
        var _openSubItems = function _openSubItems() {
          if (data.hasOwnProperty('disabled') && data['disabled'] == true) return;
          _this2.hideSubMenus();
          var x = _this2.dom.offsetLeft + _this2.dom.clientWidth + item.offsetLeft;
          var y = _this2.dom.offsetTop + item.offsetTop;
          if (!_menu.shown) {
            _menu.show(x, y);
          } else {
            _menu.hide();
          }
        };
        this.submenus.push(_menu);
        item.classList.add('has-subitems');
        item.addEventListener('click', _openSubItems);
        item.addEventListener('mousemove', _openSubItems);
      } else {
        item.addEventListener('click', function () {
          _this2.hideSubMenus();
          if (item.classList.contains('disabled')) return;
          if (data.hasOwnProperty('onclick') && typeof data['onclick'] === 'function') {
            var event = {
              handled: false,
              item: item,
              label: label,
              hotkey: hotkey,
              items: _this2.items,
              data: data
            };
            data['onclick'](event);
            if (!event.handled) {
              _this2.hide();
            }
          } else {
            _this2.hide();
          }
        });
        item.addEventListener('mousemove', function () {
          _this2.hideSubMenus();
        });
      }
      return item;
    }
  }, {
    key: "hideAll",
    value: function hideAll() {
      if (this.root && !this.parent) {
        if (this.shown) {
          this.hideSubMenus();
          this.shown = false;
          this.container.removeChild(this.dom);
          if (this.parent && this.parent.shown) {
            this.parent.hide();
          }
        }
        return;
      }
      this.parent.hide();
    }
  }, {
    key: "hide",
    value: function hide() {
      if (this.dom && this.shown) {
        this.shown = false;
        this.hideSubMenus();
        this.container.removeChild(this.dom);
        if (this.parent && this.parent.shown) {
          this.parent.hide();
        }
      }
    }
  }, {
    key: "hideSubMenus",
    value: function hideSubMenus() {
      var _iterator2 = _createForOfIteratorHelper(this.submenus),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var menu = _step2.value;
          if (menu.shown) {
            menu.shown = false;
            menu.container.removeChild(menu.dom);
          }
          menu.hideSubMenus();
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  }, {
    key: "show",
    value: function show(x, y) {
      this.dom = this.getMenuDom();
      this.dom.style.left = "".concat(x, "px");
      this.dom.style.top = "".concat(y, "px");
      this.shown = true;
      this.container.appendChild(this.dom);
    }
  }, {
    key: "install",
    value: function install() {
      this.container.addEventListener('contextmenu', this._oncontextmenu);
      this.container.addEventListener('keydown', this._oncontextmenu_keydown);
      this.container.addEventListener('click', this._onclick);
      window.addEventListener('blur', this._onblur);
    }
  }, {
    key: "setData",
    value: function setData(data) {
      this.items = data;
    }
  }, {
    key: "uninstall",
    value: function uninstall() {
      this.dom = null;
      // this.container.removeEventListener('contextmenu', this._oncontextmenu);
      this.container.removeEventListener('keydown', this._oncontextmenu_keydown);
      this.container.removeEventListener('click', this._onclick);
      window.removeEventListener('blur', this._onblur);
    }
  }]);
  return ContextMenu;
}();
export default ContextMenu;