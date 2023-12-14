import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import productsSlider from '../Components/features/ProductsSlicer';

export const store = configureStore({
  reducer: {
    products: productsSlider,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>;
