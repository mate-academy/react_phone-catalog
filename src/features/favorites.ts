/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ProductsState {
  products: string[];
}

const initialState: ProductsState = {
  products: JSON.parse(localStorage.getItem('favs') || '[]'),
};

const updateLocalStorage = (products: string[]) => {
  localStorage.setItem('favs', JSON.stringify(products));
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFav: (state, action: PayloadAction<string[]>) => {
      state.products = action.payload;
      updateLocalStorage(state.products);
    },
    addFav: (state, action: PayloadAction<string>) => {
      state.products.push(action.payload);
      updateLocalStorage(state.products);
    },
    removeFav: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(id => id !== action.payload);
      updateLocalStorage(state.products);
    },
  },
});

export default favoritesSlice.reducer;
export const { addFav, removeFav, setFav } = favoritesSlice.actions;
