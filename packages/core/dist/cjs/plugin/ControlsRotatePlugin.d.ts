import Editor from '../core';
type IEditor = Editor;
declare class ControlsRotatePlugin {
    canvas: fabric.Canvas;
    editor: IEditor;
    static pluginName: string;
    constructor(canvas: fabric.Canvas, editor: IEditor);
    init(): void;
    destroy(): void;
}
export default ControlsRotatePlugin;
import { fabric } from 'fabric';
