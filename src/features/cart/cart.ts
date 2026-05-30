import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CartState } from './types/CartState';
import { Cart } from './types/Cart';

const loadCartFromLocalStorage = (): Cart[] => {
  try {
    const storedCart = localStorage.getItem('cart');

    return storedCart ? JSON.parse(storedCart) : [];
  } catch {
    return [];
  }
};

const initialState: CartState = {
  cart: loadCartFromLocalStorage(),
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Cart>) => {
      state.cart.push(action.payload);
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter(item => item.itemId !== action.payload);
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },

    clear: state => {
      state.cart = [];
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },

    increase: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.map(item =>
        item.itemId === action.payload
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      );
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },

    decrease: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.map(item =>
        item.itemId === action.payload
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item,
      );
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
  },
});

export const actions = cartSlice.actions;
export default cartSlice.reducer;
