import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Product } from '../types/Product';

const parsedValue = localStorage.getItem('favorites');
const initialState: Product[] = (parsedValue) ? JSON.parse(parsedValue) : [];

const favoritsSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    add: (favorites, action: PayloadAction<Product>) => {
      favorites.push(action.payload);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    },
    remove: (favorites, action: PayloadAction<string>) => {
      const newFavorites = favorites.filter(({ itemId }) => itemId !== action.payload);

      localStorage.setItem('favorites', JSON.stringify(newFavorites));

      return newFavorites;
    },
  },
});

export default favoritsSlice.reducer;
export const {
  add,
  remove,
} = favoritsSlice.actions;
