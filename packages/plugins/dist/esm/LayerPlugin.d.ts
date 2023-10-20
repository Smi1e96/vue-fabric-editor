import { fabric } from 'fabric';
import Editor from '@fabric-editor/core';
type IEditor = Editor;
declare class LayerPlugin {
    canvas: fabric.Canvas;
    editor: IEditor;
    static pluginName: string;
    static apis: string[];
    constructor(canvas: fabric.Canvas, editor: IEditor);
    _getWorkspace(): fabric.Object | undefined;
    _workspaceSendToBack(): void;
    up(): void;
    upTop(): void;
    down(): void;
    downTop(): void;
    contextMenu(): {
        text: string;
        hotkey: string;
        subitems: {
            text: string;
            hotkey: string;
            onclick: () => void;
        }[];
    }[] | undefined;
    destroy(): void;
}
export default LayerPlugin;
