import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TabAccessPhone } from '../types/tabAccessPhones';

export type CartInfo = {
  cartProducts: TabAccessPhone [];
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

    removeLastProduct: (state, action: PayloadAction<TabAccessPhone>) => {
      const currentState = state;

      const findProd = currentState.cartProducts.findIndex((pr) => pr.id === action.payload.id);
    
      const { cartProducts } = state;

      console.log(cartProducts)
      // currentState.cartProducts = currentState.cartProducts.splice(findProd, 1);
    }
  },
});

export const { actions } = CartSlice;
export default CartSlice.reducer;
