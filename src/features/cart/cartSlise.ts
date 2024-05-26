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
    handleAddQuantity: (state, action) => {
      state.items.forEach(cartItem => {
        if (action.payload === cartItem.id && cartItem.quantity) {
          // eslint-disable-next-line no-param-reassign
          cartItem.quantity += 1;
        }
      });
    },
    handleMinusQuantity: (state, action) => {
      state.items.forEach(cartItem => {
        if (action.payload === cartItem.id && cartItem.quantity) {
          // eslint-disable-next-line no-param-reassign
          cartItem.quantity -= 1;
        }
      });
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

export const {
  addToCart,
  removeFromCart,
  handleAddQuantity,
  handleMinusQuantity,
} = cartSlice.actions;
