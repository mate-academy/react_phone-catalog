import { createSlice } from '@reduxjs/toolkit';

import { TProduct } from '@utils/types/product.type';

export interface InitialState {
  items: TProduct[];
}
const initialState: InitialState = {
  items: [],
};

const favouritesSlice = createSlice({
  name: 'favourite',
  initialState,
  reducers: {
    addFavourites: (state, { payload: product }) => {
      const existingItemIndex = state.items.findIndex(
        item => item.id === product.id,
      );

      if (existingItemIndex !== -1) {
        state.items.splice(existingItemIndex, 1);
      } else {
        state.items.push(product);
      }
    },
  },
});

export default favouritesSlice.reducer;
export const { addFavourites } = favouritesSlice.actions;
