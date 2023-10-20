import { fabric } from 'fabric';
import Editor from '@fabric-editor/core';
type IEditor = Editor;
declare class DeleteHotKeyPlugin {
    canvas: fabric.Canvas;
    editor: IEditor;
    static pluginName: string;
    static apis: string[];
    hotkeys: string[];
    constructor(canvas: fabric.Canvas, editor: IEditor);
    hotkeyEvent(eventName: string, e: any): void;
    del(): void;
    contextMenu(): ({
        text: string;
        hotkey: string;
        disabled: boolean;
        onclick: () => void;
    } | null)[] | undefined;
    destroy(): void;
}
export default DeleteHotKeyPlugin;
