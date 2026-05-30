import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../../../modules/shared/types/Product";
import axios from "axios";

type ProductState = {
  items: Product[];
  isLoading: boolean;
  isError: boolean;
};

const initialState: ProductState = {
  items: [],
  isLoading: false,
  isError: false,
}

export const fetchProducts = createAsyncThunk('fetchProducts', async () => {
  const { data } = await axios.get('api/products.json');

  await new Promise((resolve) => setTimeout(resolve, 400));

  return data;
});


export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.isLoading = true;
      state.items = [];
    }).addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
      state.isLoading = false;
    }).addCase(fetchProducts.rejected, (state) => {
      state.items = [];
      state.isError = true;
    });
  }
});

export default productSlice.reducer;