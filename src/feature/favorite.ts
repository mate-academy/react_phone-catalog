import { PayloadAction, Slice, createSlice } from '@reduxjs/toolkit';
import { Product } from '../type/Product';

export interface FavoriteProps {
  favoriteItem: Product[],
}

const initialState: FavoriteProps = {
  favoriteItem: [],
};

export const favoriteSlice: Slice<FavoriteProps> = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addAllFavorite: (state, action: PayloadAction<Product[]>) => {
      return {
        ...state,
        favoriteItem: action.payload,
      };
    },
    addFavorite: (state, action: PayloadAction<Product>) => {
      return {
        ...state,
        favoriteItem: [...state.favoriteItem, action.payload],
      };
    },
    removeFavorite: (state, action: PayloadAction<Product>) => {
      return {
        ...state,
        favoriteItem: state.favoriteItem
          .filter(item => item.id !== action.payload.id),
      };
    },
  },
});

export const {
  addFavorite,
  removeFavorite,
  addAllFavorite,
} = favoriteSlice.actions;
export default favoriteSlice.reducer;
