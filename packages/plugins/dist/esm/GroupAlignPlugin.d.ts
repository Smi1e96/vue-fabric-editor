import { fabric } from 'fabric';
import Editor from '@fabric-editor/core';
type IEditor = Editor;
declare class GroupAlignPlugin {
    canvas: fabric.Canvas;
    editor: IEditor;
    static pluginName: string;
    static apis: string[];
    constructor(canvas: fabric.Canvas, editor: IEditor);
    left(): void;
    right(): void;
    xcenter(): void;
    ycenter(): void;
    top(): void;
    bottom(): void;
    xequation(): void;
    yequation(): void;
    destroy(): void;
}
export default GroupAlignPlugin;
