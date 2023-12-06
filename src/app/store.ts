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
import { api } from '../features/phonesApi/api';
import cartSlice from '../features/cartSlices/cartSlice';
import favouritesSlices from '../features/favouritesSlices/favouritesSlice';

const persistConfigCart = {
  key: 'cartPhones',
  storage,
  blacklist: [api.reducerPath, 'favourites'],
};

const persistConfigFavourites = {
  key: 'favouritesPhones',
  storage,
  blacklist: [api.reducerPath, 'cart'],
};

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  cart: persistReducer(persistConfigCart, cartSlice),
  favourites: persistReducer(persistConfigFavourites, favouritesSlices),
});

// const persistedReducerCart = persistReducer(persistConfigCart, rootReducer);
// const persistedReducer = persistReducer(
//   persistConfigFavourites, persistedReducerCart,
// );

// const persistedReducer = persistReducer(persistConfigCart, rootReducer);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(api.middleware),
});

export const persistor = persistStore(store);

// export const store = configureStore({
//   reducer: {
//     [api.reducerPath]: api.reducer,
//     cart: cartSlice,
//   },
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware()
//     .concat(api.middleware),
// });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
