//#region imports
import {
  combineSlices,
  configureStore,
  isAction,
  Middleware,
} from '@reduxjs/toolkit';
import { productsSlice } from './slices/productsSlice';
import { cartSlice } from './slices/cartSlice';
import { saveToStorage } from '../modules/shared/services/localStorage';
import { favoritesSlice } from './slices/favoritesSlice';
import { productDetailsSlice } from './slices/productDetailsSlice';
//#endregion

const rootReducer = combineSlices(
  productsSlice,
  cartSlice,
  favoritesSlice,
  productDetailsSlice,
);

const localStorageMiddleware: Middleware<object, RootState> =
  store => next => action => {
    const result = next(action);

    if (isAction(action) && action.type.startsWith('cart/')) {
      saveToStorage('cart', store.getState().cart);
    }

    if (isAction(action) && action.type.startsWith('favorites/')) {
      saveToStorage('favorites', store.getState().favorites);
    }

    return result;
  };

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
