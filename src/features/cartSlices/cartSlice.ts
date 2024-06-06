import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { ICartProduct } from '../../types';

type Cart = {
  quantityCart: number,
  products: ICartProduct[],
};

const initialState: Cart = {
  quantityCart: 0,
  products: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProductToCart(state, action: PayloadAction<ICartProduct>) {
      state.products.push({
        ...action.payload,
      });
      state.quantityCart += 1;
    },
    incrementProductQauntity(state, action: PayloadAction<ICartProduct>) {
      const product = state.products.find(
        (item) => item.itemId === action.payload.itemId,
      );

      if (product) {
        product.quantity += 1;
        state.quantityCart += 1;
      }
    },
    decrementProductQauntity(state, action: PayloadAction<string>) {
      const product = state.products.find(
        (item) => item.itemId === action.payload,
      );

      if (product) {
        if (product.quantity === 1) {
          state.products = state.products.filter(
            (item) => item.itemId !== action.payload,
          );
          state.quantityCart -= 1;
        } else {
          product.quantity -= 1;
          state.quantityCart -= 1;
        }
      }
    },
    removeProductFromCart(state, action: PayloadAction<string>) {
      const product = state.products.find(
        (item) => item.itemId === action.payload,
      );

      if (product) {
        state.products = state.products.filter(
          (item) => item.itemId !== action.payload,
        );
        state.quantityCart -= product.quantity;
      }
    },
  },
});

export const selectCartProducts = (state: RootState) => state.cart.products;
export const selectCartQuantity = (state: RootState) => state.cart.quantityCart;

export const {
  addProductToCart,
  removeProductFromCart,
  decrementProductQauntity,
  incrementProductQauntity,
} = cartSlice.actions;
export default cartSlice.reducer;
