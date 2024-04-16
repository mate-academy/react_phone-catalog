import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import brandNewReducer from '../../src/features/brandNewSlice';
import hotPricesReducer from '../../src/features/hotPricesSlice';
import phonesReducer from '../../src/features/phonesSlice';
import cartReducer from '../../src/features/cartSlice';
import favoritesReducer from '../../src/features/favoritesSlice';
import tabletsReducer from '../../src/features/tabletsSlice';
import accessoriesReducer from '../../src/features/accessoriesSlice';
import currentProductReducer from '../../src/features/currentProductSlice';

export const store = configureStore({
  reducer: {
    brandNew: brandNewReducer,
    hotPrices: hotPricesReducer,
    phones: phonesReducer,
    tablets: tabletsReducer,
    accessories: accessoriesReducer,
    currentProduct: currentProductReducer,
    cart: cartReducer,
    favorites: favoritesReducer,
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
