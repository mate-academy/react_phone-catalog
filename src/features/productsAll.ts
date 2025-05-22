import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store'; // Update this path to your actual store path

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
  currentItem: Product | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: ProductsState = {
  items: [],
  currentItem: null,
  status: 'idle',
};

// ✅ Cleaner version of async thunk
export const fetchAllProducts = createAsyncThunk<Product[]>(
  'productsAll/fetchAll',
  async () => {
    const [phonesRes, tabletsRes, accessoriesRes] = await Promise.all([
      fetch('/api/phones.json'),
      fetch('/api/tablets.json'),
      fetch('/api/accessories.json'),
    ]);

    const [phones, tablets, accessories] = await Promise.all([
      phonesRes.json(),
      tabletsRes.json(),
      accessoriesRes.json(),
    ]);

    return [
      ...phones.map((p: any) => ({ ...p, category: 'phones' })),
      ...tablets.map((t: any) => ({ ...t, category: 'tablets' })),
      ...accessories.map((a: any) => ({ ...a, category: 'accessories' })),
    ];
  },
);

const productsSlice = createSlice({
  name: 'productsAll',
  initialState,
  reducers: {
    setCurrentItem: (state, action: PayloadAction<Product | null>) => {
      state.currentItem = action.payload;
    },
  },
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

export const { setCurrentItem } = productsSlice.actions;
export default productsSlice.reducer;

//
// ✅ Typed selectors (assuming RootState is your Redux state)
//

export const selectAllProducts = (state: RootState): Product[] =>
  state.productsAll.items;

export const selectCurrentItem = (state: RootState): Product | null =>
  state.productsAll.currentItem;

export const selectProductsByCategory =
  (category: ProductCategory) =>
  (state: RootState): Product[] =>
    state.productsAll.items.filter(item => item.category === category);

export const selectProductById =
  (itemId: string) =>
  (state: RootState): Product | undefined =>
    state.productsAll.items.find(product => product.id === itemId);
