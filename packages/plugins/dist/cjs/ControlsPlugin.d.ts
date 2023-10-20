import Editor from '@fabric-editor/core';
type IEditor = Editor;
import { fabric } from 'fabric';
declare class ControlsPlugin {
    canvas: fabric.Canvas;
    editor: IEditor;
    static pluginName: string;
    constructor(canvas: fabric.Canvas, editor: IEditor);
    init(): void;
    destroy(): void;
}
export default ControlsPlugin;
