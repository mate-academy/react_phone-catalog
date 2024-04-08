import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Products } from '../types/Product';
import { getProduct } from '../utils/fetchClient';

export interface ProductsState {
  product: Products[]
}

export const fetchProduct = createAsyncThunk('product/fetch', () => {
  return getProduct()
})

const initialState: ProductsState = {
  product: [],
}

export const hotPricesState = createSlice({
  name: 'hotPrice',
  initialState,
  reducers: {

  },

  extraReducers: builder => {
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      return {
        ...state,
        product: action.payload,
      }
    });
  },
});

export default hotPricesState.reducer;
// export const { getHotPriceProducts } = hotPricesState.actions;
