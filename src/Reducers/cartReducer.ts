import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Products } from '../type/Products';

const initialState: Products[] = [];

const cartsSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    deleteCart: (state, action: PayloadAction<string>) => {
      return state.filter((phone: Products) => phone.itemId !== action.payload);
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
    addCart: (state, action: PayloadAction<Products>) => {
      return [...state, { ...action.payload, count: 1 }];
    },
  },
});

export const {
  deleteCart,
  addCart,
  incrementProductCount,
  discernmentProductCount,
} = cartsSlice.actions;
export default cartsSlice.reducer;
