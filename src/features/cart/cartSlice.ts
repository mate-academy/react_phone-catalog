import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CartItem } from './types';
import { getCartFromLS } from '../../utils/getCartDataFromLS';
import { Products } from '../../types/Products';

type CartState = {
  cartItems: CartItem[];
};

const initialCartItems = getCartFromLS();

const initialState: CartState = {
  cartItems: initialCartItems,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Products>) => {
      const newItem: CartItem = {
        itemInCart: action.payload,
        itemCount: 1,
      };

      state.cartItems.push(newItem);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      // eslint-disable-next-line no-param-reassign
      state.cartItems = state.cartItems.filter(
        item => item.itemInCart.itemId !== action.payload,
      );
    },
    decrementItemCount: (state, action: PayloadAction<string>) => {
      const findItem = state.cartItems.find(
        item => item.itemInCart.itemId === action.payload,
      );

      if (findItem && findItem.itemCount > 1) {
        findItem.itemCount -= 1;
      }
    },
    incrementItemCount: (state, action: PayloadAction<string>) => {
      const findItem = state.cartItems.find(
        item => item.itemInCart.itemId === action.payload,
      );

      if (findItem) {
        findItem.itemCount += 1;
      }
    },
  },
});

export default cartSlice.reducer;
export const { actions } = cartSlice;
