import { fabric } from 'fabric';
import Editor from '@fabric-editor/core';
import { SelectMode } from './utils/event/types';
export default class FlipPlugin {
    canvas: fabric.Canvas;
    editor: Editor;
    static pluginName: string;
    static apis: string[];
    selectedMode: Ref<SelectMode>;
    constructor(canvas: fabric.Canvas, editor: Editor);
    init(): void;
    flip(type: 'X' | 'Y'): void;
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
