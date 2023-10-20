import { fabric } from 'fabric';
import Editor from '@fabric-editor/core';
type IEditor = Editor;
declare class DownFontPlugin {
    canvas: fabric.Canvas;
    editor: IEditor;
    static pluginName: string;
    constructor(canvas: fabric.Canvas, editor: IEditor);
    hookImportBefore(json: string): Promise<void[]>;
    destroy(): void;
}
export default DownFontPlugin;
