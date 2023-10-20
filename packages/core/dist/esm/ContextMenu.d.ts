declare class ContextMenu {
    constructor(container: any, items: any);
    getMenuDom(): HTMLDivElement;
    itemToDomEl(data: any): HTMLDivElement;
    hideAll(): void;
    hide(): void;
    hideSubMenus(): void;
    show(x: any, y: any): void;
    install(): void;
    setData(data: any): void;
    uninstall(): void;
}
export default ContextMenu;
