import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cartSlice from './slices/cartSlice';
import favoritesSlice from './slices/favoritesSlice';
import productsSlice from './slices/productsSlice'; // products

const persistConfig = {
  key: 'root',
  storage,
  blocklist: ['products'],
};

const rootReducer = combineReducers({
  products: productsSlice.reducer,
  cart: cartSlice.reducer,
  favorites: favoritesSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
