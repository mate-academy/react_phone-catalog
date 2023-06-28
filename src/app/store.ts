import { configureStore } from '@reduxjs/toolkit';
// eslint-disable-next-line max-len
import favoriteProductsReducer from '../features/favoriteProducts/favoriteProductsSlice';
import searchBarReducer from '../features/searchBar/searchBarSlice';
import shoppingCounterReducer from '../features/shoppingCart/shoppingCartSlice';
import themeReducer from '../features/theme/themeSlice';

export const store = configureStore({
  reducer: {
    favoriteProducts: favoriteProductsReducer,
    shoppingCart: shoppingCounterReducer,
    theme: themeReducer,
    searchBar: searchBarReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
