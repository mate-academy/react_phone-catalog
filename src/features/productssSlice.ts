import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getProduct } from '../helpers/fetchData';
import { Category } from '../types/category';

export type TabAccessPhone = {
  phones: TabAccessPhone[];
  tablets: TabAccessPhone[];
  accessories: TabAccessPhone[];
  loading: boolean;
  error: boolean;
  query: string;
};

const initialState: TabAccessPhone = {
  phones: [],
  tablets: [],
  accessories: [],
  loading: false,
  error: false,
  query: '',
};

const BASE_URL = 'https://hanna-balabukha.github.io/react_phone-catalog/api/';

const productsUrl = BASE_URL + 'products.json';
const phonesUrl = BASE_URL + 'phones.json';
const tabletsUrl = BASE_URL + 'tablets.json';
const accessoriesUrl = BASE_URL + 'accessories.json';

export const fetchAllProducts = createAsyncThunk(
  'products/fetchAllProducts',
  async () => {
    const phones = await getProduct(productsUrl);
    const tablets = await getProduct(productsUrl);
    const accessories = await getProduct(productsUrl);

    return { phones, tablets, accessories };
  },
);

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (category: Category) => {
    let products: TabAccessPhone[] = [];

    switch (category) {
      case Category.PHONES:
        products = await getProduct(phonesUrl);
        break;
      case Category.TABLETS:
        products = await getProduct(tabletsUrl);
        break;
      case Category.ACCESSORIES:
        products = await getProduct(accessoriesUrl);
        break;
      default:
        break;
    }

    return products;
  },
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAllProducts.pending, state => {
        state.loading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.phones = action.payload.phones;
        state.tablets = action.payload.tablets;
        state.accessories = action.payload.accessories;
      })
      .addCase(fetchAllProducts.rejected, state => {
        state.loading = false;
        state.error = true;
      })
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state[action.meta.arg] = action.payload;
      })
      .addCase(fetchProducts.rejected, state => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const { setQuery } = productsSlice.actions;
export default productsSlice.reducer;
