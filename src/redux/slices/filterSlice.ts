// redux/slices/filtersSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const sortTypes = [
  { name: 'Price Ascending', sortProperty: 'priceAsc' },
  { name: 'Price Descending', sortProperty: 'priceDesc' },
  { name: 'Newest', sortProperty: 'new' },
  { name: 'Alphabetical', sortProperty: 'ABC' },
];

interface FiltersState {
  sortOption: string;
  itemsPerPage: number;
  currentPage: number;
}

const initialState: FiltersState = {
  sortOption: 'priceAsc',
  itemsPerPage: 8,
  currentPage: 1,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSortOption(state, action: PayloadAction<string>) {
      state.sortOption = action.payload;
    },
    setItemsPerPage(state, action: PayloadAction<number>) {
      state.itemsPerPage = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
});

export const { setSortOption, setItemsPerPage, setCurrentPage } =
  filtersSlice.actions;
export default filtersSlice.reducer;
