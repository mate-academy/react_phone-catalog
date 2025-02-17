import { configureStore } from '@reduxjs/toolkit';

import menuReducer from '@features/menuSlice';
import productsReducer from '@features/productsSlice';

import favoritesReducer, {
  NAME as FAVORITES_NAME,
} from '@features/favoritesSlice';

import themeReducer, { NAME as THEME_NAME } from '@features/themeSlice';
import cartReducer, { NAME as SHOPPING_CART_NAME } from '@features/cartSlice';

import phonesReducer from '@features/phonesSlice';
import tabletsReducer from '@features/tabletsSlice';
import accessoriesReducer from '@features/accessoriesSlice';

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    theme: themeReducer,
    products: productsReducer,

    cart: cartReducer,
    favorites: favoritesReducer,

    phones: phonesReducer,
    tablets: tabletsReducer,
    accessories: accessoriesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

let prevTheme = store.getState().theme;
let prevfavorites = store.getState().favorites;
let prevshoppingCart = store.getState().cart;

store.subscribe(() => {
  const currentState: RootState = store.getState();

  if (prevTheme !== currentState.theme) {
    prevTheme = currentState.theme;
    localStorage.setItem(THEME_NAME, JSON.stringify(prevTheme));
  }

  if (prevfavorites !== currentState.favorites) {
    prevfavorites = currentState.favorites;
    localStorage.setItem(FAVORITES_NAME, JSON.stringify(prevfavorites));
  }

  if (prevshoppingCart !== currentState.cart) {
    prevshoppingCart = currentState.cart;
    localStorage.setItem(SHOPPING_CART_NAME, JSON.stringify(prevshoppingCart));
  }
});
