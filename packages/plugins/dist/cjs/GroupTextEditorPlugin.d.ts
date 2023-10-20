import { fabric } from 'fabric';
import Editor from '@fabric-editor/core';
type IEditor = Editor;
declare class GroupTextEditorPlugin {
    canvas: fabric.Canvas;
    editor: IEditor;
    static pluginName: string;
    isDown: boolean;
    constructor(canvas: fabric.Canvas, editor: IEditor);
    _init(): void;
    _getGroupTextObj(opt: fabric.IEvent<MouseEvent>): false | fabric.Object;
    _getGroupObj(opt: fabric.IEvent<MouseEvent>): fabric.Object;
    _bedingTextEditingEvent(textObject: fabric.IText, opt: fabric.IEvent<MouseEvent>): void;
    _bedingEditingEvent(textObject: fabric.IText, opt: fabric.IEvent<MouseEvent>): void;
    _unGroup(): string[] | undefined;
    isText(obj: fabric.Object): boolean | "" | undefined;
    destroy(): void;
}
export default GroupTextEditorPlugin;
