import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/Product';
import { getCartFromLS } from '../../utils/getCartFromLS';

export interface CartState {
  cart: Product[];
}

const initialState: CartState = {
  cart: getCartFromLS(),
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const newProd = { ...action.payload, count: 1 };

      state.cart.push(newProd);

      localStorage.setItem('cart', JSON.stringify(state.cart));
    },

    removeToCart: (state, action: PayloadAction<string>) => {
      const index = state.cart.findIndex(
        item => item.itemId === action.payload,
      );

      if (index !== -1) {
        state.cart.splice(index, 1);
      }

      localStorage.setItem('cart', JSON.stringify(state.cart));
    },

    increaseCount: (state, action: PayloadAction<string>) => {
      const product = state.cart.find(item => item.itemId === action.payload);

      if (product) {
        product.count = (product.count ?? 1) + 1;
      }

      localStorage.setItem('cart', JSON.stringify(state.cart));
    },

    decreaseCount: (state, action: PayloadAction<string>) => {
      const product = state.cart.find(item => item.itemId === action.payload);

      if (product) {
        product.count = (product.count ?? 1) - 1;
      }

      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
  },
});

export const { addToCart, removeToCart, increaseCount, decreaseCount } =
  cartSlice.actions;

export default cartSlice.reducer;
