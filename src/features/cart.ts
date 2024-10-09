import { createSlice } from '@reduxjs/toolkit';
import { Product } from '../types/Product';

const loadCartFromLocalStorage = () => {
  const savedCart = localStorage.getItem('cart');

  return savedCart ? JSON.parse(savedCart) : [];
};

const saveCartToLocalStorage = (cart: Product[]) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState: loadCartFromLocalStorage() as Product[],
  reducers: {
    addToCart: (cart, action) => {
      const updatedCart = [...cart, action.payload];

      saveCartToLocalStorage(updatedCart);

      return updatedCart;
    },
    removeFromCart: (cart, action) => {
      const index = cart.findIndex(product => product.id === action.payload.id);
      let updatedCart = cart;

      if (index !== -1) {
        updatedCart = [...cart.slice(0, index), ...cart.slice(index + 1)];
        saveCartToLocalStorage(updatedCart);
      }

      return updatedCart;
    },
    deleteFromCart: (cart, action) => {
      const updatedCart = cart.filter(
        product => product.id !== action.payload.id,
      );

      saveCartToLocalStorage(updatedCart);

      return updatedCart;
    },
  },
});
