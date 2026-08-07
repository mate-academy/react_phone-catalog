import { configureStore } from '@reduxjs/toolkit';
import { cartReducer } from '@src/features/cart';
import { favouritesReducer } from '@src/features/favourites';
import { productDetailsReducer } from '@src/features/productDetails';
import { productsReducer } from '@src/features/products';
import { themeReducer } from '@src/features/theme';
import { loadCart, savedCart } from '@src/storage/cartStorage';
import {
  loadFavourites,
  savedFavourites,
} from '@src/storage/favouritesStorage';

const preloadedState = {
  cart: {
    items: loadCart(),
  },

  favourites: {
    items: loadFavourites(),
  },
};

export const store = configureStore({
  reducer: {
    products: productsReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    favourites: favouritesReducer,
    theme: themeReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  savedCart(store.getState().cart.items);
  savedFavourites(store.getState().favourites.items);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
