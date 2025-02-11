import { configureStore } from '@reduxjs/toolkit';

import menuReducer from '@features/menuSlice';
import productsReducer from '@features/productsSlice';

import favoritesReducer, {
  NAME as FAVORITES_NAME,
} from '@features/favoritesSlice';

import shoppingCartReducer, {
  NAME as SHOPPING_CART_NAME,
} from '@features/shoppingCartSlice';

import phonesReducer from '@features/phonesSlice';
import tabletsReducer from '@features/tabletsSlice';
import accessoriesReducer from '@features/accessoriesSlice';

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    products: productsReducer,
    favorites: favoritesReducer,
    shoppingCart: shoppingCartReducer,

    phones: phonesReducer,
    tablets: tabletsReducer,
    accessories: accessoriesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

let prevfavorites = store.getState().favorites;
let prevshoppingCart = store.getState().shoppingCart;

store.subscribe(() => {
  const currentState: RootState = store.getState();

  if (prevfavorites !== currentState.favorites) {
    prevfavorites = currentState.favorites;
    localStorage.setItem(FAVORITES_NAME, JSON.stringify(prevfavorites));
  }

  if (prevshoppingCart !== currentState.shoppingCart) {
    prevshoppingCart = currentState.shoppingCart;
    localStorage.setItem(SHOPPING_CART_NAME, JSON.stringify(prevshoppingCart));
  }
});
