type RefHistory<T> = {
  current: T;
  history: T[];
  undoStack: T[];
  redoStack: T[];
  isTracking: boolean;
  startTracking: () => void;
  stopTracking: () => void;
  undo: () => void;
  redo: () => void;
  push: (value: T) => void;
};

export function useRefHistory<T>(initialValue: T): RefHistory<T> {
  let current: T = initialValue;
  const history: T[] = [initialValue];
  const undoStack: T[] = [];
  const redoStack: T[] = [];
  let isTracking: boolean = true;

  function startTracking() {
    isTracking = true;
  }

  function stopTracking() {
    isTracking = false;
  }

  function undo() {
    if (isTracking && undoStack.length) {
      const lastValue = undoStack.pop();
      if (lastValue !== undefined) {
        redoStack.push(current);
        current = lastValue;
      }
    }
  }

  function redo() {
    if (isTracking && redoStack.length) {
      const nextValue = redoStack.pop();
      if (nextValue !== undefined) {
        undoStack.push(current);
        current = nextValue;
      }
    }
  }

  function push(value: T) {
    if (isTracking && current !== value) {
      undoStack.push(current);
      history.push(value);
      redoStack.length = 0;
      current = value;
    }
  }

  return {
    get current() {
      return current;
    },
    history,
    undoStack,
    redoStack,
    isTracking,
    startTracking,
    stopTracking,
    undo,
    redo,
    push
  };
}


export function useClipboard(options: { source: string }) {
  const copy = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(options.source);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      throw err;
    }
  };

  return {
    copy,
  };
}


export function useFileDialog(options?: {
  accept?: string;
  capture?: string;
  multiple?: boolean;
}) {
  let changeCallback: (fileList: FileList | null) => void = () => {};

  const open = () => {
    const input = document.createElement('input');
    input.type = 'file';
    if (options) {
      if (options.accept) input.accept = options.accept;
      if (options.capture) input.capture = options.capture;
      if (options.multiple) input.multiple = options.multiple;
    }

    input.onchange = () => {
      changeCallback(input.files);
    };

    input.click();
  };

  const onChange = (callback: (fileList: FileList | null) => void) => {
    changeCallback = callback;
  };

  return {
    open,
    onChange,
  };
}



export function useBase64(file: File | Blob) {
  const promise: Promise<FileReader['result']> = new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = () => {
      reject(new Error('Failed to read the file.'));
    };

    reader.readAsDataURL(file);
  });

  return {
    promise,
  };
}
export function ref<T>(value: T) {
  return {
    _value: value,
    get value() {
      return this._value;
    },
    set value(newValue: T) {
      this._value = newValue;
    }
  };
}