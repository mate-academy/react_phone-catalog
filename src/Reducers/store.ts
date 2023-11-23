import { ThunkAction, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { useDispatch } from 'react-redux';
import { Action } from 'redux';

import rootReducer from './rootReducer';
import { Products } from '../type/Products';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

// типы для действий и состояния
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
Action<string>,
Action<Products>
>;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const persistore = persistStore(store);
