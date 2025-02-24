import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types';

export interface CartState {
  goods: Product[];
}

const initialState: CartState = {
  goods: [],
};

export const cartSlice = createSlice({
  name: 'goods',
  initialState,
  reducers: {
    addGood(state, { payload }: PayloadAction<Product>) {
      state.goods.push(payload);
    },
    removeGood(state, { payload }: PayloadAction<Product>) {
      return {
        ...state,
        goods: state.goods.filter(good => good !== payload),
      };
    },
    clearGoods(state) {
      return {
        ...state,
        goods: [],
      };
    },
  },
});

export const {} = cartSlice.actions;
export default cartSlice.reducer;
