/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Product } from './types/Product';
import { getAllDetailedProducts, getAllProducts } from '../utils/api/products';
import { DetailProduct } from './types/DetailProduct';

type ProductState = {
  productList: Product[];
  detailedProdList: DetailProduct[];
  favoritesList: Product[];
  cartList: Product[];
  totalItemsInCart: number;
  isProdLoading: boolean;
};

const initialState: ProductState = {
  productList: [],
  detailedProdList: [],
  favoritesList: [],
  cartList: [],
  totalItemsInCart: 0,
  isProdLoading: false,
};

export const initProducts = createAsyncThunk('products/fetch', () => {
  return getAllProducts();
});

export const initDetailedProducts = createAsyncThunk(
  'detailedProducts/fetch',
  () => {
    return getAllDetailedProducts();
  },
);

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFavoritesList: (st, ac) => {
      st.favoritesList = ac.payload;
    },
    setCartList: (st, ac) => {
      st.cartList = ac.payload;
    },
    setTotalItemsInCart: (st, ac) => {
      st.totalItemsInCart = ac.payload;
    },
  },
  extraReducers: buider => {
    buider.addCase(initProducts.pending, state => {
      state.isProdLoading = true;
    });
    buider.addCase(initProducts.fulfilled, (state, action) => {
      state.productList = action.payload;
      state.isProdLoading = false;
    });
    buider.addCase(initDetailedProducts.pending, state => {
      state.isProdLoading = true;
    });
    buider.addCase(initDetailedProducts.fulfilled, (state, action) => {
      state.detailedProdList = action.payload;
      state.isProdLoading = false;
    });
  },
});

export const { setFavoritesList, setCartList, setTotalItemsInCart } =
  productSlice.actions;
export default productSlice.reducer;
