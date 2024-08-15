/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cart } from '../../types/Cart';
import { Product } from '../../types/Product';

export interface CartState {
  cart: Cart[];
}

const initialState: CartState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      const isHaveProduct = state.cart.some(item => {
        return item.id === action.payload.id;
      });

      const newProduct = {
        id: action.payload.id,
        quantity: 1,
        product: action.payload,
      };

      if (!isHaveProduct) {
        state.cart.push(newProduct);
      }
    },

    deleteProduct: (state, action: PayloadAction<number>) => {
      const productIndex = state.cart.findIndex(
        item => item.id === action.payload,
      );

      if (productIndex !== -1) {
        state.cart.splice(productIndex, 1);
      }
    },

    increaseQuantity: (state, action: PayloadAction<number>) => {
      const productIndex = state.cart.findIndex(
        item => item.id === action.payload,
      );

      if (productIndex === -1) {
        return;
      }

      state.cart[productIndex].quantity++;
    },

    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const productIndex = state.cart.findIndex(
        item => item.id === action.payload,
      );

      if (productIndex === -1) {
        return;
      }

      if (state.cart[productIndex].quantity > 1) {
        state.cart[productIndex].quantity--;
      }
    },

    clearProductCart: state => {
      state.cart = [];
    },
  },
});

export const {
  addProduct,
  deleteProduct,
  increaseQuantity,
  decreaseQuantity,
  clearProductCart,
} = cartSlice.actions;

export default cartSlice;
