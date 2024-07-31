import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import favSlice from '../features/favSlice';
import productInfoSlice from '../features/productInfoSlice';
import productssSlice from '../features/productssSlice';
import storage from 'redux-persist/lib/storage';
// import { persistReducer, persistStore } from 'redux-persist';
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

const persistConfig = {
  key: 'root',
  storage,
};

const persistConf = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, favSlice);
const persistedReduc = persistReducer(persistConf, cartSlice);

export const store = configureStore({
  reducer: {
    products: productssSlice,
    selectedProduct: productInfoSlice,
    favourites: persistedReducer,
    cartItems: persistedReduc,
    // themeSwitcher: themeSlice,
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

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
