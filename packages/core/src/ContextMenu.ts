/* eslint-disable no-prototype-builtins */
/*
 * @Author: 秦少卫
 * @Date: 2023-05-25 22:33:23
 * @LastEditors: 秦少卫
 * @LastEditTime: 2023-05-25 23:06:29
 * @Description: 右键菜单
 */
import './contextMenu.css';

// @ts-nocheck
class ContextMenu {
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
  constructor(container:any, items:any) {
    this.container = container;
    this.dom = null;
    this.shown = false;
    this.root = true;
    this.parent = null;
    this.submenus = [];
    this.items = items;

    this._onclick = (e: Event) => {
      if (
        this.dom &&
        e.target instanceof HTMLElement &&
        e.target != this.dom &&
        e.target.parentElement != this.dom &&
        !e.target.classList.contains('item') &&
        !(e.target.parentElement instanceof HTMLElement && e.target.parentElement.classList.contains('item'))
      ) {
        this.hideAll();
      }
    };

    this._oncontextmenu = (e: Event) => {
      e.preventDefault();
      if (
        e.target != this.dom &&
        e.target instanceof HTMLElement &&
        (!e.target.parentElement || e.target.parentElement != this.dom) &&
        !e.target.classList.contains('item') &&
        (!e.target.parentElement || !e.target.parentElement.classList.contains('item'))
      ) {
        const mouseEvent = e as MouseEvent;
        this.hideAll();
        this.show(mouseEvent.clientX, mouseEvent.clientY);
      }
    };

    this._oncontextmenu_keydown = (e: KeyboardEvent) => {
      if (e.keyCode != 93) return;
      e.preventDefault();

      this.hideAll();
      this.show(0, 0);
    };

    this._onblur = () => {
      this.hideAll();
    };
  }

  getMenuDom() {
    const menu = document.createElement('div');
    menu.classList.add('context');

    for (const item of this.items) {
      menu.appendChild(this.itemToDomEl(item));
    }

    return menu;
  }

  itemToDomEl(data: any) {
    const item = document.createElement('div');

    if (data === null) {
      item.className = 'separator';
      return item;
    }

    if (
      data.hasOwnProperty('color') &&
      /^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(data.color.toString())
    ) {
      item.style.cssText = `color: ${data.color}`;
    }

    item.classList.add('item');

    const label = document.createElement('span');
    label.className = 'label';
    label.innerText = data.hasOwnProperty('text') ? data['text'].toString() : '';
    item.appendChild(label);

    if (data.hasOwnProperty('disabled') && data['disabled']) {
      item.classList.add('disabled');
    } else {
      item.classList.add('enabled');
    }

    const hotkey = document.createElement('span');
    hotkey.className = 'hotkey';
    hotkey.innerText = data.hasOwnProperty('hotkey') ? data['hotkey'].toString() : '';
    item.appendChild(hotkey);

    if (
      data.hasOwnProperty('subitems') &&
      Array.isArray(data['subitems']) &&
      data['subitems'].length > 0
    ) {
      const menu = new ContextMenu(this.container, data['subitems']);
      menu.root = false;
      menu.parent = this;

      const openSubItems = () => {
        if (data.hasOwnProperty('disabled') && data['disabled'] == true) return;

        this.hideSubMenus();

        const x = this.dom.offsetLeft + this.dom.clientWidth + item.offsetLeft;
        const y = this.dom.offsetTop + item.offsetTop;

        if (!menu.shown) {
          menu.show(x, y);
        } else {
          menu.hide();
        }
      };

      this.submenus.push(menu);

      item.classList.add('has-subitems');
      item.addEventListener('click', openSubItems);
      item.addEventListener('mousemove', openSubItems);
    } else if (data.hasOwnProperty('submenu') && data['submenu'] instanceof ContextMenu) {
      const menu = data['submenu'];
      menu.root = false;
      menu.parent = this;

      const openSubItems = () => {
        if (data.hasOwnProperty('disabled') && data['disabled'] == true) return;

        this.hideSubMenus();

        const x = this.dom.offsetLeft + this.dom.clientWidth + item.offsetLeft;
        const y = this.dom.offsetTop + item.offsetTop;

        if (!menu.shown) {
          menu.show(x, y);
        } else {
          menu.hide();
        }
      };

      this.submenus.push(menu);

      item.classList.add('has-subitems');
      item.addEventListener('click', openSubItems);
      item.addEventListener('mousemove', openSubItems);
    } else {
      item.addEventListener('click', () => {
        this.hideSubMenus();

        if (item.classList.contains('disabled')) return;

        if (data.hasOwnProperty('onclick') && typeof data['onclick'] === 'function') {
          const event = {
            handled: false,
            item: item,
            label: label,
            hotkey: hotkey,
            items: this.items,
            data: data,
          };

          data['onclick'](event);

          if (!event.handled) {
            this.hide();
          }
        } else {
          this.hide();
        }
      });

      item.addEventListener('mousemove', () => {
        this.hideSubMenus();
      });
    }

    return item;
  }

  hideAll() {
    if (this.root && !this.parent) {
      if (this.shown) {
        this.hideSubMenus();

        this.shown = false;
        this.container.removeChild(this.dom);

        if (this.parent && this.parent.shown) {
          this.parent.hide();
        }
      }

      return;
    }

    this.parent.hide();
  }

  hide() {
    if (this.dom && this.shown) {
      this.shown = false;
      this.hideSubMenus();
      this.container.removeChild(this.dom);

      if (this.parent && this.parent.shown) {
        this.parent.hide();
      }
    }
  }

  hideSubMenus() {
    for (const menu of this.submenus) {
      if (menu.shown) {
        menu.shown = false;
        menu.container.removeChild(menu.dom);
      }
      menu.hideSubMenus();
    }
  }

  show(x: number, y: number) {
    this.dom = this.getMenuDom();

    this.dom.style.left = `${x}px`;
    this.dom.style.top = `${y}px`;

    this.shown = true;
    this.container.appendChild(this.dom);
  }

  install() {
    this.container.addEventListener('contextmenu', this._oncontextmenu);
    this.container.addEventListener('keydown', this._oncontextmenu_keydown);
    this.container.addEventListener('click', this._onclick);
    window.addEventListener('blur', this._onblur);
  }

  setData(data: any) {
    this.items = data;
  }

  uninstall() {
    this.dom = null;
    // this.container.removeEventListener('contextmenu', this._oncontextmenu);
    this.container.removeEventListener('keydown', this._oncontextmenu_keydown);
    this.container.removeEventListener('click', this._onclick);
    window.removeEventListener('blur', this._onblur);
  }
}

export default ContextMenu;
