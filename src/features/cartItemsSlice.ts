/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CartItemType } from '../types/CartItem';
import { initCart } from '../utils/initCart';
import { saveCartItems } from '../utils/saveCartItems';

const KEY = 'CART_ITEMS';
const initialCartItems = initCart(KEY);

export type CartItemsState = {
  cartItems: CartItemType[];
};

const initialState: CartItemsState = {
  cartItems: initialCartItems,
};

const cartItemsSlice = createSlice({
  name: 'cartItems',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItemType>) => {
      state.cartItems = [...state.cartItems, action.payload];

      saveCartItems(KEY, state.cartItems);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems
        .filter(cartItem => cartItem.id !== action.payload);

      saveCartItems(KEY, state.cartItems);
    },
    plusProduct: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems
        .map(cartItem => {
          if (cartItem.id === action.payload) {
            return { ...cartItem, quantity: cartItem.quantity + 1 };
          }

          return cartItem;
        });

      saveCartItems(KEY, state.cartItems);
    },
    minusProduct: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems
        .map(cartItem => {
          if (cartItem.id === action.payload) {
            return { ...cartItem, quantity: cartItem.quantity - 1 };
          }

          return cartItem;
        });

      saveCartItems(KEY, state.cartItems);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  plusProduct,
  minusProduct,
} = cartItemsSlice.actions;
export default cartItemsSlice.reducer;
