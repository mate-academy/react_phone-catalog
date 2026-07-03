//#region imports
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadFromStorage } from '../../modules/shared/services/localStorage';
import { CartItem } from '../../modules/shared/types/CartItem';
import { Product } from '../../modules/shared/types/Product';
//#endregion

const initialState = loadFromStorage<CartItem[]>('cart') ?? [];

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const isAdded = state.some(item => item.id === product.itemId);

      if (isAdded) {
        return;
      }

      state.push({
        id: product.itemId,
        product,
        quantity: 1,
      });
    },
    remove: (state, action: PayloadAction<string>) => {
      return state.filter(item => item.id !== action.payload);
    },
    clear: () => [],
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const cartItem = state.find(item => item.id === action.payload);

      if (cartItem && cartItem.quantity > 1) {
        cartItem.quantity--;
      }
    },
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const cartItem = state.find(item => item.id === action.payload);

      if (cartItem) {
        cartItem.quantity++;
      }
    },
  },
});

export const { add, remove, clear, decreaseQuantity, increaseQuantity } =
  cartSlice.actions;
