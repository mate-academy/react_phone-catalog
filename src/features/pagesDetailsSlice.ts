/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PagesDetails } from './../types/PageDetails';
import { ItemsQuantity } from './../types/PageDetails';

const initialState: PagesDetails = {
  title: '',
  models: 0,
  itemsQuantity: {},
  verticalPaginationHeight: 0,
  startShowFrom: 0,
};

const pagesDetailsSlice = createSlice({
  name: 'pagesDetails',
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setModels: (state, action: PayloadAction<number>) => {
      state.models = action.payload;
    },
    setItemsQuantity: (state, action: PayloadAction<ItemsQuantity>) => {
      state.itemsQuantity = action.payload;
    },
    cleanItemsQuantity: state => {
      state.itemsQuantity = {};
    },
    addToItemsQuantity: (state, action: PayloadAction<number>) => {
      const key = action.payload;

      state.itemsQuantity[key] = 1;
    },
    deleteFromItemsQuantity: (state, action: PayloadAction<number>) => {
      const key = action.payload;

      delete state.itemsQuantity[key];
    },
    plusItemsQuantity: (state, action: PayloadAction<number>) => {
      const key = action.payload;

      if (state.itemsQuantity[key] !== undefined) {
        state.itemsQuantity[key] = state.itemsQuantity[key] + 1;
      } else {
        return;
      }
    },
    minusItemsQuantity: (state, action: PayloadAction<number>) => {
      const key = action.payload;

      if (state.itemsQuantity[key] !== undefined) {
        state.itemsQuantity[key] = state.itemsQuantity[key] - 1;
      } else {
        return;
      }
    },
    setVerticalPaginationHeight: (state, action: PayloadAction<number>) => {
      state.verticalPaginationHeight = action.payload;
    },
    setStartShowFrom: (state, action: PayloadAction<number>) => {
      state.startShowFrom = action.payload;
    },
  },
});

export default pagesDetailsSlice.reducer;
export const {
  setTitle,
  setModels,
  setItemsQuantity,
  plusItemsQuantity,
  minusItemsQuantity,
  cleanItemsQuantity,
  addToItemsQuantity,
  deleteFromItemsQuantity,
  setVerticalPaginationHeight,
  setStartShowFrom,
} = pagesDetailsSlice.actions;
