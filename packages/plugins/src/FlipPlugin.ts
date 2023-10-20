import { fabric } from 'fabric';
import Editor from '@fabric-editor/core';
import { SelectEvent, SelectMode } from './utils/event/types';
import { ref } from './utils/useHooks';
import event from './utils/event/notifier';

export default class FlipPlugin {
  public canvas: fabric.Canvas;
  public editor: Editor;
  static pluginName = 'FlipPlugin';
  static apis = ['flip'];
  selectedMode: Ref<SelectMode>;
  constructor(canvas: fabric.Canvas, editor: Editor) {
    this.canvas = canvas;
    this.editor = editor;
    this.selectedMode = ref(SelectMode.EMPTY);

    this.init();
  }

  init() {
    event.on(SelectEvent.ONE, () => (this.selectedMode.value = SelectMode.ONE));
    event.on(SelectEvent.MULTI, () => (this.selectedMode.value = SelectMode.MULTI));
    event.on(SelectEvent.CANCEL, () => (this.selectedMode.value = SelectMode.EMPTY));
  }

  flip(type: 'X' | 'Y') {
    const activeObject = this.canvas.getActiveObject();
    if (activeObject) {
      activeObject.set(`flip${type}`, !activeObject[`flip${type}`]).setCoords();
      this.canvas.requestRenderAll();
    }
  }

  contextMenu() {
    if (this.selectedMode.value === SelectMode.ONE) {
      return [
        {
          text: '翻转',
          hotkey: '❯',
          subitems: [
            {
              text: '水平翻转',
              hotkey: '|',
              onclick: () => this.flip('X'),
            },
            {
              text: '垂直翻转',
              hotkey: '-',
              onclick: () => this.flip('Y'),
            },
          ],
        },
      ];
    }
  }

  destroy() {
    console.log('pluginDestroy');
  }
}
