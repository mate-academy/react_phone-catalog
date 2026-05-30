/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductWithYear } from '../../types/product';

type CartState = {
  cartItems: ProductWithYear[];
  favourites: ProductWithYear[];
};

const initialState: CartState = {
  cartItems: JSON.parse(localStorage.getItem('cart') || '[]'),
  favourites: JSON.parse(localStorage.getItem('favourites') || '[]'),
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<ProductWithYear>) {
      const product = action.payload;
      const existingProduct = state.cartItems.find(
        item => item.id === product.id,
      );

      if (!existingProduct) {
        state.cartItems.push({ ...product, quantity: 1 });
      }

      localStorage.setItem('cart', JSON.stringify(state.cartItems));
    },
    removeFromCart(state, action: PayloadAction<ProductWithYear>) {
      state.cartItems = state.cartItems.filter(
        item => item.id !== action.payload.id,
      );
      localStorage.setItem('cart', JSON.stringify(state.cartItems));
    },
    decreaseQuantity(state, action: PayloadAction<ProductWithYear>) {
      const product = state.cartItems.find(
        item => item.id === action.payload.id,
      );

      if (product && product.quantity && product.quantity > 1) {
        product.quantity -= 1;
      }

      localStorage.setItem('cart', JSON.stringify(state.cartItems));
    },
    increaseQuantity(state, action: PayloadAction<ProductWithYear>) {
      const product = state.cartItems.find(
        item => item.id === action.payload.id,
      );

      if (product && product.quantity) {
        product.quantity += 1;
      }

      localStorage.setItem('cart', JSON.stringify(state.cartItems));
    },
    addToFavourites(state, action: PayloadAction<ProductWithYear>) {
      const product = action.payload;
      const existingProduct = state.favourites.find(
        item => item.id === product.id,
      );

      if (!existingProduct) {
        state.favourites.push(product);
      }

      localStorage.setItem('favourites', JSON.stringify(state.favourites));
    },
    removeFromFavourites(state, action: PayloadAction<ProductWithYear>) {
      state.favourites = state.favourites.filter(
        item => item.id !== action.payload.id,
      );
      localStorage.setItem('favourites', JSON.stringify(state.favourites));
    },
    removeAllFromCart(state) {
      state.cartItems = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  addToFavourites,
  removeFromFavourites,
  increaseQuantity,
  decreaseQuantity,
  removeAllFromCart,
} = cartSlice.actions;
