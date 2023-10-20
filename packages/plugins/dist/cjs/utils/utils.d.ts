import { useClipboard } from './useHooks';
/**
 * @description: 图片文件转字符串
 * @param {Blob|File} file 文件
 * @return {String}
 */
export declare function getImgStr(file: File | Blob): Promise<FileReader['result']>;
/**
 * @description: 根据json模板下载字体文件
 * @param {String} str
 * @return {Promise}
 */
export declare function downFontByJSON(str: string): Promise<void[]>;
/**
 * @description: 选择文件
 * @param {Object} options accept = '', capture = '', multiple = false
 * @return {Promise}
 */
export declare function selectFiles(options: {
    accept?: string;
    capture?: string;
    multiple?: boolean;
}): Promise<FileList | null>;
/**
 * @description: 创建图片元素
 * @param {String} str 图片地址或者base64图片
 * @return {Promise} element 图片元素
 */
export declare function insertImgFile(str: string): Promise<unknown>;
/**
 * Copying text to the clipboard
 * @param source Copy source
 * @param options Copy options
 * @returns Promise that resolves when the text is copied successfully, or rejects when the copy fails.
 */
export declare const clipboardText: (source: string, options?: Parameters<typeof useClipboard>[0]) => Promise<void>;
