/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/Product';

type CartState = {
  items: Product[];
};

const loadCartFromLocaleStorage = (): Product[] => {
  const storedCarts = localStorage.getItem('carts');

  return storedCarts ? JSON.parse(storedCarts) : [];
};

const initialState: CartState = {
  items: loadCartFromLocaleStorage(),
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCarts(state, action: PayloadAction<Product[]>) {
      const newItems = [...state.items, ...action.payload];

      localStorage.setItem('carts', JSON.stringify(newItems));

      return { ...state, items: newItems };
    },

    deleteCarts(state, action: PayloadAction<string | number>) {
      const filteredItems = state.items.filter(
        (item: { itemId: string | number; id: string | number }) =>
          item.itemId !== action.payload && item.id !== action.payload,
      );

      localStorage.setItem('carts', JSON.stringify(filteredItems));

      return { ...state, items: filteredItems };
    },
    addCase(state, action: PayloadAction<string | number>) {
      const existingItem = state.items.find(
        (product: { id: string | number }) => product.id === action.payload,
      );

      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 0) + 1;
        localStorage.setItem('carts', JSON.stringify(state.items));
      }
    },
    decreaseCase(state, action: PayloadAction<string | number>) {
      const existingItem = state.items.find(
        (product: { id: string | number }) => product.id === action.payload,
      );

      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 0) - 1;
        localStorage.setItem('carts', JSON.stringify(state.items));
      }
    },
    clearCase(state) {
      state.items = [];
      localStorage.setItem('carts', JSON.stringify(state.items));
    },
  },
});

export const { setCarts, deleteCarts, addCase, decreaseCase, clearCase } =
  cartSlice.actions;
export default cartSlice.reducer;
