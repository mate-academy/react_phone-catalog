import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadFromStorage } from '../../modules/shared/services/localStorage';
import { Product } from '../../modules/shared/types/Product';

const initialState = loadFromStorage<Product[]>('favorites') ?? [];

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const alreadyAdded = state.some(item => item.itemId === product.itemId);

      if (alreadyAdded) {
        return;
      }

      state.push(product);
    },
    remove: (state, action: PayloadAction<string>) => {
      return state.filter(item => item.itemId !== action.payload);
    },
  },
});

export const { add, remove } = favoritesSlice.actions;
