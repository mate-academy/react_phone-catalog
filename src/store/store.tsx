import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import favoritesReducer from './slices/favoritesSlice';

const STORAGE_KEY = 'app_state_v2';

function loadPreloadedState() {
  if (typeof window === 'undefined') {
    return undefined;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return undefined;
    }

    const parsed = JSON.parse(raw);

    return {
      cart: parsed.cart ?? { items: [] },
      favorites: parsed.favorites ?? { items: [] },
    };
  } catch {
    return undefined;
  }
}

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    favorites: favoritesReducer,
  },
  preloadedState: loadPreloadedState(),
});

store.subscribe(() => {
  try {
    const state = store.getState();

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        cart: state.cart,
        favorites: state.favorites,
      }),
    );
  } catch (e) {}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
