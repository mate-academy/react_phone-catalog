import { Product } from '../../types/Product';
import { useLocalStorage } from '../hooks';
import { createSlice } from '@reduxjs/toolkit';

// const [cart, setCart] = useLocalStorage<Product[]>('cart', []);

const initialState = {
  cart: [] as Product[],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingProduct = state.cart.find(
        item => item.id === action.payload.id,
      );

      if (existingProduct) {
        existingProduct.quantity += action.payload;
      } else {
        state.cart.push(action.payload);
      }

      setCart(state.cart);
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(item => item.id !== action.payload.id);
      setCart(state.cart);
    },
  },
});
