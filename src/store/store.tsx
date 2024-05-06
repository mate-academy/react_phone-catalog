import { configureStore, combineReducers } from '@reduxjs/toolkit';
import productSlice from '../feachers/goodsPhoneSlice/productSlice';
// import { favoritesAndCardSlice } from '../feachers/favoritesAndCardSlice.ts';
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
import { favoritesAndCardSlice } from '../feachers/detailSlice';

const rootReducer = combineReducers({
  phones: productSlice,
  cartAndFavorits: favoritesAndCardSlice.reducer,
});

const persistConfig = {
  key: 'root',
  storage: storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persister = persistStore(store);

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
