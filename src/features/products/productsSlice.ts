import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Phone, Tablet, Accessory } from '../../../public/types';

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

      return results.flat() as AnyProduct[];
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('An unknown error occurred');
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
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<AnyProduct[]>) => {
          return {
            ...state,
            loading: false,
            items: action.payload,
          };
        },
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: (action.payload as string) || 'Something went wrong',
        };
      });
  },
});

export default productsSlice.reducer;
