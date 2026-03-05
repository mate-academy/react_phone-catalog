import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
  id: string;
  title: string;
  img: string;
  price: string;
  count: number;
};

const initialState: InitialState[] =
  JSON.parse(localStorage.getItem('cart')) !== null
    ? JSON.parse(localStorage.getItem('cart'))
    : [];

export const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addProductToCart: (state, action) => {
      const exists = state.find(product => product.id === action.payload.id);

      if (!exists) {
        state.push(action.payload);
      }
    },
    removeProductFromCart: (state, action) => {
      return state.filter(product => product.id !== action.payload.id);
    },

    removeProduct: (state, action) => {
      return state.filter(product => product.id !== action.payload);
    },
    clearCart: state => {
      return [];
    },
    plusCount: (state, action) => {
      state.map(product => {
        if (product.id === action.payload) {
          product.count += 1;
        }
      });
    },
    minusCount: (state, action) => {
      state.map(product => {
        if (product.id === action.payload) {
          product.count -= 1;
        }
      });
    },
  },
});
