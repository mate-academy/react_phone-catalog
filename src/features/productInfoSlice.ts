import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { getJson } from '../helpers/fetchData';
import { Category } from '../types/category';
import { TabAccessPhone } from '../types/tabAccessPhones';

export type ProductInfo = {
  product: TabAccessPhone | undefined | null;
  loading: boolean,
};

const initialState: ProductInfo = {
  product: undefined,
  loading: false,
};

const phonesUrl = 'phones.json';
const tabletsUrl = 'tablets.json';
const accessoriesUrl = 'accessories.json';


export const startLoadingProduct = createAsyncThunk(
  'productInfo',
  async (payload: {
    categoryId: string | undefined,
    productId: string,
  }) => {

    let products: TabAccessPhone[] | undefined;

    switch (payload.categoryId) {
      case Category.PHONES:
        products = await getJson(phonesUrl);
        break;
      case Category.TABLETS:
        products = await getJson(tabletsUrl);
        break;
      case Category.ACCESSORIES:
        products = await getJson(accessoriesUrl);
        break;
      default:
        console.warn('there is no such categoryId', payload.categoryId)
        break;
    }

    if (products) {
      return products.find(item => item.id === payload.productId)
    } else {
      return null
    }
  }
);

const productInfoSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(startLoadingProduct.pending, state => {
        const currentState = state;

        currentState.loading = true;
      })
      .addCase(startLoadingProduct.fulfilled, (state, action) => {
        let currentState = state;

        currentState.loading = false;
        currentState.product = action.payload;
      })
  }
});

export const selectedInfoProduct = (state: RootState) =>
  state.selectedProduct.product;
export default productInfoSlice.reducer;
