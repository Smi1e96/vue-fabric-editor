import { fabric } from 'fabric';
import Editor from '.';
type IEditor = Editor;
declare class ServersPlugin {
    canvas: fabric.Canvas;
    editor: IEditor;
    static pluginName: string;
    static apis: string[];
    constructor(canvas: fabric.Canvas, editor: IEditor);
    insert(): void;
    insertSvgFile(jsonFile: any): void;
    getJson(): {
        version: string;
        objects: fabric.Object[];
    };
    /**
     * @description: 拖拽添加到画布
     * @param {Event} event
     * @param {Object} item
     */
    dragAddItem(event: DragEvent, item: fabric.Object): void;
    clipboard(): void;
    saveJson(): void;
    saveSvg(): void;
    saveImg(): void;
    preview(): Promise<unknown>;
    _getSaveSvgOption(): {
        width: any;
        height: any;
        viewBox: {
            x: any;
            y: any;
            width: any;
            height: any;
        };
    };
    _getSaveOption(): {
        name: string;
        format: string;
        quality: number;
        width: number | undefined;
        height: number | undefined;
        left: number | undefined;
        top: number | undefined;
    };
    clear(): void;
    destroy(): void;
}
export default ServersPlugin;
