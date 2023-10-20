"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var EditorWorkspacePlugin = /*#__PURE__*/function () {
  function EditorWorkspacePlugin(canvas, editor) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    _classCallCheck(this, EditorWorkspacePlugin);
    _defineProperty(this, "canvas", void 0);
    _defineProperty(this, "editor", void 0);
    _defineProperty(this, "defautOption", {
      color: 'red',
      size: 0.5
    });
    _defineProperty(this, "hotkeys", ['ctrl+v', 'ctrl+a']);
    this.canvas = canvas;
    this.editor = editor;
    this.defautOption = _objectSpread(_objectSpread({}, this.defautOption), options);
    this.init();
  }
  _createClass(EditorWorkspacePlugin, [{
    key: "init",
    value: function init() {
      console.log('pluginInit', this.canvas, this.editor, this.defautOption);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      console.log('pluginDestroy');
    }
    // 保存文件前
  }, {
    key: "hookSaveBefore",
    value: function hookSaveBefore() {
      console.log('pluginHookSaveBefore');
    }
    // 保存文件前
  }, {
    key: "hookSaveAfter",
    value: function hookSaveAfter() {
      console.log('pluginHookSaveAfter');
    }
    // 快捷键扩展回调
  }, {
    key: "hotkeyEvent",
    value: function hotkeyEvent(eventName, e) {
      console.log('pluginHotkeyEvent', eventName, e);
    }
    // 右键菜单扩展
  }, {
    key: "contextMenu",
    value: function contextMenu() {
      return [{
        text: 'Back',
        hotkey: 'Alt+Left arrow',
        disabled: true
      }, {
        text: 'Forward',
        hotkey: 'Alt+Right arrow',
        disabled: true
      }, {
        text: 'Reload',
        hotkey: 'Ctrl+R'
      }, null, {
        text: 'Save as...',
        hotkey: 'Ctrl+S'
      }, {
        text: 'Print...',
        hotkey: 'Ctrl+P'
      }, {
        text: 'Cast...'
      }, {
        text: 'Translate to English'
      }, null, {
        text: 'View page source',
        hotkey: 'Ctrl+U'
      }, {
        text: 'Inspect',
        hotkey: 'Ctrl+Shift+I'
      }, null, {
        text: 'Kali tools',
        hotkey: '❯',
        subitems: [{
          text: 'Fuzzing Tools',
          hotkey: '❯',
          subitems: [{
            text: 'spike-generic_chunked'
          }, {
            text: 'spike-generic_listen_tcp'
          }, {
            text: 'spike-generic_send_tcp'
          }, {
            text: 'spike-generic_send_udp'
          }]
        }, {
          text: 'VoIP Tools',
          hotkey: '❯',
          subitems: [{
            text: 'voiphopper'
          }]
        }, {
          text: 'nikto'
        }, {
          text: 'nmap'
        }, {
          text: 'sparta'
        }, {
          text: 'unix-privesc-check'
        }]
      }, {
        text: 'Skins',
        hotkey: '❯'
      }];
    }
  }, {
    key: "_command",
    value: function _command() {
      console.log('pluginContextMenuCommand');
    }
  }]);
  return EditorWorkspacePlugin;
}();
_defineProperty(EditorWorkspacePlugin, "pluginName", 'textPlugin');
_defineProperty(EditorWorkspacePlugin, "events", ['textEvent1', 'textEvent2']);
_defineProperty(EditorWorkspacePlugin, "apis", ['textAPI1', 'textAPI2']);
var _default = EditorWorkspacePlugin;
exports.default = _default;