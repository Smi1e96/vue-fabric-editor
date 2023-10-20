/*
 * @Description: 自定义事件的类型
 */

// 选择模式
export var SelectMode = /*#__PURE__*/function (SelectMode) {
  SelectMode["EMPTY"] = "";
  SelectMode["ONE"] = "one";
  SelectMode["MULTI"] = "multiple";
  return SelectMode;
}({});
export var SelectOneType = /*#__PURE__*/function (SelectOneType) {
  SelectOneType["EMPTY"] = "";
  SelectOneType["GROUP"] = "group";
  SelectOneType["POLYGON"] = "polygon";
  return SelectOneType;
}({});

// 选择事件（用于广播）
export var SelectEvent = /*#__PURE__*/function (SelectEvent) {
  SelectEvent["ONE"] = "selectOne";
  SelectEvent["MULTI"] = "selectMultiple";
  SelectEvent["CANCEL"] = "selectCancel";
  return SelectEvent;
}({});