import { createSlice } from '@reduxjs/toolkit';
import { Gadget } from '../../types/Gadget';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: [] as Gadget[],
  reducers: {
    toggleFavorite: (state, action) => {
      const currentGadgetId = state.findIndex(
        gadget => gadget.id === action.payload.id,
      );

      if (currentGadgetId) {
        state.splice(currentGadgetId, 1);

        return state;
      }

      state.push(action.payload);

      return state;
    },
  },
});

export default favoritesSlice.reducer;
export const { toggleFavorite } = favoritesSlice.actions;
