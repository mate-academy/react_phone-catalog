import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Product } from '../types/Product';

type FavouritesState = {
  favourites: Product[];
};

const initialState: FavouritesState = {
  favourites: JSON.parse(localStorage.getItem('favourites') || '[]'),
};

const updatedLocalStorage = (products: Product[]) => {
  localStorage.setItem('favourites', JSON.stringify(products));
};

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.favourites.push(action.payload);
      updatedLocalStorage(state.favourites);
    },
    removeProduct: (state, action: PayloadAction<Product>) => {
      // eslint-disable-next-line no-param-reassign
      state.favourites = state.favourites.filter(
        item => item.id !== action.payload.id,
      );
      updatedLocalStorage(state.favourites);
    },
  },
});

export default favouritesSlice.reducer;
export const { addProduct, removeProduct } = favouritesSlice.actions;
