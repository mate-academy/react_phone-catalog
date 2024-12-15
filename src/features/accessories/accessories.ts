/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AccessoryType } from '../../types/Product';

export const setAccessories = createAsyncThunk(
  'phones/setAccessories',
  async () => {
    const res = await fetch('../../public/api/accessories.json');

    return res.json();
  },
);

const initialState = {
  listOfAccessories: [] as AccessoryType[],
};

export const accessoriesSlice = createSlice({
  name: 'accessories',
  initialState,
  reducers: {},
  extraReducers(builder) {
    // builder.addCase(setProducts.pending, state => {
    //   state.hasError = false;
    //   state.loaded = false;
    // });
    builder.addCase(setAccessories.fulfilled, (state, action) => {
      state.listOfAccessories = action.payload;
    });
    // builder.addCase(setProducts.rejected, state => {
    //   state.loaded = true;
    //   state.hasError = true;
    // });
  },
});

export default accessoriesSlice.reducer;
