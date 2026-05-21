import { Middleware } from '@reduxjs/toolkit';
import type { RootState } from './store';

const CART_KEY = 'shop_cart';
const FAV_KEY = 'shop_favorites';

/**
 * Middleware that syncs cart and favorites state to localStorage.
 * Skips persistence if action contains skipPersist flag.
 */
export const persistMiddleware: Middleware<{}, RootState> =
  store => next => action => {
    // Let the action pass through
    const result = next(action);

    // Skip persistence if flag is set (for async thunks, etc.)
    if ((action as any).meta?.skipPersist) {
      return result;
    }

    // After the action is processed, persist relevant slices
    const state = store.getState();

    try {
      localStorage.setItem(CART_KEY, JSON.stringify(state.cart.items));
      localStorage.setItem(FAV_KEY, JSON.stringify(state.favorites.ids));
    } catch (error) {
      console.error('Failed to persist state to localStorage:', error);
    }

    return result;
  };
