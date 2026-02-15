/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum SortBy {
  Newest = 'Newest',
  Alphabetically = 'Alphabetically',
  Cheapest = 'Cheapest',
}

export type ItemsPerPageType = 4 | 8 | 16 | 'All';

type CatalogState = {
  sortBy: SortBy;
  itemsPerPage: ItemsPerPageType;
};

const initialState: CatalogState = {
  sortBy: SortBy.Newest,
  itemsPerPage: 16,
};

export const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    setSortBy: (state, action: PayloadAction<SortBy>) => {
      state.sortBy = action.payload;
    },
    setItemsPerPage: (state, action: PayloadAction<ItemsPerPageType>) => {
      state.itemsPerPage = action.payload;
    },
  },
});

export const { setSortBy, setItemsPerPage } = catalogSlice.actions;
