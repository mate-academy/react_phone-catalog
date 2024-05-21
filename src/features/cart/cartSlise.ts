import { createSlice } from '@reduxjs/toolkit';
import { ICartInterface } from '../../utils/interfaces/ICartInterface';

const initialState: ICartInterface = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.items.push(action.payload);
    },
    removeFromCart: (state, action) => {
      const currentGadgetId = state.items.findIndex(
        product => product.id === action.payload.id,
      );

      state.items.splice(currentGadgetId, 1);
    },
  },
});

export default cartSlice.reducer;

export const { addToCart, removeFromCart } = cartSlice.actions;
