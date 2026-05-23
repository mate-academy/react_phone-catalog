import { Middleware } from '@reduxjs/toolkit';

const CART_KEY = 'shop_cart';
const FAV_KEY = 'shop_favorites';

export const persistMiddleware: Middleware = store => next => action => {
  const result = next(action);

  if ((action as any).meta?.skipPersist) {
    return result;
  }

  const state = store.getState() as any;

  try {
    localStorage.setItem(CART_KEY, JSON.stringify(state.cart.items));
    localStorage.setItem(FAV_KEY, JSON.stringify(state.favorites.ids));
  } catch (error) {
    console.error('Failed to persist state:', error);
  }

  return result;
};
