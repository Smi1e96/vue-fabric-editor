import Editor from './core';
type IEditor = Editor;
declare class EditorWorkspacePlugin {
    canvas: fabric.Canvas;
    editor: IEditor;
    defautOption: {
        color: string;
        size: number;
    };
    static pluginName: string;
    static events: string[];
    static apis: string[];
    hotkeys: string[];
    constructor(canvas: fabric.Canvas, editor: IEditor, options?: IPluginOption);
    init(): void;
    destroy(): void;
    hookSaveBefore(): void;
    hookSaveAfter(): void;
    hotkeyEvent(eventName: string, e?: Event): void;
    contextMenu(): ({
        text: string;
        hotkey: string;
        disabled: boolean;
        subitems?: undefined;
    } | {
        text: string;
        hotkey: string;
        disabled?: undefined;
        subitems?: undefined;
    } | {
        text: string;
        hotkey?: undefined;
        disabled?: undefined;
        subitems?: undefined;
    } | {
        text: string;
        hotkey: string;
        subitems: ({
            text: string;
            hotkey: string;
            subitems: {
                text: string;
            }[];
        } | {
            text: string;
            hotkey?: undefined;
            subitems?: undefined;
        })[];
        disabled?: undefined;
    } | null)[];
    _command(): void;
}
export default EditorWorkspacePlugin;
