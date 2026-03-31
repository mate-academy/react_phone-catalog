import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Phone, Tablet, Accessory } from '../../../public/types';

// Об'єднаний тип для всіх продуктів
export type AnyProduct = Phone | Tablet | Accessory;

export interface ProductsState {
  items: AnyProduct[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
};

// Асинхронний екшн для завантаження даних
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const responses = await Promise.all([
        fetch('api/phones.json'),
        fetch('api/tablets.json'),
        fetch('api/accessories.json'),
      ]);

      const results = await Promise.all(
        responses.map(res => {
          if (!res.ok) {
            throw new Error(`Failed to fetch: ${res.url}`);
          }

          return res.json();
        }),
      );

      // Об'єднуємо всі масиви в один
      return results.flat() as AnyProduct[];
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<AnyProduct[]>) => {
          state.loading = false;
          state.items = action.payload;
        },
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default productsSlice.reducer;
