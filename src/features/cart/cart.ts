import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@src/types/Product';

export type CartProduct = {
  product: Product;
  quantity: number;
};

type CartState = {
  items: CartProduct[];
};

const initialState: CartState = {
  items: [],
};

const findCartItem = (state: CartState, itemId: string) =>
  state.items.find(item => item.product.itemId === itemId);

const removeCartItem = (state: CartState, itemId: string) => {
  state.items = state.items.filter(item => item.product.itemId !== itemId);
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleCartItem: (state, action: PayloadAction<Product>) => {
      const exists = findCartItem(state, action.payload.itemId);

      if (exists) {
        removeCartItem(state, action.payload.itemId);
      } else {
        state.items.push({
          product: action.payload,
          quantity: 1,
        });
      }
    },

    removeCartItem: (state, action: PayloadAction<string>) => {
      removeCartItem(state, action.payload);
    },

    incrementQuantity: (state, action: PayloadAction<string>) => {
      const cartItem = findCartItem(state, action.payload);

      if (cartItem) {
        cartItem.quantity += 1;
      }
    },

    decrementQuantity: (state, action: PayloadAction<string>) => {
      const cartItem = findCartItem(state, action.payload);

      if (cartItem && cartItem.quantity > 1) {
        cartItem.quantity -= 1;
      }
    },

    clearCart: () => initialState,
  },
});

export const { actions } = cartSlice;
export const cartReducer = cartSlice.reducer;
