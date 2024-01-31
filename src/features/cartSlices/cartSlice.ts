import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
// import { IPhone } from '../../types/Phone.interface';
import { ICartPhone } from '../../types';

type Cart = {
  quantityCart: number,
  phones: ICartPhone[],
};

const initialState: Cart = {
  quantityCart: 0,
  phones: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addPhoneToCart(state, action: PayloadAction<ICartPhone>) {
      state.phones.push({
        ...action.payload,
      });
      state.quantityCart += 1;
    },
    incrementPhoneQauntity(state, action: PayloadAction<ICartPhone>) {
      const phone = state.phones.find(
        (item) => item.phoneId === action.payload.phoneId,
      );

      if (phone) {
        phone.quantity += 1;
        state.quantityCart += 1;
      }
    },
    decrementPhoneQauntity(state, action: PayloadAction<string>) {
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
          state.quantityCart -= 1;
        }
      }
    },
    removePhoneFromCart(state, action: PayloadAction<string>) {
      const phone = state.phones.find(
        (item) => item.phoneId === action.payload,
      );

      if (phone) {
        state.phones = state.phones.filter(
          (item) => item.phoneId !== action.payload,
        );
        state.quantityCart -= phone.quantity;
      }
    },
  },
});

export const selectCartPhones = (state: RootState) => state.cart.phones;
export const selectCartQuantity = (state: RootState) => state.cart.quantityCart;
export const {
  addPhoneToCart,
  removePhoneFromCart,
  decrementPhoneQauntity,
  incrementPhoneQauntity,
} = cartSlice.actions;
export default cartSlice.reducer;
