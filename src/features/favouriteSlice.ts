import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types';

export interface FavouriteState {
  favouriteGoods: Product[];
}

const initialState: FavouriteState = {
  favouriteGoods: JSON.parse(localStorage.getItem('favouriteGoods') || '[]'),
};

export const favouriteSlice = createSlice({
  name: 'favouriteGoods',
  initialState,
  reducers: {
    addGood(state, { payload }: PayloadAction<Product>) {
      state.favouriteGoods.push(payload);
      localStorage.setItem(
        'favouriteGoods',
        JSON.stringify(state.favouriteGoods),
      );
    },
    removeGood(state, { payload }: PayloadAction<Product>) {
      // eslint-disable-next-line no-param-reassign
      state.favouriteGoods = state.favouriteGoods.filter(
        good => good.id !== payload.id,
      );
      localStorage.setItem(
        'favouriteGoods',
        JSON.stringify(state.favouriteGoods),
      );
    },
    clearGoods(state) {
      // eslint-disable-next-line no-param-reassign
      state.favouriteGoods = [];
      localStorage.removeItem('favouriteGoods');
    },
  },
});

export const {} = favouriteSlice.actions;
export default favouriteSlice.reducer;
