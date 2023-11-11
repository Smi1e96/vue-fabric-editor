"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _events = _interopRequireDefault(require("events"));
var _hotkeysJs = _interopRequireDefault(require("hotkeys-js"));
var _ContextMenu = _interopRequireDefault(require("./ContextMenu"));
var _ServersPlugin = _interopRequireDefault(require("./ServersPlugin"));
var _tapable = require("tapable");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Editor = /*#__PURE__*/function (_EventEmitter) {
  _inherits(Editor, _EventEmitter);
  var _super = _createSuper(Editor);
  function Editor(canvas) {
    var _this;
    _classCallCheck(this, Editor);
    _this = _super.call(this);
    _defineProperty(_assertThisInitialized(_this), "canvas", void 0);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _defineProperty(_assertThisInitialized(_this), "contextMenu", void 0);
    _defineProperty(_assertThisInitialized(_this), "pluginMap", {});
    // 自定义事件
    _defineProperty(_assertThisInitialized(_this), "customEvents", []);
    // 自定义API
    _defineProperty(_assertThisInitialized(_this), "customApis", []);
    // 生命周期函数名
    _defineProperty(_assertThisInitialized(_this), "hooks", ['hookImportBefore', 'hookImportAfter', 'hookSaveBefore', 'hookSaveAfter']);
    _defineProperty(_assertThisInitialized(_this), "hooksEntity", {});
    _this.canvas = canvas;
    // this._initContextMenu();
    // this._bindContextMenu();
    // this._initActionHooks();
    // this._initServersPlugin();
    return _this;
  }
  _createClass(Editor, [{
    key: "init",
    value: function init(canvas) {
      this.canvas = canvas;
      this._initContextMenu();
      this._bindContextMenu();
      this._initActionHooks();
      this._initServersPlugin();
    }

    // 引入组件
  }, {
    key: "use",
    value: function use(plugin, options) {
      if (this._checkPlugin(plugin)) {
        this._saveCustomAttr(plugin);
        var pluginRunTime = new plugin(this.canvas, this, options);
        this.pluginMap[plugin.pluginName] = pluginRunTime;
        this._bindingHooks(pluginRunTime);
        this._bindingHotkeys(pluginRunTime);
        this._bindingApis(pluginRunTime);
      }
    }

    // 获取插件
  }, {
    key: "getPlugin",
    value: function getPlugin(name) {
      if (this.pluginMap[name]) {
        return this.pluginMap[name];
      }
    }

    // 检查组件
  }, {
    key: "_checkPlugin",
    value: function _checkPlugin(plugin) {
      var _this2 = this;
      var pluginName = plugin.pluginName,
        _plugin$events = plugin.events,
        events = _plugin$events === void 0 ? [] : _plugin$events,
        _plugin$apis = plugin.apis,
        apis = _plugin$apis === void 0 ? [] : _plugin$apis;
      //名称检查
      if (this.pluginMap[pluginName]) {
        throw new Error(pluginName + '插件重复初始化');
      }
      events.forEach(function (eventName) {
        if (_this2.customEvents.find(function (info) {
          return info === eventName;
        })) {
          throw new Error(pluginName + '插件中' + eventName + '重复');
        }
      });
      apis.forEach(function (apiName) {
        if (_this2.customApis.find(function (info) {
          return info === apiName;
        })) {
          throw new Error(pluginName + '插件中' + apiName + '重复');
        }
      });
      return true;
    }

    // 绑定hooks方法
  }, {
    key: "_bindingHooks",
    value: function _bindingHooks(plugin) {
      var _this3 = this;
      this.hooks.forEach(function (hookName) {
        var hook = plugin[hookName];
        if (hook) {
          _this3.hooksEntity[hookName].tapPromise(plugin.pluginName + hookName, function () {
            // eslint-disable-next-line prefer-rest-params
            return hook.apply(plugin, Array.prototype.slice.call(arguments));
          });
        }
      });
    }

    // 绑定快捷键
  }, {
    key: "_bindingHotkeys",
    value: function _bindingHotkeys(plugin) {
      var _plugin$hotkeys;
      plugin === null || plugin === void 0 ? void 0 : (_plugin$hotkeys = plugin.hotkeys) === null || _plugin$hotkeys === void 0 ? void 0 : _plugin$hotkeys.forEach(function (keyName) {
        // 支持 keyup
        (0, _hotkeysJs.default)(keyName, {
          keyup: true
        }, function (e) {
          return plugin.hotkeyEvent(keyName, e);
        });
      });
    }

    // 保存组件自定义事件与API
  }, {
    key: "_saveCustomAttr",
    value: function _saveCustomAttr(plugin) {
      var _plugin$events2 = plugin.events,
        events = _plugin$events2 === void 0 ? [] : _plugin$events2,
        _plugin$apis2 = plugin.apis,
        apis = _plugin$apis2 === void 0 ? [] : _plugin$apis2;
      this.customApis = this.customApis.concat(apis);
      this.customEvents = this.customEvents.concat(events);
    }

    // 代理API事件
  }, {
    key: "_bindingApis",
    value: function _bindingApis(pluginRunTime) {
      var _this4 = this;
      var _ref = pluginRunTime.constructor,
        _ref$apis = _ref.apis,
        apis = _ref$apis === void 0 ? [] : _ref$apis;
      apis.forEach(function (apiName) {
        _this4[apiName] = function () {
          // eslint-disable-next-line prefer-rest-params
          return pluginRunTime[apiName].apply(pluginRunTime, Array.prototype.slice.call(arguments));
        };
      });
    }

    // 右键菜单
  }, {
    key: "_bindContextMenu",
    value: function _bindContextMenu() {
      var _this5 = this;
      this.canvas.on('mouse:down', function (opt) {
        if (opt.button === 3) {
          var menu = [];
          Object.keys(_this5.pluginMap).forEach(function (pluginName) {
            var pluginRunTime = _this5.pluginMap[pluginName];
            var pluginMenu = pluginRunTime.contextMenu && pluginRunTime.contextMenu();
            if (pluginMenu) {
              menu = menu.concat(pluginMenu);
            }
          });
          _this5._renderMenu(opt, menu);
        }
      });
    }

    // 渲染右键菜单
  }, {
    key: "_renderMenu",
    value: function _renderMenu(opt, menu) {
      if (menu.length !== 0) {
        this.contextMenu.hideAll();
        this.contextMenu.setData(menu);
        var _ref2 = opt.e,
          clientX = _ref2.clientX,
          clientY = _ref2.clientY;
        this.contextMenu.show(clientX, clientY);
      }
    }

    // 生命周期事件
  }, {
    key: "_initActionHooks",
    value: function _initActionHooks() {
      var _this6 = this;
      this.hooks.forEach(function (hookName) {
        _this6.hooksEntity[hookName] = new _tapable.AsyncSeriesHook(['data']);
      });
    }
  }, {
    key: "_initContextMenu",
    value: function _initContextMenu() {
      // @ts-ignore
      this.contextMenu = new _ContextMenu.default(this.canvas.wrapperEl, []);
      this.contextMenu.install();
    }
  }, {
    key: "_initServersPlugin",
    value: function _initServersPlugin() {
      // @ts-ignore
      this.use(_ServersPlugin.default, {});
    }
  }]);
  return Editor;
}(_events.default);
var _default = Editor;
exports.default = _default;