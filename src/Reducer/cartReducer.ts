import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Phone } from '../type/Phone';

const initialState: Phone[] = [];

const favoritesSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    deleteCart: (state, action: PayloadAction<string>) => {
      return state.filter((phone: Phone) => phone.itemId !== action.payload);
    },
    incrementProductCount: (state, action: PayloadAction<string>) => {
      const correctProduct = state
        .find((product) => product.itemId === action.payload);

      if (correctProduct?.count) {
        correctProduct.count += 1;
      }
    },
    discernmentProductCount: (state, action: PayloadAction<string>) => {
      const toUpdate = state
        .find((product) => product.itemId === action.payload);

      if (toUpdate?.count) {
        toUpdate.count -= 1;
      }
    },
    addCart: (state, action: PayloadAction<Phone>) => {
      return [...state, { ...action.payload, count: 1 }];
    },
  },
});

export const {
  deleteCart,
  addCart,
  incrementProductCount,
  discernmentProductCount,
} = favoritesSlice.actions;
export default favoritesSlice.reducer;
