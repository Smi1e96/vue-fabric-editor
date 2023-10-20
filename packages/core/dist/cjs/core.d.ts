/// <reference types="node" />
import EventEmitter from 'events';
import { AsyncSeriesHook } from 'tapable';
declare class Editor extends EventEmitter {
    canvas: fabric.Canvas;
    contextMenu: any;
    private pluginMap;
    private customEvents;
    private customApis;
    private hooks;
    hooksEntity: {
        [propName: string]: AsyncSeriesHook<string>;
    };
    init(canvas: fabric.Canvas): void;
    use(plugin: IPluginClass, options: IPluginOption): void;
    getPlugin(name: string): IPluginTempl | undefined;
    private _checkPlugin;
    private _bindingHooks;
    private _bindingHotkeys;
    private _saveCustomAttr;
    private _bindingApis;
    private _bindContextMenu;
    private _renderMenu;
    _initActionHooks(): void;
    _initContextMenu(): void;
    _initServersPlugin(): void;
}
export default Editor;
