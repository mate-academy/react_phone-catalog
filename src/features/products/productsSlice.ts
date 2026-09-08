/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ProductType } from '../../types/Product';

export const setProducts = createAsyncThunk(
  'products/setProducts',
  async () => {
    const res = await fetch('../../react_phone-catalog/api/products.json');

    return res.json();
  },
);

const initialState = {
  listOfproducts: [] as ProductType[],
  loaded: true,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(setProducts.pending, state => {
      state.loaded = false;
    });
    builder.addCase(setProducts.fulfilled, (state, action) => {
      state.listOfproducts = action.payload;
      state.loaded = true;
    });
  },
});

export default productsSlice.reducer;
