import { combineReducers, configureStore } from '@reduxjs/toolkit';
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

import productsSlice from './features/product/product.slice';
import favoriteSlice from './features/favorite/favorite.slice';
import cartSlice from './features/cart/cart.slice';
import phonesSlice from './features/phones/phones.slice';
import tabletSlice from './features/tablets/tablet.slice';
import accessoriesSlice from './features/accessories/accessories.slice';

const persistConfig = {
  key: 'product-cart',
  storage,
  whitelist: ['cart', 'favorite'],
};

const rootReducer = combineReducers({
  products: productsSlice,
  favorite: favoriteSlice,
  cart: cartSlice,
  phones: phonesSlice,
  tablets: tabletSlice,
  accessories: accessoriesSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: true,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
