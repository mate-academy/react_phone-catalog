import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getProducts } from '../api';
import { Product } from '../types/products';

type StateProps = {
  products: Product[];
  loading: boolean;
  error: boolean;
};

export const fetchProducts = createAsyncThunk<Product[], void>(
  'phone/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getProducts();

      return response;
    } catch (error) {
      return rejectWithValue('Failed to fetch products');
    }
  },
);

const initialState: StateProps = {
  products: [],
  loading: false,
  error: false,
};

const productSlice = createSlice({
  name: 'phone',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.products = action.payload;
          state.loading = false;
        },
      )
      .addCase(fetchProducts.rejected, state => {
        state.products = [];
        state.loading = false;
        state.error = true;
      });
  },
});

export default productSlice.reducer;
