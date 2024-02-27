import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/es/persistReducer';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistStore,
} from 'redux-persist';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import phonesSliceReducer from './features/phonesSlice';
import favouritesSliceReducer from './features/favouritesSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart', 'favourites'],
};

const rootReducer = combineReducers({
  phones: phonesSliceReducer,
  favouritesPhones: favouritesSliceReducer,
});

export const persistedReducer = persistReducer(
  persistConfig,
  rootReducer,
);

// const cartLoggerMiddleware = (store: any) => (next: any) => (action: any) => {
//   const state = store.getState();

//   const newCart = state.favouritesPhones.phonesInCart;
//   const newFavourites = state.favouritesPhones.favouritesPhones;

//   localStorage.setItem('cart', JSON.stringify(newCart));
//   localStorage.setItem('favourites', JSON.stringify(newFavourites));

//   return next(action);
// };

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),

  // middleware: (getDefaultMiddleware) => getDefaultMiddleware()
  //   .concat(cartLoggerMiddleware),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
