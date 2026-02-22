import { createSlice } from '@reduxjs/toolkit';
import { CartProduct } from '../types/cartProduct';

export interface CartState {
  items: CartProduct[];
  itemsCount: number;
  loading: boolean;
}

const initialState: CartState = {
  items: [],
  itemsCount: 0,
  loading: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: state => {
      state.items = [];
      state.itemsCount = 0;
      localStorage.setItem('cart', JSON.stringify(state));
    },

    addItemToCart: (state, action) => {
      const { item } = action.payload;
      const existingItem = state.items.find(i => i.id === item.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...item,
          quantity: 1,
        });
      }

      state.itemsCount = state.items.reduce(
        (acc, curr) => acc + curr.quantity,
        0,
      );
      localStorage.setItem('cart', JSON.stringify(state));
    },

    removeItem: (state, action) => {
      state.items = state.items.filter(i => i.id !== action.payload);
      state.itemsCount = state.items.reduce(
        (acc, item) => acc + item.quantity,
        0,
      );

      localStorage.setItem('cart', JSON.stringify(state));
    },

    loadCardFromStorage: state => {
      state.loading = true;
      const storedItems = localStorage.getItem('cart');

      if (storedItems) {
        try {
          const parsed = JSON.parse(storedItems);

          if (Array.isArray(parsed.items)) {
            state.items = parsed.items;
            state.itemsCount = parsed.itemsCount || 0;
          }
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error('Failed to parse cart from storage', e);
        }
      }

      state.loading = false;
    },

    updateItemQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(i => i.id === id);

      if (item) {
        item.quantity = quantity;
        state.itemsCount = state.items.reduce(
          (acc, curr) => acc + curr.quantity,
          0,
        );
        localStorage.setItem('cart', JSON.stringify(state));
      }
    },
  },
});

export const {
  clearCart,
  removeItem,
  loadCardFromStorage,
  updateItemQuantity,
  addItemToCart,
} = cartSlice.actions;
export default cartSlice.reducer;
