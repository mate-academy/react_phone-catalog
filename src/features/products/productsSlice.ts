import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Products } from '../../types/Products';
import { getAllData } from '../../api/data';

type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

type ProductsState = {
  products: Products[],
  status: StatusType,
  hasError: boolean,
};

const initialState: ProductsState = {
  products: [],
  status: 'idle',
  hasError: false,
};

export const fetchProducts = createAsyncThunk(
  'products/getProducts', (products: string) => {
    return getAllData(products);
  },
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
  },
  extraReducers(builder) {
    builder.addCase(fetchProducts.pending, (state) => {
      state.status = 'loading';
    });

    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
      state.status = 'succeeded';
    });

    builder.addCase(fetchProducts.rejected, (state) => {
      state.status = 'failed';
      state.hasError = true;
    });
  },
});

export default productsSlice.reducer;
