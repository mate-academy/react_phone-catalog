// phonesSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
export interface Phone {
  id: string;
  category: string;
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

interface PhonesState {
  items: Phone[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: PhonesState = {
  items: [],
  status: 'idle',
};

export const fetchPhones = createAsyncThunk('phones/fetchPhones', async () => {
  const response = await fetch('/api/phones.json');
  const data = await response.json();

  return data;
});
export const phonesSlice = createSlice({
  name: 'phones',
  initialState: {
    items: [],
    status: 'idle',
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPhones.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchPhones.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchPhones.rejected, state => {
        state.status = 'failed';
      });
  },
});

export default phonesSlice.reducer;
export const selectAllPhones = (state: any) => state.phones.items;
