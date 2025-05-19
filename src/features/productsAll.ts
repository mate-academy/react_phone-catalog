// productsSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export type ProductCategory = 'phones' | 'tablets' | 'accessories';

export interface Product {
  id: string;
  category: ProductCategory;
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  color: string;
  images: string[];
  description: {
    title: string;
    text: string[];
  }[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: string[];
}

interface ProductsState {
  items: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: ProductsState = {
  items: [],
  status: 'idle',
};

// One thunk to fetch all
export const fetchAllProducts = createAsyncThunk(
  'products/fetchAll',
  async () => {
    const [phones, tablets, accessories] = await Promise.all([
      fetch('/api/phones.json').then(res => res.json()),
      fetch('/api/tablets.json').then(res => res.json()),
      fetch('/api/accessories.json').then(res => res.json()),
    ]);

    return [
      ...phones.map((p: any) => ({ ...p, category: 'phones' })),
      ...tablets.map((t: any) => ({ ...t, category: 'tablets' })),
      ...accessories.map((a: any) => ({ ...a, category: 'accessories' })),
    ];
  },
);

export const productsSlice = createSlice({
  name: 'productsAll',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAllProducts.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchAllProducts.rejected, state => {
        state.status = 'failed';
      });
  },
});

export default productsSlice.reducer;

export const selectAllProducts = (state: any) => state.productsAll.items;
export const selectProductsByCategory =
  (category: ProductCategory) => (state: any) =>
    state.productsAll.items.filter(
      (item: Product) => item.category === category,
    );
export const selectProductById = (itemId: string) => (state: any) =>
  state.productsAll.items.find(
    (product: Product) => product.namespaceId === itemId,
  );
