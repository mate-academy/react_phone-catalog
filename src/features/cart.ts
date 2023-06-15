import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Item } from '../types/Item';

const parsedValue = localStorage.getItem('cartItems');
const initialState: Item[] = (parsedValue) ? JSON.parse(parsedValue) : [];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add: (cartItems, action: PayloadAction<Item>) => {
      cartItems.push(action.payload);
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    },
    remove: (cartItems, action: PayloadAction<string>) => {
      const newItems = cartItems.filter(({ id }) => id !== action.payload);

      localStorage.setItem('cartItems', JSON.stringify(newItems));

      return newItems;
    },
    increase: (cartItems, action: PayloadAction<string>) => {
      const newItems = cartItems.map(item => {
        if (item.id === action.payload) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }

        return item;
      });

      localStorage.setItem('cartItems', JSON.stringify(newItems));

      return newItems;
    },
    decrease: (cartItems, action: PayloadAction<string>) => {
      const newItems = cartItems.map(item => {
        if (item.id === action.payload) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }

        return item;
      });

      localStorage.setItem('cartItems', JSON.stringify(newItems));

      return newItems;
    },
  },
});

export default cartSlice.reducer;
export const {
  add,
  remove,
  increase,
  decrease,
} = cartSlice.actions;
