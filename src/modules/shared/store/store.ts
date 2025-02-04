import { configureStore } from '@reduxjs/toolkit';

import menuReducer from '@features/menuSlice';

import favoritesReducer, {
  NAME as FAVORITES_NAME,
} from '@features/favoritesSlice';

import shoppingCartReducer, {
  NAME as SHOPPING_CART_NAME,
} from '@features/shoppingCartSlice';

import productsReducer, {
  NAME as PRODUCTS_NAME,
} from '@features/productsSlice';

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    products: productsReducer,
    favorites: favoritesReducer,
    shoppingCart: shoppingCartReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

let prevProducts = store.getState().products.products;

let prevfavorites = store.getState().favorites;
let prevshoppingCart = store.getState().shoppingCart;

store.subscribe(() => {
  const currentState: RootState = store.getState();

  if (prevProducts !== currentState.products.products) {
    prevProducts = currentState.products.products;
    localStorage.setItem(PRODUCTS_NAME, JSON.stringify(prevProducts));
  }

  if (prevfavorites !== currentState.favorites) {
    prevfavorites = currentState.favorites;
    localStorage.setItem(FAVORITES_NAME, JSON.stringify(prevfavorites));
  }

  if (prevshoppingCart !== currentState.shoppingCart) {
    prevshoppingCart = currentState.shoppingCart;
    localStorage.setItem(SHOPPING_CART_NAME, JSON.stringify(prevshoppingCart));
  }
});
