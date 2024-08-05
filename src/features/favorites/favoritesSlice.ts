import { createSlice } from '@reduxjs/toolkit';
// import { Gadget } from '../../types/Gadget';
import { Product } from '../../utils/types/Product';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: [] as Product[],
  reducers: {
    toggleFavorite: (state, action) => {
      const currentGadgetId = state.findIndex(
        product => product.id === action.payload.id,
      );

      if (currentGadgetId === -1) {
        state.push(action.payload);
      } else {
        state.splice(currentGadgetId, 1);
      }
    },
  },
});

export default favoritesSlice.reducer;
export const { toggleFavorite } = favoritesSlice.actions;
