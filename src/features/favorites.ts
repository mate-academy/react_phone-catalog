/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ProductsState } from '../types/ProductsState';

const initialState: ProductsState = {
  products: JSON.parse(localStorage.getItem('favs') || '[]'),
  error: '',
};

const updateLocalStorage = (products: number[]) => {
  localStorage.setItem('favs', JSON.stringify(products));
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFav: (state, action: PayloadAction<number[]>) => {
      state.products = action.payload;
      updateLocalStorage(state.products);
    },
    addFav: (state, action: PayloadAction<number>) => {
      state.products.push(action.payload);
      updateLocalStorage(state.products);
    },
    removeFav: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(id => id !== action.payload);
      updateLocalStorage(state.products);
    },
  },
});

export default favoritesSlice.reducer;
export const { addFav, removeFav, setFav } = favoritesSlice.actions;
