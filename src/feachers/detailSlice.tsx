// /* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { Product } from '../services/productType';

export interface FavoritesAndCardState {
  favorites: Product[];
  cart: Product[];
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
      const itemIndex = state.cart.findIndex(item => item.id === itemId);

      if (itemIndex === -1) {
        state.cart.push({ ...action.payload, isCart: true });
      } else {
        // eslint-disable-next-line no-param-reassign
        state.cart[itemIndex].isCart = true;
      }
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload.id;
      const itemIndex = state.cart.findIndex(item => item.id === itemId);

      if (itemIndex !== -1) {
        state.cart.splice(itemIndex, 1);
      }
    },
  },
});
export const { addFavorite, removeFavorite, addToCart, removeFromCart } =
  favoritesAndCardSlice.actions;

export default favoritesAndCardSlice.reducer;
