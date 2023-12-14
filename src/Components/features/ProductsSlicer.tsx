import { getProducts } from "../../api/products";
import { Product } from "../../types/product";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type ProductState = {
  products: Product[],
//   loaded: boolean,
//   hasError: string | null,
};

const productState: ProductState = {
  products: [],
//   loaded: false,
//   hasError: null,
};

export const productsInit = createAsyncThunk('products/fetch', () => {
  return getProducts();
});

export const productsSlicer = createSlice({
  name: 'products',
  initialState: productState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(productsInit.pending, (state) => {
      return {
        ...state,
        // loaded: true,
      }
    }),
    builder.addCase(productsInit.fulfilled, (state, action) => {
      return {
        ...state,
        products: action.payload,
      }
    });
    builder.addCase(productsInit.rejected, (state) => {
      return {
        ...state,
        // loaded: false,
        // hasError: 'Error',
      }
    });
  }
});

export default productsSlicer.reducer;
