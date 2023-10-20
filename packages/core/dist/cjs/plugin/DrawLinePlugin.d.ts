import { fabric } from 'fabric';
import Editor from '../core';
type IEditor = Editor;
declare class DrawLinePlugin {
    canvas: fabric.Canvas;
    editor: IEditor;
    static pluginName: string;
    static apis: string[];
    isDrawingLineMode: boolean;
    isArrow: boolean;
    lineToDraw: any;
    pointer: any;
    pointerPoints: any;
    isDrawingLine: boolean;
    constructor(canvas: fabric.Canvas, editor: IEditor);
    init(): void;
    setArrow(params: any): void;
    setMode(params: any): void;
    endRest(): void;
    destroy(): void;
}
export default DrawLinePlugin;
