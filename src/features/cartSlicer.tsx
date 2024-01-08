/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Product } from '../types/Product';

const storedCart = localStorage.getItem('cartProducts');

type CartItem = Product & { quantity: number };

type CartState = {
  items: CartItem[],
  total: number,
};

const cartState: CartState = {
  items: storedCart ? JSON.parse(storedCart) : [],
  total: 0,
};

const saveToLocalStorage = (state: CartState) => {
  localStorage.setItem('cartProducts', JSON.stringify(state.items));
};

export const cartProductsSlicer = createSlice({
  name: 'cartProducts',
  initialState: cartState,
  reducers: {
    setCartProducts: (state, action: PayloadAction<Product>) => {
      state.items.push({
        ...action.payload,
        quantity: 1,
      });
      saveToLocalStorage(state);
    },
    deleteCartProducts: (state, action: PayloadAction<string>) => {
      const updatedItems = state.items.filter(
        itemToDelete => itemToDelete.id !== action.payload,
      );

      state.items = updatedItems;
      saveToLocalStorage(state);
    },
    increaseQuantity: (state, action) => {
      const foundItem = state.items.find(item => item.id === action.payload);

      if (foundItem) {
        foundItem.quantity += 1;
      }

      saveToLocalStorage(state);
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const foundItem = state.items.find(item => item.id === action.payload);

      if (foundItem && foundItem.quantity > 0) {
        foundItem.quantity -= 1;
      }

      saveToLocalStorage(state);
    },
  },
});

export const {
  setCartProducts, deleteCartProducts, increaseQuantity, decreaseQuantity,
} = cartProductsSlicer.actions;

export default cartProductsSlicer.reducer;
