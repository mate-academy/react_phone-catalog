/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

type CheckoutState = {
  isCheckout: boolean,
};

const initialState: CheckoutState = {
  isCheckout: false,
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    openCheckout: (state) => {
      state.isCheckout = true;
    },

    closeCheckout: (state) => {
      state.isCheckout = false;
    },
  },
});

export const { openCheckout, closeCheckout } = checkoutSlice.actions;
export default checkoutSlice.reducer;
