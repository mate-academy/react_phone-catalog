import { CustomEvents } from './emitterTypes';

export const sessionStorageEventEmitter = new EventTarget();

export function emitSessionStorageChange<T>(key: string, value: T) {
  sessionStorage.setItem(key, JSON.stringify(value));

  sessionStorageEventEmitter.dispatchEvent(
    new CustomEvent(CustomEvents.sessionStorageChange, {
      detail: { key, value },
    }),
  );
}
