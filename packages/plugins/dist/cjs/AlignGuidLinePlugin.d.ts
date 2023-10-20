import Editor from '@fabric-editor/core';
type IEditor = Editor;
import { fabric } from 'fabric';
declare class AlignGuidLinePlugin {
    canvas: fabric.Canvas;
    editor: IEditor;
    defautOption: {
        color: string;
        width: number;
    };
    static pluginName: string;
    static events: string[];
    static apis: never[];
    hotkeys: string[];
    dragMode: boolean;
    constructor(canvas: fabric.Canvas, editor: IEditor);
    init(): void;
    destroy(): void;
}
export default AlignGuidLinePlugin;
