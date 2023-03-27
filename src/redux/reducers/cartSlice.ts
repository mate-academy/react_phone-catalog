/* eslint-disable */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartList } from '../../types/CartList';

interface CartState {
  cart: CartList[],
}

const initialState: CartState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    loadCart(state, action: PayloadAction<CartList[]>) {
      state.cart = [...action.payload];
    },
    addNewItemToCart(state, action: PayloadAction<CartList>) {
      state.cart.push(action.payload);
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.cart = state.cart.filter((cartList: any) => cartList.item.id !== action.payload);
    },
    updateCountInCart(state, action: PayloadAction<any>) {
      state.cart = state.cart.map((cartItem: any) => {
        if (action.payload.id === cartItem.item.id) {
          return ({
            ...cartItem,
            count: action.payload.itemCount,
          });
        }

        return cartItem;
      });
    },
  },
});

export default cartSlice.reducer;
export const {
  addNewItemToCart,
  loadCart,
  removeFromCart,
  updateCountInCart,
} = cartSlice.actions;
