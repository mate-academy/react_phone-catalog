import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { SliderProduct } from '../../types/SliderProduct';
import { getProducts } from '../../fetchClient/fetchClient';

type ProductsState = {
  products: SliderProduct[];
  productsLoading: boolean;
  productsErrorMsg: string;
};

const initialState: ProductsState = {
  products: [],
  productsLoading: false,
  productsErrorMsg: '',
};

export const fetchProducts = createAsyncThunk('products/fetch', async () => {
  return getProducts();
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearErrorMsg: state => {
      return { ...state, productsErrorMsg: '' };
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchProducts.pending, state => {
      return { ...state, productsLoading: true };
    });

    builder.addCase(
      fetchProducts.fulfilled,
      (state, action: PayloadAction<SliderProduct[]>) => {
        return { ...state, products: action.payload, productsLoading: false };
      },
    );

    builder.addCase(fetchProducts.rejected, state => {
      return {
        ...state,
        productsLoading: false,
        productsErrorMsg: 'Oops! Something went wrong.',
      };
    });
  },
});

export default productsSlice.reducer;
export const { clearErrorMsg } = productsSlice.actions;
export const selectProducts = (state: RootState) => state.products;
