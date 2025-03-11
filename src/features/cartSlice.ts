import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartProduct } from '../types/CartProduct';

export interface CartState {
  cartGoods: CartProduct[];
}

const initialState: CartState = {
  cartGoods: JSON.parse(localStorage.getItem('cartGoods') || '[]'),
};

export const cartSlice = createSlice({
  name: 'cartGoods',
  initialState,
  reducers: {
    addGood(state, { payload }: PayloadAction<CartProduct>) {
      state.cartGoods.push(payload);
      localStorage.setItem('cartGoods', JSON.stringify(state.cartGoods));
    },
    updateGood(state, { payload }: PayloadAction<CartProduct>) {
      const goodToUpdate = state.cartGoods.find(good => good.id === payload.id);

      if (goodToUpdate) {
        goodToUpdate.quantity = payload.quantity;
      }

      localStorage.setItem('cartGoods', JSON.stringify(state.cartGoods));
    },
    removeGood(state, { payload }: PayloadAction<CartProduct>) {
      // eslint-disable-next-line no-param-reassign
      state.cartGoods = state.cartGoods.filter(good => good.id !== payload.id);
      localStorage.setItem('cartGoods', JSON.stringify(state.cartGoods));
    },
    clearGoods(state) {
      // eslint-disable-next-line no-param-reassign
      state.cartGoods = [];
      localStorage.removeItem('cartGoods');
    },
  },
});

export const {} = cartSlice.actions;
export default cartSlice.reducer;
