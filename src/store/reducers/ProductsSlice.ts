import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../models/product';
import { fetchClient } from '../../utils/fetchClient';

interface ProductsState {
  products: Product[] | null,
  isLoading: boolean,
  error: string,
  searchbar: string,
}

const initialState: ProductsState = {
  products: null,
  isLoading: false,
  error: '',
  searchbar: '',
};

export const getProducts = createAsyncThunk(
  'products/fetch',
  async (category?: string) => {
    if (category) {
      const allProducts = await fetchClient.get<Product[]>('products.json');
      const filteredProducts = allProducts.filter(product => product.category === category);
      return filteredProducts;
    } else {
      return fetchClient.get<Product[]>('products.json');
    }
  },
);

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearchbar(state, action: PayloadAction<string>) {
      return {
        ...state,
        searchbar: action.payload,
      };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getProducts.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        return {
          ...state,
          products: action.payload,
          isLoading: false,
          error: '',
        };
      })
      .addCase(getProducts.rejected, (state) => {
        return {
          ...state,
          products: null,
          isLoading: false,
          error: 'Unable to load product',
        };
      });
  },
});

export const { setSearchbar } = productsSlice.actions;

export default productsSlice.reducer;
