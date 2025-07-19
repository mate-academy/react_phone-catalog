import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CartState = {
  items: string[];
};

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleCartItem: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const index = state.items.indexOf(id);

      if (index === -1) {
        state.items.push(id);
      } else {
        state.items.splice(index, 1);
      }
    },
  },
});

export const { toggleCartItem } = cartSlice.actions;
export default cartSlice.reducer;
