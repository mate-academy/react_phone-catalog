import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@src/types/Product';

type FavouritesState = {
  items: Product[];
};

const initialState: FavouritesState = {
  items: [],
};

export const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    toggleItem: (state, action: PayloadAction<Product>) => {
      const exists = state.items.some(
        item => item.itemId === action.payload.itemId,
      );

      if (exists) {
        state.items = state.items.filter(
          item => item.itemId !== action.payload.itemId,
        );
      } else {
        state.items.push(action.payload);
      }
    },
  },
});

export const { actions } = favouritesSlice;
export const favouritesReducer = favouritesSlice.reducer;
