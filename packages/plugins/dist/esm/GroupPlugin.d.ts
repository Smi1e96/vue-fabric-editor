import { fabric } from 'fabric';
import Editor from '@fabric-editor/core';
type IEditor = Editor;
declare class GroupPlugin {
    canvas: fabric.Canvas;
    editor: IEditor;
    static pluginName: string;
    static apis: string[];
    constructor(canvas: fabric.Canvas, editor: IEditor);
    unGroup(): void;
    group(): void;
    contextMenu(): {
        text: string;
        hotkey: string;
        disabled: boolean;
        onclick: () => void;
    }[] | undefined;
    destroy(): void;
}
export default GroupPlugin;
