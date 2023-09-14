/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CartCard } from '../../types/CartCard';
import { Phone } from '../../types/Phone';

type State = {
  cartStorage: CartCard[],
  phones: Phone[]
};

const storage = localStorage.getItem('cart');

const initialState: State = {
  cartStorage: storage ? JSON.parse(storage) : [],
  phones: [],
};

function setLocalStorage(newValue: CartCard[]) {
  localStorage.setItem('cart', JSON.stringify(newValue));
}

const cart = createSlice({
  name: 'cartStorage',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<string>) => {
      const product = state.phones
        .find(currPhone => currPhone.phoneId === action.payload);

      const newProduct = {
        id: product?.id || '',
        name: product?.name || '',
        image: product?.image || '',
        phoneId: product?.phoneId || '',
        price: product?.price || 0,
        qnty: 1,
      };

      state.cartStorage.push(newProduct);
      setLocalStorage(state.cartStorage);
    },

    remove: (state, action: PayloadAction<string>) => {
      state.cartStorage = state.cartStorage
        .filter(product => product.id !== action.payload);

      setLocalStorage(state.cartStorage);
    },

    increment: (state, action: PayloadAction<string>) => {
      state.cartStorage = state.cartStorage.map(product => {
        if (product.id === action.payload) {
          product.qnty += 1;
        }

        return product;
      });

      setLocalStorage(state.cartStorage);
    },

    decrement: (state, action: PayloadAction<string>) => {
      state.cartStorage = state.cartStorage.map(product => {
        if (product.id === action.payload) {
          product.qnty -= 1;
        }

        return product;
      });

      setLocalStorage(state.cartStorage);
    },

    addPhonesToCart: (state, action: PayloadAction<Phone[]>) => {
      state.phones = action.payload;
    },
  },
});

export const {
  increment,
  decrement,
  add,
  remove,
  addPhonesToCart,
} = cart.actions;
export default cart.reducer;
