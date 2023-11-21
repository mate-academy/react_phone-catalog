import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types/Product';

export type FavoriteAndCartState = {
  favorites: Product[];
  cart: Product[];
};

const initialState: FavoriteAndCartState = {
  favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
  cart: JSON.parse(localStorage.getItem('cart') || '[]'),
};

const favoriteAndCartSlice = createSlice({
  name: 'favoriteAndCart',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<Product>) => {
      const updatedFavorites = [...state.favorites, action.payload];

      return {
        ...state,
        favorites: updatedFavorites,
      };
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      const updatedFavorites = state.favorites.filter(
        (product) => product.id !== action.payload,
      );

      return {
        ...state,
        favorites: updatedFavorites,
      };
    },
    addToCart: (state, action: PayloadAction<Product>) => {
      const updatedCart = [...state.cart, action.payload];

      return {
        ...state,
        cart: updatedCart,
      };
    },
    removeFromCart: (state, action: PayloadAction<Product>) => {
      const currItems = JSON.parse(localStorage.getItem('cart') || '[]');

      const itemToRemove = currItems.findLastIndex((item: Product) => (
        item.id === action.payload.id
      ));

      currItems.splice(itemToRemove, 1);

      return {
        ...state,
        cart: currItems,
      };
    },
    deleteFromCart: (state, action: PayloadAction<string>) => {
      const updatedCart = state.cart.filter(
        (product) => product.id !== action.payload,
      );

      return {
        ...state,
        cart: updatedCart,
      };
    },
  },
});

export const {
  addToFavorites,
  removeFromFavorites,
  addToCart,
  removeFromCart,
  deleteFromCart,
} = favoriteAndCartSlice.actions;

export default favoriteAndCartSlice.reducer;
