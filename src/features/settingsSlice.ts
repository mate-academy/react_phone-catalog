/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../app/store';
import { Product } from '../types/products';
import {
  getAccessories,
  getPhones,
  getProducts,
  getTablets,
} from '../api/products';
import { ProductDetail } from '../types/productDetail';
import { TypeProduct } from '../types/category';

export interface AppState {
  isOpenMenu: boolean;
  isLoadProducts: boolean;
  products: Product[];
  phones: ProductDetail[];
  tablets: ProductDetail[];
  accessories: ProductDetail[];
}

const initialState: AppState = {
  isOpenMenu: false,
  isLoadProducts: false,
  products: [],
  phones: [],
  tablets: [],
  accessories: [],
};

export const loadProducts = createAsyncThunk(
  'store/fetchProducts',
  async () => {
    const value = await getProducts();

    return value;
  },
);

export const loadProductsByType = createAsyncThunk(
  'store/fetchProductsByType',
  async (fetchType: TypeProduct) => {
    switch (fetchType) {
      case TypeProduct.phones:
        return getPhones();
      case TypeProduct.tablets:
        return getTablets();
      case TypeProduct.accessories:
        return getAccessories();
      default:
        return [];
    }
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
      })

      .addCase(loadProductsByType.pending, state => {
        state.isLoadProducts = true;
      })
      .addCase(
        loadProductsByType.fulfilled,
        (
          state: {
            isLoadProducts: boolean;
            phones: ProductDetail[];
            tablets: ProductDetail[];
            accessories: ProductDetail[];
          },
          action: { payload: ProductDetail[]; meta: { arg: TypeProduct } },
        ) => {
          state.isLoadProducts = false;
          switch (action.meta.arg) {
            case TypeProduct.phones:
              state.phones = action.payload as ProductDetail[];
              break;
            case TypeProduct.tablets:
              state.tablets = action.payload as ProductDetail[];
              break;
            case TypeProduct.accessories:
              state.accessories = action.payload as ProductDetail[];
              break;
            default:
              break;
          }
        },
      )
      .addCase(loadProductsByType.rejected, state => {
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
