// /* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { Product } from '../types/productType';

export interface CartProduct {
  product: Product;
  counter: number;
}

export interface FavoritesAndCardState {
  favorites: Product[];
  cart: CartProduct[];
  isFavorites: boolean;
  isCart: boolean;
}

const initialState: FavoritesAndCardState = {
  favorites: [],
  cart: [],
  isFavorites: false,
  isCart: false,
};

export const favoritesAndCardSlice = createSlice({
  name: 'favoritesAndCard',
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      const itemId = action.payload.id;
      const itemIndex = state.favorites.findIndex(item => item.id === itemId);

      if (itemIndex === -1) {
        state.favorites.push({ ...action.payload, isFavorite: true });
      } else {
        // eslint-disable-next-line no-param-reassign
        state.favorites[itemIndex].isFavorite = true;
      }
    },
    removeFavorite: (state, action) => {
      const itemId = action.payload.id;
      const itemIndex = state.favorites.findIndex(item => item.id === itemId);

      if (itemIndex !== -1) {
        state.favorites.splice(itemIndex, 1);
      }
    },
    addToCart: (state, action) => {
      const itemId = action.payload.id;
      const itemIndex = state.cart.findIndex(
        item => item.product.id === itemId,
      );

      if (itemIndex === -1) {
        state.cart.push({
          product: { ...action.payload, isCart: true },
          counter: 1,
        });
      } else {
        // eslint-disable-next-line no-param-reassign
        state.cart[itemIndex].product.isCart = true;
      }
    },
    addProductCount: (state, action) => {
      const { id, increment } = action.payload;
      const itemIndex = state.cart.findIndex(item => item.product.id === id);

      if (itemIndex !== -1) {
        // eslint-disable-next-line no-param-reassign
        state.cart[itemIndex].counter += increment;
        // eslint-disable-next-line no-param-reassign
        state.cart[itemIndex].counter = Math.max(
          state.cart[itemIndex].counter,
          1,
        );
      }
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload.id;
      const itemIndex = state.cart.findIndex(
        item => item.product.id === itemId,
      );

      if (itemIndex !== -1) {
        state.cart.splice(itemIndex, 1);
      }
    },
    clearCart: (state: FavoritesAndCardState) => {
      // eslint-disable-next-line no-param-reassign
      state.cart = [];
    },
  },
});
export const {
  addFavorite,
  removeFavorite,
  addToCart,
  removeFromCart,
  addProductCount,
  clearCart,
} = favoritesAndCardSlice.actions;

export default favoritesAndCardSlice.reducer;
