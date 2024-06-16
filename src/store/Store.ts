/* eslint-disable import/no-extraneous-dependencies */
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import storage from 'redux-persist/lib/storage';

import favoritesSlice from '../features/favorites/favoritesSlice';

import { api } from './api/api';

import cartSlise from '../features/cart/cartSlise';

const rootReducer = combineReducers({
  favorites: favoritesSlice,
  cart: cartSlise,
  [api.reducerPath]: api.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['favorites', 'cart'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddlware =>
    getDefaultMiddlware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
