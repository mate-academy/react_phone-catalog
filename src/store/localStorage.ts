import { Favorites } from './slices/favoritesSlice';
import { CartItem } from './slices/itemsSlice';
import { LayoutThemeState } from './slices/layoutThemeSlice';

export interface PersistedState {
  items: Record<number, CartItem>;
  favorites: Favorites;
  layoutTheme: LayoutThemeState;
}

export function loadState(): PersistedState | undefined {
  try {
    const serializedState = localStorage.getItem('appState');

    if (serializedState === null) {
      return undefined;
    }

    return JSON.parse(serializedState) as PersistedState;
  } catch {
    return undefined;
  }
}

export function saveState(state: PersistedState): void {
  try {
    const serializedState = JSON.stringify(state);

    localStorage.setItem('appState', serializedState);
  } catch {
    // ignore write errors
  }
}
