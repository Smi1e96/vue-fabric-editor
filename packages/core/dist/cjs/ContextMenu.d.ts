import './contextMenu.css';
declare class ContextMenu {
    container: any;
    dom: any;
    shown: boolean;
    root: boolean;
    parent: any;
    submenus: Array<any>;
    items: Array<any>;
    _onclick: (e: MouseEvent) => void;
    _oncontextmenu: (e: Event) => void;
    _oncontextmenu_keydown: (e: KeyboardEvent) => void;
    _onblur: () => void;
    constructor(container: any, items: any);
    getMenuDom(): HTMLDivElement;
    itemToDomEl(data: any): HTMLDivElement;
    hideAll(): void;
    hide(): void;
    hideSubMenus(): void;
    show(x: number, y: number): void;
    install(): void;
    setData(data: any): void;
    uninstall(): void;
}
export default ContextMenu;
