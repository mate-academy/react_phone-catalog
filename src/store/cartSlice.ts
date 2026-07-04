import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  id: string;
  quantity: number;
  checked: boolean;
}

export interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: JSON.parse(localStorage.getItem('cart') || '[]'),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<string>) => {
      const existingItem = state.items.find(item => item.id === action.payload);

      if (!existingItem) {
        state.items.push({ id: action.payload, quantity: 1, checked: true });
      }
    },
    checkItem: (state, action: PayloadAction<string>) => {
      state.items.map(item =>
        item.id === action.payload ? { ...item, checked: !item.checked } : item,
      );
    },
  },
});

export const { addToCart, checkItem } = cartSlice.actions;
export default cartSlice.reducer;
