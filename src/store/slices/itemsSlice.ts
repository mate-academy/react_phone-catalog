/* eslint-disable no-param-reassign */

import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { ProductCatalogItem } from '../../types/ProductCatalogItem';
import { RootState } from '..';

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

    decrease: (
      state,
      { payload: { id } }: PayloadAction<ProductCatalogItem>,
    ) => {
      const existingItem = state[id];

      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      } else {
        delete state[id];
      }
    },

    remove: (state, { payload: { id } }: PayloadAction<ProductCatalogItem>) => {
      delete state[id];
    },

    clear: () => ({}),
  },
});

const selectCartRecord = (state: RootState) => state.items;

export const selectCartItems = createSelector([selectCartRecord], itemsRecord =>
  Object.values(itemsRecord),
);

export const selectTotalCount = createSelector([selectCartItems], items =>
  items.reduce((sum, item) => sum + item.quantity, 0),
);

export const selectTotalPrice = createSelector([selectCartItems], items =>
  items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
);

export default itemsSlice.reducer;

export const { actions } = itemsSlice;
