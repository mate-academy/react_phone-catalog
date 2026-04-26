import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CartItem = {
  itemId: string;
  quantity: number;
};

export interface CartListState {
  items: CartItem[];
}

const initialState: CartListState = {
  items: JSON.parse(localStorage.getItem('cartList') || '[]'),
};

const cartListSlice = createSlice({
  name: 'cartList',
  initialState,
  reducers: {
    addInCart: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;

      const existingItem = state.items.find(item => item.itemId === itemId);

      if (!existingItem) {
        state.items.push({
          itemId,
          quantity: 1,
        });
      }
    },
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;

      const cartItem = state.items.find(item => item.itemId === itemId);

      if (cartItem) {
        cartItem.quantity += 1;
      }
    },
    minusQuantity: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;

      const cartItem = state.items.find(item => item.itemId === itemId);

      if (!cartItem) {
        return;
      }

      if (cartItem.quantity > 1) {
        cartItem.quantity -= 1;
      } else {
        const index = state.items.findIndex(item => item.itemId === itemId);

        if (index !== -1) {
          state.items.splice(index, 1);
        }
      }
    },
    removeInCart: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;

      const index = state.items.findIndex(item => item.itemId === itemId);

      if (index !== -1) {
        state.items.splice(index, 1);
      }
    },
    clearCart: () => {
      return { items: [] };
    },
  },
});

export const {
  addInCart,
  increaseQuantity,
  minusQuantity,
  removeInCart,
  clearCart,
} = cartListSlice.actions;

export default cartListSlice.reducer;
