/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from '../../types/CartItem';
import { appLocaleStorage } from '../../utils/localeStorageClient';
import { Products } from '../../types/Products';

const storage = appLocaleStorage('cart');

const initialState: CartItem[] = [];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    loadCartItems: () => {
      const data = storage.getData();

      if (!data) {
        storage.setData([]);

        return [];
      } else if (!Array.isArray(data)) {
        storage.setData([]);

        return [];
      } else {
        return data;
      }
    },
    clearCart: () => {
      storage.setData([]);

      return [];
    },
    addProductToCart: (state, action: PayloadAction<Products>) => {
      const newCartItem: CartItem = {
        product: action.payload,
        id: action.payload.id,
        quantity: 1,
      };

      state.push(newCartItem);

      storage.setData(state);
    },
    deleteProduct: (state, action: PayloadAction<CartItem>) => {
      const newState = state.filter(p => p.id !== action.payload.id);

      storage.setData(newState);

      return newState;
    },
    incrementProductQuantity: (state, action: PayloadAction<CartItem>) => {
      const index = state.findIndex(p => p.id === action.payload.id);

      if (index !== -1) {
        state[index].quantity++;
        storage.setData(state);
      }
    },
    decrementProductQuantity: (state, action: PayloadAction<CartItem>) => {
      const index = state.findIndex(p => p.id === action.payload.id);

      if (index !== -1) {
        state[index].quantity--;
        storage.setData(state);
      }
    },
  },
});

export const {
  loadCartItems,
  clearCart,
  addProductToCart,
  deleteProduct,
  incrementProductQuantity,
  decrementProductQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
