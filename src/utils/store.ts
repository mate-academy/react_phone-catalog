import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import cartSlice from './cart';
import favouritesSlice from './favourites';
import themeSlice from './theme';

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    favourites: favouritesSlice,
    theme: themeSlice,
  },
});

export default store;

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export const UseAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
