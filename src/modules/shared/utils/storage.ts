import { GlobalState } from '../store/types';

const STORAGE_KEY = 'shop_state';

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    return raw ? JSON.parse(raw) : undefined;
  } catch {
    return undefined;
  }
}

export function saveState(state: GlobalState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore write errors
  }
}
