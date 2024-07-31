import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getProduct } from '../helpers/fetchData';
import { Category } from '../types/category';
import { TabAccessPhone } from '../types/tabAccessPhones';

export type AllProducts = {
  phones: TabAccessPhone[];
  tablets: TabAccessPhone[];
  accessories: TabAccessPhone[];
  loading: boolean;
  error: boolean;
  query: string;
};

const initialState: AllProducts = {
  phones: [],
  tablets: [],
  accessories: [],
  loading: false,
  error: false,
  query: '',
};

const phonesUrl = 'phones.json';
const tabletsUrl = 'tablets.json';
const accessoriesUrl = 'accessories.json';

export const fetchAllProducts = createAsyncThunk(
  'products/fetchAllProducts',
  async () => {
    const phones = await getProduct(phonesUrl);
    const tablets = await getProduct(tabletsUrl);
    const accessories = await getProduct(accessoriesUrl);

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
      const currentState = state;

      currentState.query = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAllProducts.pending, state => {
        const currentState = state;

        currentState.loading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        const currentState = state;

        currentState.loading = false;
        currentState.phones = action.payload.phones;
        currentState.tablets = action.payload.tablets;
        currentState.accessories = action.payload.accessories;
      })
      .addCase(fetchAllProducts.rejected, state => {
        const currentState = state;

        currentState.loading = false;
        currentState.error = true;
      })
      .addCase(fetchProducts.pending, state => {
        const currentState = state;

        currentState.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        const currentState = state;

        currentState.loading = false;
        currentState[action.meta.arg] = action.payload;
      })
      .addCase(fetchProducts.rejected, state => {
        const currentState = state;

        currentState.loading = false;
        currentState.error = true;
      });
  },
});

export const { setQuery } = productsSlice.actions;
export default productsSlice.reducer;
