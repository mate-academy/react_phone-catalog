import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Product } from '../../definitions/types/Product';
import { getProducts } from '../../api/products';
import { favoritesActions } from './favoritesSlice';
import { cartActions } from './cartSlice';
import { Category } from "../../definitions/enums/Category";

type ProductState = {
  loading: boolean,
  error: string,
  products: Product[]
};

const initialState: ProductState = {
  loading: false,
  error: '',
  products: [],
};

const init = createAsyncThunk('products/init',
  async (category: Category, { dispatch }) => {
    try {
      const products = await getProducts(category);

      dispatch(favoritesActions.init(products));
      dispatch(cartActions.init(products));

      return products;
    } catch (error) {
      throw error;
    }
  });

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    clear: (state) => {
      state.products = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(init.fulfilled, (state, action) => {
      state.products = action.payload;
      state.loading = false;
    });
    builder.addCase(init.rejected, (state, action) => {
      state.error = action.error.message ?? 'Server error. Failed to load data';
      state.loading = false;
    });
  },
});

export const productsActions = {
  init,
  ...productsSlice.actions,
};

export const productsReducer = productsSlice.reducer;
