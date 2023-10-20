import { fabric } from 'fabric';
import Editor from '../core';
type IEditor = Editor;
declare class MaterialPlugin {
    canvas: fabric.Canvas;
    editor: IEditor;
    static pluginName: string;
    static apis: string[];
    apiMapUrl: {
        [propName: string]: string;
    };
    constructor(canvas: fabric.Canvas, editor: IEditor);
    getMaterialType(typeId: string): Promise<any>;
    getMaterialInfo(typeId: string): Promise<any>;
}
export default MaterialPlugin;
