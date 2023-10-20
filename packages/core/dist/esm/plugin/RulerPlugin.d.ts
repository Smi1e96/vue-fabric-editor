import { fabric } from 'fabric';
import Editor from '../core';
type IEditor = Editor;
declare class RulerPlugin {
    canvas: fabric.Canvas;
    editor: IEditor;
    static pluginName: string;
    static apis: string[];
    ruler: any;
    constructor(canvas: fabric.Canvas, editor: IEditor);
    hookSaveBefore(): Promise<unknown>;
    hookSaveAfter(): Promise<unknown>;
    init(): void;
    hideGuideline(): void;
    showGuideline(): void;
    rulerEnable(): void;
    rulerDisable(): void;
    destroy(): void;
}
export default RulerPlugin;
