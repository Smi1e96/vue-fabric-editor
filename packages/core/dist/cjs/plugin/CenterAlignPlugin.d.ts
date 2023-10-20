import { fabric } from 'fabric';
import Editor from '../core';
type IEditor = Editor;
declare class CenterAlignPlugin {
    canvas: fabric.Canvas;
    editor: IEditor;
    static pluginName: string;
    static apis: string[];
    constructor(canvas: fabric.Canvas, editor: IEditor);
    center(workspace: fabric.Rect, object: fabric.Object): fabric.Canvas;
    centerV(workspace: fabric.Rect, object: fabric.Object): fabric.Canvas;
    centerH(workspace: fabric.Rect, object: fabric.Object): fabric.Canvas;
    position(name: 'centerH' | 'center' | 'centerV'): void;
    contextMenu(): {
        text: string;
        hotkey: string;
        disabled: boolean;
        onclick: () => void;
    }[] | undefined;
    destroy(): void;
}
export default CenterAlignPlugin;
