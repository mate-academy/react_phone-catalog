/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
/* import { ProductDetails } from '../types/ProductDetails'; */
import { Product } from '../types/Product';

export interface CartState {
  cart: Product[];
  totalInCart: number;
  totalPrice: number;
  quantities: { [key: string]: number };
}

const initialCart = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart') as string)
  : [];

const initialState: CartState = {
  cart: initialCart,
  totalInCart: 0,
  totalPrice: 0,
  quantities: {},
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const itemIndex = state.cart.findIndex(
        item => item.itemId === action.payload.itemId,
      );

      if (itemIndex < 0) {
        state.cart.push(action.payload);
        state.quantities[action.payload.itemId] = 1; // Зберігаємо кількість товару
      } else {
        state.quantities[action.payload.itemId] += 1; // Збільшуємо кількість товару
      }

      state.totalInCart += 1;
      state.totalPrice += action.payload.price;
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    removeFromCart: (state, action: PayloadAction<Product['itemId']>) => {
      const index = state.cart.findIndex(
        item => item.itemId === action.payload,
      );

      if (index >= 0) {
        state.totalPrice -=
          state.cart[index].price * state.quantities[state.cart[index].itemId];
        delete state.quantities[state.cart[index].itemId]; // Видаляємо кількість товару
        state.cart.splice(index, 1);
        state.totalInCart -= 1;
        localStorage.setItem('cart', JSON.stringify(state.cart));
      }
    },
    increaseQuantity: (state, action: PayloadAction<Product['itemId']>) => {
      if (state.quantities[action.payload]) {
        const foundItem = state.cart.find(
          item => item.itemId === action.payload,
        );

        if (foundItem) {
          state.quantities[action.payload] += 1;
          state.totalPrice += foundItem.price;
          state.totalInCart += 1;
        }
      }
    },
    decreaseQuantity: (state, action: PayloadAction<Product['itemId']>) => {
      if (
        state.quantities[action.payload] &&
        state.quantities[action.payload] > 1
      ) {
        const foundItem = state.cart.find(
          item => item.itemId === action.payload,
        );

        if (foundItem) {
          state.quantities[action.payload] -= 1;
          state.totalPrice -= foundItem.price;
          state.totalInCart -= 1;
        }
      }
    },
  },
});

export const { addToCart, removeFromCart, decreaseQuantity, increaseQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
