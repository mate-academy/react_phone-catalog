import { createSlice } from '@reduxjs/toolkit';
import { Product } from '../../types/Product';

export interface FavoriteSliceState {
  itemInFavorite: Product[]
}

const favoriteSlice = createSlice({
  name: 'favorite',

  initialState: {
    itemInFavorite: [],
  } as FavoriteSliceState,
  reducers: {
    addItemToFavorite: (state, action) => {
      state.itemInFavorite.push(action.payload);
    },
    removeItemFromFavorite: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.itemInFavorite
        = state.itemInFavorite.filter(obj => obj.id !== action.payload);
    },
  },
});

export const {
  addItemToFavorite,
  removeItemFromFavorite,
} = favoriteSlice.actions;

export default favoriteSlice.reducer;
