import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { productsApi } from '../modules/ProductsPage/services/productsApi';
import { productDetailsApi } from '../modules/ProductDetailsPage/services/productDetailsApi';
import { cartReducer, favouritesReducer } from './reducers';

const cartPersistConfig = {
  key: 'cart',
  version: 1,
  storage,
};

const favouritesPersistConfig = {
  key: 'favourites',
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  [productsApi.reducerPath]: productsApi.reducer,
  [productDetailsApi.reducerPath]: productDetailsApi.reducer,
  cart: persistReducer(cartPersistConfig, cartReducer),
  favourites: persistReducer(favouritesPersistConfig, favouritesReducer),
});

// eslint-disable-next-line import/no-cycle
export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(productsApi.middleware, productDetailsApi.middleware),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

/* eslint-disable @typescript-eslint/indent */
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>;
/* eslint-enable @typescript-eslint/indent */
