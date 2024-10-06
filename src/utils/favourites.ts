import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import 'immer';
import { Product } from '../types/Product';

const data = localStorage.getItem('favourites');

const initialState: Product[] = data === null ? [] : JSON.parse(data);

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    addItem: (items, action: PayloadAction<Product>) => {
      items.push(action.payload);
    },
    takeItem: (items, action: PayloadAction<Product>) => {
      return items.filter(e => e.id !== action.payload.id);
    },
  },
});

export const { actions } = favouritesSlice;
export default favouritesSlice.reducer;
