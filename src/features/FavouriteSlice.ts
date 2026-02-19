/* eslint-disable no-param-reassign */
// eslint-disable-next-line max-len
import { loadItemsLocalStorage } from '../components/utils/loadItemsLocalStorage';
import { saveToLocalStorage } from '../components/utils/saveToLocalStorege';
import { Product } from '../types/products';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavouriteState {
  favouriteItems: Product[];
  loading: boolean;
}

const initialState: FavouriteState = {
  favouriteItems: loadItemsLocalStorage('favourite'),
  loading: false,
};

export const favouriteSlice = createSlice({
  name: 'favourite',
  initialState,
  reducers: {
    addToFavourite: (state, action: PayloadAction<Product>) => {
      const findItem = state.favouriteItems.find(
        item => item.id === action.payload.id,
      );

      if (!findItem) {
        state.favouriteItems.push({ ...action.payload });
        saveToLocalStorage('favourite', state.favouriteItems);
      } else {
        state.favouriteItems = state.favouriteItems.filter(
          item => item.id !== action.payload.id,
        );
        saveToLocalStorage('favourite', state.favouriteItems);
      }
    },
  },
});

export const { addToFavourite } = favouriteSlice.actions;
export default favouriteSlice.reducer;
