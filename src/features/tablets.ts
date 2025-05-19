// phonesSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
export interface Tablet {
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

interface TabletsState {
  items: Tablet[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: TabletsState = {
  items: [],
  status: 'idle',
};
export const fetchTablets = createAsyncThunk('tablets/fetchTablets', async () => {
  const response = await fetch('/api/tablets.json');
  const data = await response.json();

  return data;
});
export const tabletsSlice = createSlice({
  name: 'tablets',
  initialState: {
    items: [],
    status: 'idle',
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTablets.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchTablets.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchTablets.rejected, state => {
        state.status = 'failed';
      });
  },
});

export default tabletsSlice.reducer;
export const selectAllTablets = (state: any) => state.tablets.items;
