import Editor from "@fabric-editor/core"
import { useEffect } from "react";
import { fabric } from "fabric";
import {
  DringPlugin,
  AlignGuidLinePlugin,
  ControlsPlugin,
  ControlsRotatePlugin,
  CenterAlignPlugin,
  LayerPlugin,
  CopyPlugin,
  MoveHotKeyPlugin,
  DeleteHotKeyPlugin,
  GroupPlugin,
  DrawLinePlugin,
  GroupTextEditorPlugin,
  GroupAlignPlugin,
  WorkspacePlugin,
  DownFontPlugin,
  HistoryPlugin,
  FlipPlugin,
  RulerPlugin,
  MaterialPlugin,
} from '@fabric-editor/plugins';
export default function HomePage() {
  useEffect(() => {
      // 创建编辑器
    const canvasEditor = new Editor();
    // 初始化fabric
    const canvas = new fabric.Canvas('editor', {
      fireRightClick: true, // 启用右键，button的数字为3
      stopContextMenu: true, // 禁止默认右键菜单
      controlsAboveOverlay: true, // 超出clipPath后仍然展示控制条
    });
    // 初始化编辑器
    canvasEditor.init(canvas);
    canvasEditor.use(DringPlugin);
    canvasEditor.use(AlignGuidLinePlugin);
    canvasEditor.use(ControlsPlugin);
    canvasEditor.use(ControlsRotatePlugin);
    canvasEditor.use(CenterAlignPlugin);
    canvasEditor.use(LayerPlugin);
    canvasEditor.use(CopyPlugin);
    canvasEditor.use(MoveHotKeyPlugin);
    canvasEditor.use(DeleteHotKeyPlugin);
    canvasEditor.use(GroupPlugin);
    canvasEditor.use(DrawLinePlugin);
    canvasEditor.use(GroupTextEditorPlugin);
    canvasEditor.use(GroupAlignPlugin);
    canvasEditor.use(WorkspacePlugin);
    canvasEditor.use(DownFontPlugin);
    canvasEditor.use(HistoryPlugin);
    canvasEditor.use(FlipPlugin);
    canvasEditor.use(RulerPlugin);
    canvasEditor.use(MaterialPlugin);
  }, [])
  return (
    <div>
      <div id="workspace">
        <canvas id="editor"></canvas>
      </div>
    </div>
  );
}
