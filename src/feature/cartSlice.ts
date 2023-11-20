import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Phone } from '../type/Phone';

const initialState: Phone[] = [];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCart: (phones, action: PayloadAction<Phone>) => {
      phones.push({ ...action.payload, amount: 1 });
    },
    removeCart: (phones, action: PayloadAction<Phone>) => {
      return phones.filter(phone => phone.phoneId !== action.payload.phoneId);
    },
    clearCart: () => [],
    addAmountCart: (phones, action: PayloadAction<Phone>) => {
      return (
        phones.map(amountPhone => {
          if (amountPhone.phoneId === action.payload.phoneId) {
            return {
              ...action.payload,
              amount: action.payload.amount
                ? action.payload.amount + 1
                : 1,
            };
          }

          return amountPhone;
        })
      );
    },
    removeAmountCart: (phones, action: PayloadAction<Phone>) => {
      return (
        phones.map(amountPhone => {
          if (amountPhone.phoneId === action.payload.phoneId) {
            return {
              ...action.payload,
              amount: action.payload.amount
                ? action.payload.amount - 1
                : 1,
            };
          }

          return amountPhone;
        })
      );
    },
  },
});

export default cartSlice.reducer;
export const {
  addCart, removeCart, clearCart, addAmountCart, removeAmountCart,
} = cartSlice.actions;
