/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export interface ProductNameState {
  item: string;
}

const initialState: ProductNameState = {
  item: '',
};

export const ProductNameSlice = createSlice({
  name: 'ProductName',
  initialState,
  reducers: {
    setName(state, action) {
      state.item = action.payload;
    },
    clearName(state) {
      state.item = '';
    },
  },
});

export const { setName, clearName } = ProductNameSlice.actions;
export default ProductNameSlice.reducer;
