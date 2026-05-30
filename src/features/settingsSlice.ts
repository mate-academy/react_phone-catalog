/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../app/store';
import { Product } from '../types/products';
import { getProducts } from '../api/products';

export interface AppState {
  isOpenMenu: boolean;
  isLoadProducts: boolean;
  products: Product[];
}

const initialState: AppState = {
  isOpenMenu: false,
  isLoadProducts: false,
  products: [],
};

export const loadProducts = createAsyncThunk(
  'store/fetchProducts',
  async () => {
    const value = await getProducts();

    return value;
  },
);

export const settingsSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    toggleMenuReducer: state => {
      state.isOpenMenu = !state.isOpenMenu;
    },
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    setIsLoad: (state, action: PayloadAction<boolean>) => {
      state.isLoadProducts = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadProducts.pending, state => {
        state.isLoadProducts = true;
      })
      .addCase(loadProducts.fulfilled, (state, action) => {
        state.isLoadProducts = false;
        state.products = action.payload;
      })
      .addCase(loadProducts.rejected, state => {
        state.isLoadProducts = false;
      });
  },
});

export const selectMenu = (state: RootState) => state.store.isOpenMenu;

export const { toggleMenuReducer, setProducts, setIsLoad } =
  settingsSlice.actions;

export const toggleMenu = (): AppThunk => {
  return dispatch => {
    dispatch(toggleMenuReducer());
  };
};

export default settingsSlice.reducer;
