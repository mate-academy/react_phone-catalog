import { combineReducers, configureStore } from '@reduxjs/toolkit';
import productsReducer from './reducers/ProductsSlice';
import productDetailsReducer from './reducers/ProductDetailsSlice';
import cartReducer from './reducers/cartSlice';
import favoritesReduces from './reducers/favoritesSlice';
import {  persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';

export const rootReducer = combineReducers({
  productsReducer,
  productDetailsReducer,
  cartReducer,
  favoritesReduces,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cartReducer', 'favoritesReduces']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const setupStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
  });
};

export const store = setupStore();

export const persistor = persistStore(store);


export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
