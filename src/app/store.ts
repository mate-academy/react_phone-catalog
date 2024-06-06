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
import cartSlice from '../features/cartSlices/cartSlice';
import favouritesSlices from '../features/favouritesSlices/favouritesSlice';
import phoneDetailSlice from '../features/phoneDetailSlices/phoneDetailSlice';
import productsSlice from '../features/productsSlice/productsSlice';
import tabletDetailSlice
  from '../features/tabletDetailSlices/tabletDetailSlice';
import accessoriesDetailSlice
  from '../features/accessoriesSlices/accessoriesDetailSlice';

const persistConfigCart = {
  key: 'cartPhones',
  storage,
  blacklist: ['favourites'],
};

const persistConfigFavourites = {
  key: 'favouritesPhones',
  storage,
  blacklist: ['cart'],
};

const rootReducer = combineReducers({
  phoneDetail: phoneDetailSlice,
  accessoriesDetail: accessoriesDetailSlice,
  tabletDetail: tabletDetailSlice,
  products: productsSlice,
  cart: persistReducer(persistConfigCart, cartSlice),
  favourites: persistReducer(persistConfigFavourites, favouritesSlices),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [
        FLUSH,
        REHYDRATE,
        PAUSE,
        PERSIST,
        PURGE,
        REGISTER,
      ],
    },
  }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
