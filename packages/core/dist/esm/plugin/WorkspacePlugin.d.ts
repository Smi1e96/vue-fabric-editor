import { fabric } from 'fabric';
import Editor from '../core';
type IEditor = Editor;
declare class WorkspacePlugin {
    canvas: fabric.Canvas;
    editor: IEditor;
    static pluginName: string;
    static events: string[];
    static apis: string[];
    workspaceEl: HTMLElement | null;
    workspace: null | fabric.Rect;
    option: any;
    constructor(canvas: fabric.Canvas, editor: IEditor);
    init(option: any): void;
    hookImportAfter(): Promise<unknown>;
    hookSaveAfter(): Promise<unknown>;
    _initBackground(): void;
    _initWorkspace(): void;
    /**
     * 设置画布中心到指定对象中心点上
     * @param {Object} obj 指定的对象
     */
    setCenterFromObject(obj: fabric.Rect): void;
    _initResizeObserve(): void;
    setSize(width: number, height: number): void;
    setZoomAuto(scale: number, cb?: (left?: number, top?: number) => void): void;
    _getScale(): number | undefined;
    big(): void;
    small(): void;
    auto(): void;
    one(): void;
    _bindWheel(): void;
    destroy(): void;
}
export default WorkspacePlugin;
