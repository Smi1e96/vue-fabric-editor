/* eslint-disable @typescript-eslint/no-explicit-any */
import type CanvasRuler, { Rect } from './ruler';
import { ILineOptions, Line } from 'fabric/fabric-impl';

declare module 'fabric/fabric-impl' {
  type EventNameExt = 'removed' | EventName;

  export interface Canvas {
    _setupCurrentTransform(e: Event, target: fabric.Object, alreadySelected: boolean): void;
  }

  export interface IObservable<T> {
    on(
      eventName: 'guideline:moving' | 'guideline:mouseup',
      handler: (event: { e: Event; target: fabric.GuideLine }) => void
    ): T;
    on(events: { [key: EventName]: (event: { e: Event; target: fabric.GuideLine }) => void }): T;
  }

  export interface IGuideLineOptions extends ILineOptions {
    axis: 'horizontal' | 'vertical';
  }

  export interface IGuideLineClassOptions extends IGuideLineOptions {
    canvas: {
      setActiveObject(object: fabric.Object | fabric.GuideLine, e?: Event): Canvas;
      remove<T>(...object: (fabric.Object | fabric.GuideLine)[]): T;
    } & Canvas;
    activeOn: 'down' | 'up';
    initialize(xy: number, objObjects: IGuideLineOptions): void;
    callSuper(methodName: string, ...args: unknown[]): any;
    getBoundingRect(absolute?: boolean, calculate?: boolean): Rect;
    on(eventName: EventNameExt, handler: (e: IEvent<MouseEvent>) => void): void;
    off(eventName: EventNameExt, handler?: (e: IEvent<MouseEvent>) => void): void;
    fire<T>(eventName: EventNameExt, options?: any): T;
    isPointOnRuler(e: MouseEvent): 'horizontal' | 'vertical' | false;
    bringToFront(): fabric.Object;
    isHorizontal(): boolean;
  }

  export interface GuideLine extends Line, IGuideLineClassOptions {}

  export class GuideLine extends Line {
    constructor(xy: number, objObjects?: IGuideLineOptions);
    static fromObject(object: any, callback: any): void;
  }

  export interface StaticCanvas {
    ruler: InstanceType<typeof CanvasRuler>;
  }

  interface IArrowOptions extends ILineOptions {
    // 您可以在这里添加 Arrow 特有的任何其他属性
    id?: number | string
  }

  const Arrow: {
    prototype: Arrow;
    new(points: [number, number, number, number], options?: IArrowOptions): Arrow;
    // 如果 Arrow 类有其他静态方法，也可以在此定义
  };

  export interface Arrow1 extends Line {
    // 如果 Arrow 类有其他方法或属性，可以在此定义
  }

  export interface Rect {
    id?: string;
  }
  export interface IRectOptions {
    id?: string;
  }
}
