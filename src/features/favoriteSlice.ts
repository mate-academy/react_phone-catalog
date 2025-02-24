import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types';

export interface FavoriteState {
  favoriteGoods: Product[];
}

// const loadFromLocalStorage = (): Product[] => {
//   const data = localStorage.getItem('favoriteGoods');

//   return data ? JSON.parse(data) : [];
// };

const initialState: FavoriteState = {
  // favoriteGoods: loadFromLocalStorage(),
  favoriteGoods: JSON.parse(localStorage.getItem('favoriteGoods') || '[]'),
};

export const favoriteSlice = createSlice({
  name: 'favoriteGoods',
  initialState,
  reducers: {
    addGood(state, { payload }: PayloadAction<Product>) {
      state.favoriteGoods.push(payload);
      localStorage.setItem(
        'favoriteGoods',
        JSON.stringify(state.favoriteGoods),
      );
    },
    removeGood(state, { payload }: PayloadAction<Product>) {
      // eslint-disable-next-line no-param-reassign
      state.favoriteGoods = state.favoriteGoods.filter(
        good => good.id !== payload.id,
      );
      localStorage.setItem(
        'favoriteGoods',
        JSON.stringify(state.favoriteGoods),
      );
    },
    clearGoods(state) {
      // eslint-disable-next-line no-param-reassign
      state.favoriteGoods = [];
      localStorage.removeItem('favoriteGoods');
    },
  },
});

export const {} = favoriteSlice.actions;
export default favoriteSlice.reducer;
