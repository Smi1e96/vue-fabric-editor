import { fabric } from 'fabric';
import Editor from '@fabric-editor/core';
type IEditor = Editor;
declare class CopyPlugin {
    canvas: fabric.Canvas;
    editor: IEditor;
    static pluginName: string;
    static apis: string[];
    hotkeys: string[];
    private cache;
    constructor(canvas: fabric.Canvas, editor: IEditor);
    _copyActiveSelection(activeObject: fabric.Object): void;
    _copyObject(activeObject: fabric.Object): void;
    clone(paramsActiveObeject?: fabric.ActiveSelection | fabric.Object): void;
    hotkeyEvent(eventName: string, e: any): void;
    contextMenu(): {
        text: string;
        hotkey: string;
        disabled: boolean;
        onclick: () => void;
    }[] | undefined;
    destroy(): void;
}
export default CopyPlugin;
