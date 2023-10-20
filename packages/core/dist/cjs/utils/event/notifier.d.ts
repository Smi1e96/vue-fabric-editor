/// <reference types="node" />
import EventEmitter from 'events';
import { Canvas } from 'fabric/fabric-impl';
/**
 * 发布订阅器
 */
declare class CanvasEventEmitter extends EventEmitter {
    handler: Canvas | undefined;
    mSelectMode: string;
    init(handler: CanvasEventEmitter['handler']): void;
    /**
     * 暴露单选多选事件
     * @private
     */
    private selected;
}
declare const _default: CanvasEventEmitter;
export default _default;
export { CanvasEventEmitter };
