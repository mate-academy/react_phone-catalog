/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartProduct } from '../types/CartProduct';

type CartState = {
  products: CartProduct[];
  totalCount: number;
  loading: boolean;
};

const initialState: CartState = {
  products: JSON.parse(localStorage.getItem('cart') || '[]'),
  totalCount: JSON.parse(localStorage.getItem('cart') || '[]').reduce((acc: number, item: CartProduct) => acc + item.count, 0),
  loading: false,
};

const updateLocalStorageCart = (products: CartProduct[]) => {
  localStorage.setItem('cart', JSON.stringify(products));
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<CartProduct[]>) => {
      state.products = action.payload;
      state.totalCount = state.products.reduce((acc, item) => acc + item.count, 0);
      updateLocalStorageCart(state.products);
    },
    addCart: (state, action: PayloadAction<string>) => {
      const item = state.products.find(product => product.id === action.payload);

      if (item) {
        item.count += 1;
      } else {
        state.products.push({ id: action.payload, count: 1 });
      }

      state.totalCount += 1;
      updateLocalStorageCart(state.products);
    },
    removeCart: (state, action: PayloadAction<string>) => {
      const item = state.products.find(product => product.id === action.payload);

      if (item) {
        state.totalCount -= 1;
        item.count -= 1;
        if (item.count <= 0) {
          state.products = state.products.filter(product => product.id !== action.payload);
        }
      }

      updateLocalStorageCart(state.products);
    },
    deleteItem: (state, action: PayloadAction<string>) => {
      const item = state.products.find(product => product.id === action.payload);

      if (item) {
        state.totalCount -= item.count;
      }

      state.products = state.products.filter(product => product.id !== action.payload);
      updateLocalStorageCart(state.products);
    },
    clearCart: (state) => {
      state.products = [];
      state.totalCount = 0;
      updateLocalStorageCart(state.products);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export default cartSlice.reducer;
export const { setCart, addCart, removeCart, deleteItem, clearCart, setLoading } = cartSlice.actions;
