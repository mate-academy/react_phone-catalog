import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchData } from '../helpers/fetchData';
import { ProductDetails } from '../types/ProductDetails';

type AccessoriesState = {
  productList: ProductDetails[];
  loading: boolean;
  error: boolean;
};

const initialState: AccessoriesState = {
  productList: [],
  loading: false,
  error: false,
};

export const accessoriesSlice = createSlice({
  name: 'accessories',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      state.loading = true;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.productList = action.payload;
      state.loading = false;
      state.error = false;
    });

    builder.addCase(init.rejected, state => {
      state.loading = false;
      state.error = true;
    });
  },
});

export default accessoriesSlice.reducer;

export const init = createAsyncThunk('accessories/fetch', () => {
  return fetchData<ProductDetails[]>('/api/accessories.json');
});
