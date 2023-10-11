import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Product } from '@/types/Product';

export type CartItemType = {
  id: string;
  quantity: number;
  product: Product;
};

type CartState = CartItemType[];

const initialState: CartState = [];

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add: (cart, action: PayloadAction<Product>) => {
      cart.push({
        id: action.payload.id,
        quantity: 1,
        product: action.payload,
      });
    },
    increaseQuantity: (cart, action: PayloadAction<string>) => {
      return cart.map(item => {
        if (item.id !== action.payload) {
          return item;
        }

        return {
          ...item,
          quantity: item.quantity + 1,
        };
      });
    },
    decreaseQuantity: (cart, action: PayloadAction<string>) => {
      return cart.map(item => {
        if (item.id !== action.payload) {
          return item;
        }

        return {
          ...item,
          quantity: item.quantity - 1,
        };
      });
    },
    remove: (cart, action: PayloadAction<string>) => {
      return cart.filter(item => item.id !== action.payload);
    },
  },
});

export const {
  add,
  remove,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
