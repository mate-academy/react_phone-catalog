import { PayloadAction, createSlice } from '@reduxjs/toolkit';
// import { Phones } from '../../types/Phones';
// import { calcTotalCartPrice } from '../../utils/calcTotalCartPrice';
import { CartItem } from './types';
import { getCartFromLS } from '../../utils/getCartDataFromLS';
import { Products } from '../../types/Products';

type CartState = {
  cartItems: CartItem[],
  // totalPrice: number,
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
      // state.cartItems = [...state.cartItems, action.payload];
      // action.payload.itemCount = 1;
      // action.payload.itemTotalPrice
      //   = action.payload.itemCount * +action.payload.cartItem.price;
      const newItem: CartItem = {
        itemInCart: action.payload,
        itemCount: 1,
        // itemTotalPrice: action.payload.price,
      };

      state.cartItems.push(newItem);
      // state.totalPrice = calcTotalCartPrice(state.cartItems);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(item => item.itemInCart.itemId
        !== action.payload);
      // state.totalPrice = calcTotalCartPrice(state.cartItems);
    },
    decrementItemCount: (state, action: PayloadAction<string>) => {
      const findItem = state.cartItems
        .find((item) => item.itemInCart.itemId
          === action.payload);

      if (findItem && findItem.itemCount > 1) {
        findItem.itemCount -= 1;
        // findItem.itemTotalPrice
        // = findItem.itemCount * +findItem.itemInCart.price;
        // state.totalPrice = calcTotalCartPrice(state.cartItems);
      }
    },
    incrementItemCount: (state, action: PayloadAction<string>) => {
      const findItem = state.cartItems
        .find((item) => item.itemInCart.itemId
          === action.payload);

      if (findItem) {
        findItem.itemCount += 1;
        // findItem.itemTotalPrice = findItem.itemCount * +findItem.cartItem.price;
        // state.totalPrice = calcTotalCartPrice(state.cartItems);
      }

      // const findItem = state.cartItems
      // .find((item) => item.cartItem.itemId
      // === action.payload.cartItem.itemId);

      // increment: (state, action: PayloadAction<string>) => {
      //   state.cartItems.map((item) => {
      //     if (item.cartItem.itemId === action.payload) {
      //       return {
      //         ...item,
      //         productCount: item.productCount + 1,
      //       };
      //     }

      //     return item;
      //   });
      // },
      // decrement: (state) => {
      //   state.productCount -= 1;
      // },
    },
  },
});

export default cartSlice.reducer;
export const { actions } = cartSlice;
