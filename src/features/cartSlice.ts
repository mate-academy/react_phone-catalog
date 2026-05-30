/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { storage } from '../app/localStorage';
import { Product } from '../types/products';
import { CartType } from '../types/cart';

const getTotalPrice = (): number => {
  const products = storage.getAllItems<Product>('products') || [];
  const cart = storage.getAllItems<CartType>('cart') || [];
  const totalPrice = cart.reduce((acc, cur) => {
    const product = products.find(el => el.itemId === cur.id);

    if (product) {
      return acc + product.price * cur.quantity;
    }

    return acc;
  }, 0);

  return totalPrice;
};

export interface CartState {
  cart: CartType[];
  totalPrice: number;
}

const initialState: CartState = {
  cart: storage.getAllItems<CartType>('cart') || [],
  totalPrice: getTotalPrice(),
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleCartItem: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const index = state.cart.findIndex(el => el.id === id);

      if (index === -1) {
        const newCart: CartType[] = [
          ...state.cart,
          {
            id,
            quantity: 1,
          },
        ];

        storage.set('cart', newCart);
        state.cart = newCart;
        state.totalPrice = getTotalPrice();
      } else {
        const newCart = state.cart.filter(item => item.id !== id);

        storage.set('cart', newCart);
        state.cart = newCart;
        state.totalPrice = getTotalPrice();
      }
    },
    syncCart: state => {
      const newCart = storage.getAllItems<CartType>('cart') || [];

      state.totalPrice = getTotalPrice();
      state.cart = newCart;
    },
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const item = state.cart.find(el => el.id === id);

      if (item) {
        item.quantity += 1;
        storage.set('cart', state.cart);
        state.totalPrice = getTotalPrice();
      }
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const item = state.cart.find(el => el.id === id);

      if (item) {
        item.quantity -= 1;
        storage.set('cart', state.cart);
        state.totalPrice = getTotalPrice();
      }
    },
    clearCart: state => {
      storage.set('cart', []);
      state.cart = [];
      state.totalPrice = 0;
    },
  },
});

export const {
  toggleCartItem,
  syncCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
