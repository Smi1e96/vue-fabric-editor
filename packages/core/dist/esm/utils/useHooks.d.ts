type RefHistory<T> = {
    current: T;
    history: T[];
    undoStack: T[];
    redoStack: T[];
    undo: () => void;
    redo: () => void;
    push: (value: T) => void;
};
export declare function useRefHistory<T>(initialValue: T): RefHistory<T>;
export declare function useClipboard(options: {
    source: string;
}): {
    copy: () => Promise<void>;
};
export declare function useFileDialog(options?: {
    accept?: string;
    capture?: string;
    multiple?: boolean;
}): {
    open: () => void;
    onChange: (callback: (fileList: FileList | null) => void) => void;
};
export declare function useBase64(file: File | Blob): {
    promise: Promise<string | ArrayBuffer | null>;
};
export declare function ref<T>(value: T): {
    _value: T;
    value: T;
};
export {};
