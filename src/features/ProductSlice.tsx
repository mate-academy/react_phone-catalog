import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Products } from '../types/Product';
import { getProduct } from '../utils/fetchClient';

export interface ProductsState {
  products: Products[];
  phones: Products[];
  tablets: Products[];
  accessories: Products[];
}

export const fetchProduct = createAsyncThunk('product/fetch', () => {
  return getProduct();
});

const initialState: ProductsState = {
  products: [],
  phones: [],
  tablets: [],
  accessories: [],
};

export const hotPricesState = createSlice({
  name: 'products',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      return {
        ...state,
        products: action.payload,
        phones: action.payload.filter(phone => phone.category === 'phones'),
        tablets: action.payload.filter(tablet => tablet.category === 'tablets'),
        accessories: action.payload.filter(
          accessori => accessori.category === 'accessories',
        ),
      };
    });
  },
});

export default hotPricesState.reducer;
