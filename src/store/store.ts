import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { combineReducers, configureStore } from '@reduxjs/toolkit';

import accessoriesSlice from './features/accessories/accessories.slice';
import cartSlice from './features/cart/cart.slice';
import favouritesSlice from './features/favourites/favourites.slice';
import phonesSlice from './features/phones/phones.slice';
import productsSlice from './features/product/product.slice';
import tabletSlice from './features/tablets/tablet.slice';

const persistConfig = {
  key: 'product-cart',
  storage,
  whitelist: ['cart', 'favourite'],
};

const rootReducer = combineReducers({
  products: productsSlice,
  favourite: favouritesSlice,
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
