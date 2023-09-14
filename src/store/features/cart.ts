/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CartCard } from '../../types/CartCard';
import { Phone } from '../../types/Phone';

type State = {
  cartStorage: CartCard[],
  addedToCart: string[],
};

const storage = localStorage.getItem('cart');

const initialState: State = {
  cartStorage: storage ? JSON.parse(storage) : [],
  addedToCart: [],
};

function setLocalStorage(newValue: CartCard[]) {
  localStorage.setItem('cart', JSON.stringify(newValue));
}

const cart = createSlice({
  name: 'cartStorage',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Phone>) => {
      const newProduct = {
        id: action.payload.id,
        name: action.payload.name,
        image: action.payload.image,
        phoneId: action.payload.phoneId,
        price: action.payload.price,
        qnty: 1,
      };

      state.cartStorage.push(newProduct);
      state.addedToCart.push(newProduct.phoneId);
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
  },
});

export const {
  increment,
  decrement,
  add,
  remove,
} = cart.actions;
export default cart.reducer;
