/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ProductNameState = {
  item: string;
};

const initialState: ProductNameState = {
  item: '',
};

export const productNameSlice = createSlice({
  name: 'productName',
  initialState,
  reducers: {
    setName(state, action: PayloadAction<string>) {
      state.item = action.payload;
    },
    clearName(state) {
      state.item = '';
    },
  },
});

export const { setName, clearName } = productNameSlice.actions;
export default productNameSlice.reducer;
