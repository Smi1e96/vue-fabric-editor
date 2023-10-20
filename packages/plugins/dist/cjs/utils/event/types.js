"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectOneType = exports.SelectMode = exports.SelectEvent = void 0;
/*
 * @Description: 自定义事件的类型
 */
// 选择模式
var SelectMode = /*#__PURE__*/function (SelectMode) {
  SelectMode["EMPTY"] = "";
  SelectMode["ONE"] = "one";
  SelectMode["MULTI"] = "multiple";
  return SelectMode;
}({});
exports.SelectMode = SelectMode;
var SelectOneType = /*#__PURE__*/function (SelectOneType) {
  SelectOneType["EMPTY"] = "";
  SelectOneType["GROUP"] = "group";
  SelectOneType["POLYGON"] = "polygon";
  return SelectOneType;
}({}); // 选择事件（用于广播）
exports.SelectOneType = SelectOneType;
var SelectEvent = /*#__PURE__*/function (SelectEvent) {
  SelectEvent["ONE"] = "selectOne";
  SelectEvent["MULTI"] = "selectMultiple";
  SelectEvent["CANCEL"] = "selectCancel";
  return SelectEvent;
}({});
exports.SelectEvent = SelectEvent;