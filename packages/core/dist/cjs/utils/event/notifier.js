"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.CanvasEventEmitter = void 0;
var _events = _interopRequireDefault(require("events"));
var _fabric = require("fabric");
var _types = require("./types");
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
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } /*
                                                                                                                                                                                                                                                                                                                                                                                               * @Author: 秦少卫
                                                                                                                                                                                                                                                                                                                                                                                               * @Date: 2022-09-03 19:16:55
                                                                                                                                                                                                                                                                                                                                                                                               * @LastEditors: 秦少卫
                                                                                                                                                                                                                                                                                                                                                                                               * @LastEditTime: 2023-02-09 13:17:11
                                                                                                                                                                                                                                                                                                                                                                                               * @Description: 自定义事件
                                                                                                                                                                                                                                                                                                                                                                                               */
/**
 * 发布订阅器
 */
var CanvasEventEmitter = /*#__PURE__*/function (_EventEmitter) {
  _inherits(CanvasEventEmitter, _EventEmitter);
  var _super = _createSuper(CanvasEventEmitter);
  function CanvasEventEmitter() {
    var _this;
    _classCallCheck(this, CanvasEventEmitter);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "handler", void 0);
    _defineProperty(_assertThisInitialized(_this), "mSelectMode", '');
    return _this;
  }
  _createClass(CanvasEventEmitter, [{
    key: "init",
    value: function init(handler) {
      var _this2 = this;
      this.handler = handler;
      if (this.handler) {
        this.handler.on('selection:created', function () {
          return _this2.selected();
        });
        this.handler.on('selection:updated', function () {
          return _this2.selected();
        });
        this.handler.on('selection:cleared', function () {
          return _this2.selected();
        });
      }
    }

    /**
     * 暴露单选多选事件
     * @private
     */
  }, {
    key: "selected",
    value: function selected() {
      if (!this.handler) {
        throw TypeError('还未初始化');
      }
      var actives = this.handler.getActiveObjects()
      //@ts-ignore
      .filter(function (item) {
        return !(item instanceof _fabric.fabric.GuideLine);
      }); // 过滤掉辅助线
      if (actives && actives.length === 1) {
        this.emit(_types.SelectEvent.ONE, actives);
      } else if (actives && actives.length > 1) {
        this.mSelectMode = 'multiple';
        this.emit(_types.SelectEvent.MULTI, actives);
      } else {
        this.emit(_types.SelectEvent.CANCEL);
      }
    }
  }]);
  return CanvasEventEmitter;
}(_events.default);
exports.CanvasEventEmitter = CanvasEventEmitter;
var _default = new CanvasEventEmitter();
exports.default = _default;