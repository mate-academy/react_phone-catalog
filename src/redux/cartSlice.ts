import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  id: string;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<string>) => {
      const existingItem = state.items.find(item => item.id === action.payload);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          id: action.payload,
          quantity: 1,
        });
      }
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      // eslint-disable-next-line no-param-reassign
      state.items = state.items.filter(item => item.id !== action.payload);
    },

    increaseQuantity: (state, action: PayloadAction<string>) => {
      const product = state.items.find(item => item.id === action.payload);

      if (product) {
        product.quantity += 1;
      }
    },

    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const product = state.items.find(item => item.id === action.payload);

      if (!product) {
        return;
      }

      if (product.quantity > 1) {
        product.quantity -= 1;
      } else {
        // eslint-disable-next-line no-param-reassign
        state.items = state.items.filter(item => item.id !== action.payload);
      }
    },
  },
});

export const cartReducer = cartSlice.reducer;
export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } =
  cartSlice.actions;
