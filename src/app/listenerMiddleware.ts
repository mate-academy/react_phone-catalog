/* eslint-disable  @typescript-eslint/indent */
import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';

import { cartSlice } from './features/cart/cartSlice';
import { favouritesSlice } from './features/favourites/favouritesSlice';
import { cartLocalStorageManager } from './features/cart';
import { favouriteLocalStorageManager } from './features/favourites';
import { AppDispatch, AppState } from './store';

export const listenerMiddleware = createListenerMiddleware();

const startListening = listenerMiddleware.startListening.withTypes<
  AppState,
  AppDispatch
>();

const cartActions = Object.values(cartSlice.actions);
const favouritesActions = Object.values(favouritesSlice.actions);

startListening({
  matcher: isAnyOf(...cartActions),
  effect: (_action, api) => {
    const state = api.getState();

    cartLocalStorageManager.set(state[cartSlice.name]);
  },
});

startListening({
  matcher: isAnyOf(...favouritesActions),
  effect: (_action, api) => {
    const state = api.getState();

    favouriteLocalStorageManager.set(state[favouritesSlice.name]);
  },
});
