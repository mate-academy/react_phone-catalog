import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import favSlice from '../features/favSlice';
import productInfoSlice from '../features/productInfoSlice';
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  REGISTER,
  PURGE,
} from 'redux-persist';
import cartSlice from '../features/cartSlice';
import seacrchSlice from '../features/seacrchSlice';
import themeSlice from '../features/themeSlice';
import allProductsSlice from '../features/allProductsSlice';

const persistFavorite = {
  key: 'favorite',
  storage,
};

const persistCart = {
  key: 'cart',
  storage,
};

const persistTheme = {
  key: 'theme',
  storage,
};

const persistedFavorite = persistReducer(persistFavorite, favSlice);
const persistedCart = persistReducer(persistCart, cartSlice);
const persistedTheme = persistReducer(persistTheme, themeSlice);

export const store = configureStore({
  reducer: {
    allProducts: allProductsSlice,
    selectedProduct: productInfoSlice,
    favourites: persistedFavorite,
    cartItems: persistedCart,
    search: seacrchSlice,
    themeSwitcher: persistedTheme,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

/* eslint-disable */
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
