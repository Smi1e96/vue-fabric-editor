"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "AlignGuidLinePlugin", {
  enumerable: true,
  get: function get() {
    return _AlignGuidLinePlugin.default;
  }
});
Object.defineProperty(exports, "CenterAlignPlugin", {
  enumerable: true,
  get: function get() {
    return _CenterAlignPlugin.default;
  }
});
Object.defineProperty(exports, "ControlsPlugin", {
  enumerable: true,
  get: function get() {
    return _ControlsPlugin.default;
  }
});
Object.defineProperty(exports, "ControlsRotatePlugin", {
  enumerable: true,
  get: function get() {
    return _ControlsRotatePlugin.default;
  }
});
Object.defineProperty(exports, "CopyPlugin", {
  enumerable: true,
  get: function get() {
    return _CopyPlugin.default;
  }
});
Object.defineProperty(exports, "DeleteHotKeyPlugin", {
  enumerable: true,
  get: function get() {
    return _DeleteHotKeyPlugin.default;
  }
});
Object.defineProperty(exports, "DownFontPlugin", {
  enumerable: true,
  get: function get() {
    return _DownFontPlugin.default;
  }
});
Object.defineProperty(exports, "DrawLinePlugin", {
  enumerable: true,
  get: function get() {
    return _DrawLinePlugin.default;
  }
});
Object.defineProperty(exports, "DringPlugin", {
  enumerable: true,
  get: function get() {
    return _DringPlugin.default;
  }
});
Object.defineProperty(exports, "FlipPlugin", {
  enumerable: true,
  get: function get() {
    return _FlipPlugin.default;
  }
});
Object.defineProperty(exports, "GroupAlignPlugin", {
  enumerable: true,
  get: function get() {
    return _GroupAlignPlugin.default;
  }
});
Object.defineProperty(exports, "GroupPlugin", {
  enumerable: true,
  get: function get() {
    return _GroupPlugin.default;
  }
});
Object.defineProperty(exports, "GroupTextEditorPlugin", {
  enumerable: true,
  get: function get() {
    return _GroupTextEditorPlugin.default;
  }
});
Object.defineProperty(exports, "HistoryPlugin", {
  enumerable: true,
  get: function get() {
    return _HistoryPlugin.default;
  }
});
Object.defineProperty(exports, "LayerPlugin", {
  enumerable: true,
  get: function get() {
    return _LayerPlugin.default;
  }
});
Object.defineProperty(exports, "MaterialPlugin", {
  enumerable: true,
  get: function get() {
    return _MaterialPlugin.default;
  }
});
Object.defineProperty(exports, "MoveHotKeyPlugin", {
  enumerable: true,
  get: function get() {
    return _MoveHotKeyPlugin.default;
  }
});
Object.defineProperty(exports, "RulerPlugin", {
  enumerable: true,
  get: function get() {
    return _RulerPlugin.default;
  }
});
Object.defineProperty(exports, "WorkspacePlugin", {
  enumerable: true,
  get: function get() {
    return _WorkspacePlugin.default;
  }
});
exports.default = void 0;
var _core = _interopRequireDefault(require("./core"));
var _DringPlugin = _interopRequireDefault(require("./plugin/DringPlugin"));
var _AlignGuidLinePlugin = _interopRequireDefault(require("./plugin/AlignGuidLinePlugin"));
var _ControlsPlugin = _interopRequireDefault(require("./plugin/ControlsPlugin"));
var _ControlsRotatePlugin = _interopRequireDefault(require("./plugin/ControlsRotatePlugin"));
var _CenterAlignPlugin = _interopRequireDefault(require("./plugin/CenterAlignPlugin"));
var _LayerPlugin = _interopRequireDefault(require("./plugin/LayerPlugin"));
var _CopyPlugin = _interopRequireDefault(require("./plugin/CopyPlugin"));
var _MoveHotKeyPlugin = _interopRequireDefault(require("./plugin/MoveHotKeyPlugin"));
var _DeleteHotKeyPlugin = _interopRequireDefault(require("./plugin/DeleteHotKeyPlugin"));
var _GroupPlugin = _interopRequireDefault(require("./plugin/GroupPlugin"));
var _DrawLinePlugin = _interopRequireDefault(require("./plugin/DrawLinePlugin"));
var _GroupTextEditorPlugin = _interopRequireDefault(require("./plugin/GroupTextEditorPlugin"));
var _GroupAlignPlugin = _interopRequireDefault(require("./plugin/GroupAlignPlugin"));
var _WorkspacePlugin = _interopRequireDefault(require("./plugin/WorkspacePlugin"));
var _DownFontPlugin = _interopRequireDefault(require("./plugin/DownFontPlugin"));
var _HistoryPlugin = _interopRequireDefault(require("./plugin/HistoryPlugin"));
var _FlipPlugin = _interopRequireDefault(require("./plugin/FlipPlugin"));
var _RulerPlugin = _interopRequireDefault(require("./plugin/RulerPlugin"));
var _MaterialPlugin = _interopRequireDefault(require("./plugin/MaterialPlugin"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 * @Author: 秦少卫
 * @Date: 2023-02-03 23:29:34
 * @LastEditors: 秦少卫
 * @LastEditTime: 2023-08-04 21:22:27
 * @Description: 核心入口文件
 */
var _default = _core.default;
exports.default = _default;