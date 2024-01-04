import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
// import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';
import { persistedReducer } from './persistConfig';
// import { productsApi } from '../api/productsApi';

export const store = configureStore({
  reducer: persistedReducer,
  // middleware: (getDefaultMiddleware) => {
  //   return getDefaultMiddleware().concat(productsApi.middleware);
  // },
  // middleware: [thunk, productsApi.middleware],
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const persistor = persistStore(store);

setupListeners(store.dispatch);
