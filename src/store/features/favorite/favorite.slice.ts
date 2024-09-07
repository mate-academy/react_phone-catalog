import { createSlice } from '@reduxjs/toolkit';

import { TProduct } from 'utils/types/product.type';

const initialState: TProduct[] = [];

const favoritesSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    toggleFavorite: (state, { payload: product }) => {
      const isExist = state.some(item => item.id === product.id);

      if (isExist) {
        const index = state.findIndex(item => item.id !== product.id);

        if (index !== -1) state.splice(index, 1);
      } else state.push(product);
    },
  },
});

export default favoritesSlice.reducer;
export const { actions } = favoritesSlice;
