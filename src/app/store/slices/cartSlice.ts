import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartProduct } from "../../../modules/shared/types/Product";
import { getDataFromLS } from "../../../modules/shared/utils/getDataFromLS";

type CartState = {
  items: CartProduct[];
  totalPrice: number;
};

const initialState: CartState = {
  items: getDataFromLS('cart').items,
  totalPrice: getDataFromLS('cart').totalPrice,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartProduct>) => {
      const findItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (findItem) {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
        state.totalPrice = state.items.reduce((sum, item) => {
          return item.price * item.quantity + sum;
        }, 0);
      } else {
        state.items.push(action.payload);
        state.totalPrice = state.items.reduce((sum, item) => {
          return item.price * item.quantity + sum;
        }, 0);
      };

      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    incrQuantity: (state, action: PayloadAction<number>) => {
      const findItem = state.items.find((item) => item.id === action.payload);

      if (findItem) {
        findItem.quantity++;
      }

      state.totalPrice = state.items.reduce((sum, item) => {
        return item.price * item.quantity + sum;
      }, 0);

      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    decrQuantity: (state, action: PayloadAction<number>) => {
      const findItem = state.items.find((item) => item.id === action.payload);

      if (findItem) {
        findItem.quantity--;
      }

      state.totalPrice = state.items.reduce((sum, item) => {
        return item.price * item.quantity + sum;
      }, 0);

      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];

      localStorage.setItem('cart', JSON.stringify(state.items));
    },
  },
});

export const { addToCart, removeItem, incrQuantity, decrQuantity, clearCart} = cartSlice.actions;

export default cartSlice.reducer;
