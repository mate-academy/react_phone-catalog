import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { Phone } from '../../types/Phone';

type Cart = {
  quantityCart: number,
  phones: Phone[],
};

const initialState: Cart = {
  quantityCart: 0,
  phones: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addPhoneToCart(state, action: PayloadAction<Phone>) {
      const phone = state.phones.find(
        (item) => item.phoneId === action.payload.phoneId,
      );

      if (!phone) {
        state.phones.push({
          ...action.payload,
          totalPrice: action.payload.price,
        });
        state.quantityCart += 1;
      } else {
        phone.quantity += 1;
        phone.totalPrice = phone.quantity * phone.price;
        state.quantityCart += 1;
      }
    },

    removePhoneFromCart(state, action: PayloadAction<string>) {
      const phone = state.phones.find(
        (item) => item.phoneId === action.payload,
      );

      if (phone) {
        if (phone.quantity === 1) {
          state.phones = state.phones.filter(
            (item) => item.phoneId !== action.payload,
          );
          state.quantityCart -= 1;
        } else {
          phone.quantity -= 1;
          phone.totalPrice = phone.quantity * phone.price;
          state.quantityCart -= 1;
        }
      }
    },
  },
});

export const selectPhones = (state: RootState) => state.cart.phones;
export const selectQuantityCart = (state: RootState) => state.cart.quantityCart;
export const { addPhoneToCart, removePhoneFromCart } = cartSlice.actions;
export default cartSlice.reducer;
