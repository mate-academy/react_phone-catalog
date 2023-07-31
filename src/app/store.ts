import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { reducer as phonesReducer } from '../features/phones/phonesSlice';
import {
  reducer as selectedPhoneReducer,
} from '../features/selectedPhone/selectedPhoneSlice';
import {
  reducer as phoneDetailsReducer,
} from '../features/PhoneDetails/phoneDetailsSlice';
import {
  reducer as phonesFavoritesReducer,
} from '../features/PhonesFavorites/phonesFavoritesSlice';
import {
  reducer as phonesCardedReducer,
} from '../features/PhonesInCard/phonesInCardSlice';
import {
  reducer as searchBarReducer,
} from '../features/SearchBar/searchBarSlice';
import {
  reducer as productsReducer,
} from '../features/products/productsSlice';

export const store = configureStore({
  reducer: {
    phones: phonesReducer,
    selectedPhone: selectedPhoneReducer,
    phoneDetails: phoneDetailsReducer,
    phonesFavorites: phonesFavoritesReducer,
    phonesCarded: phonesCardedReducer,
    searchBar: searchBarReducer,
    products: productsReducer,

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
