/* eslint-disable no-param-reassign */

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ProductCatalogItem } from '../../types/ProductCatalogItem';

type ProductId = number;

type NewType = ProductCatalogItem;

export type Favorites = Record<ProductId, NewType>;

const initialState: Favorites = {};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggle: (state, { payload }: PayloadAction<ProductCatalogItem>) => {
      const productId = payload.id;

      if (state[productId]) {
        delete state[productId];
      } else {
        state[productId] = payload;
      }
    },
  },
});

export default favoritesSlice.reducer;

export const { actions } = favoritesSlice;
