import Editor from '@fabric-editor/core';
type IEditor = Editor;
declare class DringPlugin {
    canvas: fabric.Canvas;
    editor: IEditor;
    defautOption: {};
    static pluginName: string;
    static events: string[];
    static apis: string[];
    hotkeys: string[];
    dragMode: boolean;
    constructor(canvas: fabric.Canvas, editor: IEditor);
    init(): void;
    startDring(): void;
    endDring(): void;
    _initDring(): void;
    _setDring(): void;
    destroy(): void;
    hotkeyEvent(_eventName: string, e: any): void;
}
export default DringPlugin;
