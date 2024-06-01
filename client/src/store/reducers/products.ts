import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Product } from '../../types/Product';

export interface State {
  products: Product[];
  loading: boolean;
  favorites: Product[];
  cart: Product[];
}

const initialState: State = {
  products: [],
  loading: false,
  favorites: [],
  cart: [],
};

/* eslint-disable */
const productsSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setFavorites: (state, action: PayloadAction<Product[]>) => {
      state.favorites = action.payload;
    },

    addFavorite: (state, action: PayloadAction<Product>) => {
      state.favorites.push(action.payload);
    },

    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(
        favorite => favorite.id !== action.payload,
      );
    },

    setCartItems: (state, action: PayloadAction<Product[]>) => {
      state.cart = action.payload;
    },

    addToCart: (state, action: PayloadAction<Product>) => {
      state.cart.push(action.payload);
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter(
        favorite => favorite.id !== action.payload,
      );
    },
  },
});

export default productsSlice.reducer;
export const { actions } = productsSlice;
