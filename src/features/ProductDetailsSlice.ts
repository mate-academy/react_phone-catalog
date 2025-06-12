
import { fetchOneProducts } from "../api/fetchOneTypeProducts";
import { Product } from "../types/product";
import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";

type ProductDetailState = {
  product: Product | null;
  loading: boolean;
  error: string;
}
const initialState: ProductDetailState = {
  product: null,
  loading: false,
  error: '',
}
export const detailsProduct = createAsyncThunk('product/fetch', ({category, id}) => {
  return fetchOneProducts(category, id);
})
export const productDetailsSlice = createSlice({
  name: 'productDetails',
  initialState,
  reducers:{

  },
  extraReducers: (builder) => {
    builder.addCase(detailsProduct.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(detailsProduct.fulfilled, (state, action) => {
      state.product = action.payload;
      state.loading = false;
    })
    builder.addCase(detailsProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to load product';
    })
  }
})
export default productDetailsSlice.reducer;
