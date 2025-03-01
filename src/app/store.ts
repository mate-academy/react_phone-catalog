import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import phonesReducer from '../features/phonesSlice';
import tabletsReducer from '../features/tabletsSlice';
import accessoriesReducer from '../features/accessoriesSlice';
import navigationReducer from '../features/navigationSlice';
import cartReducer from '../features/cartSlice';
import favouriteReducer from '../features/favouriteSlice';
import queryReducer from '../features/querySlice';

export const store = configureStore({
  reducer: {
    phones: phonesReducer,
    tablets: tabletsReducer,
    accessories: accessoriesReducer,
    navigation: navigationReducer,
    cart: cartReducer,
    favourites: favouriteReducer,
    query: queryReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

/* eslint-disable @typescript-eslint/indent */
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
/* eslint-enable @typescript-eslint/indent */
