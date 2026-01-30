/* eslint-disable no-param-reassign */

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ProductCatalogItem } from '../../types/ProductCatalogItem';

export interface CartItem {
  id: number;
  product: ProductCatalogItem;
  quantity: number;
}

const initialState: Record<number, CartItem> = {};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    add: (state, { payload }: PayloadAction<ProductCatalogItem>) => {
      const id = payload.id;
      const existingItem = state[id];

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state[id] = { id, product: payload, quantity: 1 };
      }
    },

    remove: (state, { payload }: PayloadAction<ProductCatalogItem>) => {
      const id = payload.id;
      const existingItem = state[id];

      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      } else {
        delete state[id];
      }
    },

    clear: () => {},
  },
});

export default itemsSlice.reducer;

export const { actions } = itemsSlice;
