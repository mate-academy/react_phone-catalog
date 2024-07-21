import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const sortTypes = [
  { name: 'Newest', sortProperty: 'new' },
  { name: 'PriceAsc', sortProperty: 'priceAsc' },
  { name: 'PriceDesc', sortProperty: 'priceDesc' },
  { name: 'ABC', sortProperty: 'ABC' },
];

interface FilterState {
  sortOption: string;
  itemsPerPage: number;
  currentPage: number;
}

const initialState: FilterState = {
  sortOption: sortTypes[0].sortProperty,
  itemsPerPage: 4,
  currentPage: 1,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSortOption(state, action: PayloadAction<string>) {
      state.sortOption = action.payload;
      state.currentPage = 1;
    },
    setItemsPerPage(state, action: PayloadAction<number>) {
      state.itemsPerPage = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    resetFilters(state) {
      state.sortOption = initialState.sortOption;
      state.itemsPerPage = initialState.itemsPerPage;
      state.currentPage = initialState.currentPage;
    },
  },
});

export const { setSortOption, setItemsPerPage, setCurrentPage, resetFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
