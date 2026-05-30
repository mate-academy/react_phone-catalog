/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ProductType } from '../../types/Product';

type Quantity = { quantity: number };
type СartItem = ProductType & Quantity;

const data = localStorage.getItem('cartItems');
const initialCart: СartItem[] = JSON.parse(data as string) || [];

const initialState = {
  cartList: initialCart,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ProductType>) => {
      const deviceId = action.payload.itemId;

      // Перевіряємо, чи існує пристрій
      const productIndex = state.cartList.findIndex(
        el => el.itemId === deviceId,
      );

      if (productIndex !== -1) {
        // Якщо знайдено, видаляємо
        state.cartList.splice(productIndex, 1);
      } else {
        // Якщо не знайдено, додаємо
        state.cartList.push({ ...action.payload, quantity: 1 });
      }

      localStorage.setItem('cartItems', JSON.stringify(state.cartList));
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cartList = state.cartList.filter(
        item => item.itemId !== action.payload,
      );
    },
    // Збільшення кількості
    addQuantity: (state, action: PayloadAction<string>) => {
      const item = state.cartList.find(el => el.itemId === action.payload);

      if (item) {
        item.quantity += 1; // Збільшуємо кількість
      }
    },

    // Зменшення кількості
    minusQuantity: (state, action: PayloadAction<string>) => {
      const item = state.cartList.find(el => el.itemId === action.payload);

      if (item) {
        item.quantity -= 1; // Зменшуємо кількість
      }
    },
    clearItems: state => {
      state.cartList = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addToCart,
  removeFromCart,
  addQuantity,
  minusQuantity,
  clearItems,
} = cartSlice.actions;

export default cartSlice.reducer;
