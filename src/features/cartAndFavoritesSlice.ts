/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types/Product';

export interface CartItem extends Product {
  quantity: number;
}

export interface State {
  favourites: Product[];
  cart: CartItem[];
}

const initialState: State = {
  favourites: JSON.parse(localStorage.getItem('favourites') || '[]'),
  cart: JSON.parse(localStorage.getItem('cart') || '[]'),
};

const cartAndFavouritesSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    toggleFavourite: (state, action: PayloadAction<Product>) => {
      const index = state.favourites.findIndex(
        item => item.itemId === action.payload.itemId,
      );

      if (index !== -1) {
        state.favourites.splice(index, 1);
      } else {
        state.favourites.push(action.payload);
      }

      localStorage.setItem('favourites', JSON.stringify(state.favourites));
    },

    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.cart.find(
        item => item.itemId === action.payload.itemId,
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }

      localStorage.setItem('cart', JSON.stringify(state.cart));
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter(item => item.itemId !== action.payload);
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },

    changeQuantity: (
      state,
      action: PayloadAction<{ itemId: string; delta: number }>,
    ) => {
      const existingItem = state.cart.find(
        item => item.itemId === action.payload.itemId,
      );

      if (existingItem) {
        existingItem.quantity += action.payload.delta;

        if (existingItem.quantity <= 0) {
          state.cart = state.cart.filter(
            item => item.itemId !== action.payload.itemId,
          );
        }
      }

      localStorage.setItem('cart', JSON.stringify(state.cart));
    },

    clearCart: state => {
      state.cart = [];
      localStorage.removeItem('cart');
    },
  },
});

export const {
  toggleFavourite,
  addToCart,
  removeFromCart,
  changeQuantity,
  clearCart,
} = cartAndFavouritesSlice.actions;

export default cartAndFavouritesSlice.reducer;
