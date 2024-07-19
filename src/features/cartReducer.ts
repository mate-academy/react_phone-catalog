/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CartItem } from '../types/CartItem';

export interface CartState {
  items: CartItem[];
}

const storedCarts = localStorage.getItem('cartProducts');

const initialState: CartState = {
  items: storedCarts ? JSON.parse(storedCarts) : [],
};

const saveToLocalStorage = (state: CartState) => {
  localStorage.setItem('cartProducts', JSON.stringify(state.items));
};

const cartsSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<CartItem>) => {
      state.items.push(action.payload);
      saveToLocalStorage(state);
    },

    takeProduct: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      saveToLocalStorage(state);
    },

    increaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find(item => item.id === action.payload);

      if (item) {
        item.quantity += 1;
        saveToLocalStorage(state);
      }
    },

    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find(item => item.id === action.payload);

      if (item && item.quantity > 1) {
        item.quantity -= 1;
        saveToLocalStorage(state);
      } else {
        state.items = state.items.filter(item => item.id !== action.payload);
        saveToLocalStorage(state);
      }
    },

    clear: state => {
      // eslint-disable-next-line no-param-reassign
      state.items = [];
      saveToLocalStorage(state);
    },
  },
});

export default cartsSlice.reducer;
export const {
  addProduct,
  takeProduct,
  increaseQuantity,
  decreaseQuantity,
  clear,
} = cartsSlice.actions;
