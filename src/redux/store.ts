import { configureStore } from '@reduxjs/toolkit';
import languageReducer from './languageSlice';
import cartReducer from './cartSlice';
import favoritesReducer from './favoritesSlice';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    language: languageReducer,
    cart: cartReducer,
    favorites: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
