import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { ProductData } from '../../modules/shared/types/ProductData';

// export type FavoritesItem = {
//   itemId: string;
//   fullPrice: number;
//   price: number;
//   name: string;
//   image: string;
//   screen: string;
//   capacity: string;
//   ram: string;
// };

export type FavoritesState = { items: ProductData[] };

const initialState: FavoritesState = { items: [] };

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<ProductData>) {
      const { itemId } = action.payload; // ensure ProductData has itemId
      const idx = state.items.findIndex(i => i.itemId === itemId);

      if (idx >= 0) {
        state.items.splice(idx, 1);
      } else {
        state.items.push(action.payload);
      }
    },
    setFavorites(state, action: PayloadAction<FavoritesState>) {
      return action.payload;
    },
  },
});

// eslint-disable-next-line max-len
export const { toggleFavorite, setFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;

// eslint-disable-next-line max-len
export const selectFavorites = (s: RootState) => (s.favorites as FavoritesState).items;
export const selectFromFavorites = createSelector([selectFavorites], items =>
  items.map(i => i.itemId),
);
