import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TabAccessPhone } from '../types/tabAccessPhones';

export type CartInfo = {
  cartProducts: TabAccessPhone[];
};

const initialState: CartInfo = {
  cartProducts: [],
};

const CartSlice = createSlice({
  name: 'cartProducts',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<TabAccessPhone>) => {
      const currentState = state;

      currentState.cartProducts.push(action.payload);
    },

    removeProduct: (state, action: PayloadAction<TabAccessPhone>) => {
      const currentState = state;

      currentState.cartProducts = currentState.cartProducts.filter(
        prod => prod.id !== action.payload.id,
      );
    },

    // removeLastProduct: (state, action: PayloadAction<TabAccessPhone>) => {
    //   const currentState = state;

    //   const findProd = currentState.cartProducts
    //     .map(p => ({ ...p }))
    //     .findIndex(item => item.id === action.payload.id);

    //   currentState.cartProducts = currentState.cartProducts.filter(
    //     (_, index) => index !== findProd,
    //   );
    // },
  },
});

export const { actions } = CartSlice;
export default CartSlice.reducer;
