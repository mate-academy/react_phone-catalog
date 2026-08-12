import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { loadFromLocalStorage } from './localStorage';

const CART_STORAGE_KEY = 'cart';

export type CartItem = {
  itemId: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
};

const initialState: CartState = {
  items: loadFromLocalStorage<CartItem[]>(CART_STORAGE_KEY, []),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      const existingItem = state.items.find(item => item.itemId === itemId);

      if (existingItem) {
        return {
          items: state.items,
        };
      }

      return {
        items: [
          ...state.items,
          {
            itemId,
            quantity: 1,
          },
        ],
      };
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;

      return {
        items: state.items.filter(item => item.itemId !== itemId),
      };
    },

    increaseQuantity: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;

      return {
        items: state.items.map(item => {
          if (item.itemId !== itemId) {
            return item;
          }

          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }),
      };
    },

    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;

      return {
        items: state.items.map(item => {
          if (item.itemId !== itemId || item.quantity === 1) {
            return item;
          }

          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }),
      };
    },

    clearCart: () => {
      return {
        items: [],
      };
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
