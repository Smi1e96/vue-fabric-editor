import { fabric } from 'fabric';
import Editor from '../core';
type IEditor = Editor;
declare class HistoryPlugin {
    canvas: fabric.Canvas;
    editor: IEditor;
    static pluginName: string;
    static apis: string[];
    static events: string[];
    hotkeys: string[];
    history: any;
    constructor(canvas: fabric.Canvas, editor: IEditor);
    _init(): void;
    getHistory(): any;
    _save(event: any): void;
    undo(): void;
    redo(): void;
    renderCanvas: () => void;
    hotkeyEvent(eventName: string, e: any): void;
    destroy(): void;
}
export default HistoryPlugin;
