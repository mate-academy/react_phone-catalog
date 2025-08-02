import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchData } from '../helpers/fetchData';
import { ProductDetails } from '../types/ProductDetails';

type TabletsState = {
  productList: ProductDetails[];
  loading: boolean;
  error: boolean;
};

const initialState: TabletsState = {
  productList: [],
  loading: false,
  error: false,
};

export const tabletsSlice = createSlice({
  name: 'tablets',
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

export default tabletsSlice.reducer;

export const init = createAsyncThunk('tablets/fetch', () => {
  return fetchData<ProductDetails[]>('/api/tablets.json');
});
