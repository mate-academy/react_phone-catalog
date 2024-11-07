/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Phone } from '../types/phones';

export interface SetAllProductsInterface {
  items: Phone[];
  error: boolean;
  loaded: boolean;
}

const initialState: SetAllProductsInterface = {
  items: [],
  error: false,
  loaded: false,
};

export const getAllProductsAsync = createAsyncThunk(
  'products/getAllProducts',
  async () => {
    // Завантажуємо всі три файли одночасно
    const [phonesResponse, tabletsResponse, accessoriesResponse] =
      await Promise.all([
        fetch('../api/phones.json'),
        fetch('../api/tablets.json'),
        fetch('../api/accessories.json'),
      ]);

    // Парсимо JSON з кожного файлу
    const [phones, tablets, accessories] = await Promise.all([
      phonesResponse.json(),
      tabletsResponse.json(),
      accessoriesResponse.json(),
    ]);

    // Об'єднуємо всі дані в один масив
    return [...phones, ...tablets, ...accessories];
  },
);

export const getAllProductsSlice = createSlice({
  name: 'allProducts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllProductsAsync.pending, state => {
        state.loaded = false;
      })
      .addCase(getAllProductsAsync.fulfilled, (state, action) => {
        state.loaded = true;
        state.items = action.payload;
      })
      .addCase(getAllProductsAsync.rejected, state => {
        state.error = true;
        state.loaded = true;
      });
  },
});

// Correct export: only export the reducer, not the entire slice
export default getAllProductsSlice.reducer;
