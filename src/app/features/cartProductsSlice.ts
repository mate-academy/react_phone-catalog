import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartProduct } from '../../types/CartProduct';
/* eslint-disable no-param-reassign */

export interface CartProductsState {
  cartProducts: CartProduct[];
}

const initialState: CartProductsState = {
  cartProducts: [],
};

export const cartProductsSlice = createSlice({
  name: 'cartProducts',
  initialState,
  reducers: {
    setCartProducts: (state, action: PayloadAction<CartProduct[]>) => {
      state.cartProducts = action.payload;
      localStorage.setItem('cart', JSON.stringify(state.cartProducts));
    },
    addCartProduct: (state, action: PayloadAction<CartProduct | null>) => {
      const match = state.cartProducts.some(
        product => product.id === action.payload?.id,
      );

      if (action.payload && !match) {
        state.cartProducts.push(action.payload);
        localStorage.setItem('cart', JSON.stringify(state.cartProducts));
      }
    },
    deleteCartProduct: (state, action: PayloadAction<CartProduct>) => {
      state.cartProducts = state.cartProducts.filter(
        product => product.id !== action.payload.id,
      );
      localStorage.setItem('cart', JSON.stringify(state.cartProducts));
    },
  },
});

export const {
  setCartProducts,
  addCartProduct,
  deleteCartProduct,
} = cartProductsSlice.actions;

export default cartProductsSlice.reducer;
