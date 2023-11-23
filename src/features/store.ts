import { configureStore } from '@reduxjs/toolkit';
import productsSlice from './products/productsSlice';
import { apiSlice } from './product/productSlice';
import cartSlice from './cart/cartSlice';
import favoritesSlice from './favourites/favourites';
import searchSlice from './search/search';

const loadFromLocalStorage = () => {
  try {
    const loadState = localStorage.getItem('state');

    return loadState ? JSON.parse(loadState) : undefined;
  } catch (error) {
    return error;
  }
};

// type LocalStorageState = Product | ProductDetails | AddToCard;
// eslint-disable-next-line
export const saveToLocalStorage = (state:any) => {
  try {
    const saveToLocal = JSON.stringify(state);

    localStorage.setItem('state', saveToLocal);
  } catch {
    throw new Error('Failed to save state');
  }
};

export const preloadedState = loadFromLocalStorage();

const store = configureStore({
  reducer: {
    products: productsSlice,
    cart: cartSlice,
    favorites: favoritesSlice,
    search: searchSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getMiddleware) => getMiddleware().concat(apiSlice.middleware),

  preloadedState,
});

store.subscribe(() => {
  saveToLocalStorage({
    cart: store.getState().cart,
    favorites: store.getState().favorites,
  });
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
