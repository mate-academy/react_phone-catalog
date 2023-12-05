import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import { setupListeners } from '@reduxjs/toolkit/query';

import { productsApi } from '../api/productsApi';
import favoritesReducer from '../features/favoritesSlice';
import cartReducer from '../features/cartSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['favorites', 'cart'],
};

const rootReducer = combineReducers({
  favorites: favoritesReducer,
  cart: cartReducer,
  [productsApi.reducerPath]: productsApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk, productsApi.middleware],
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
