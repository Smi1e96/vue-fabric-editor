import { fabric } from 'fabric';
import Editor from '../core';
type IEditor = Editor;
declare class MoveHotKeyPlugin {
    canvas: fabric.Canvas;
    editor: IEditor;
    static pluginName: string;
    hotkeys: string[];
    constructor(canvas: fabric.Canvas, editor: IEditor);
    hotkeyEvent(eventName: string, e: any): void;
    destroy(): void;
}
export default MoveHotKeyPlugin;
