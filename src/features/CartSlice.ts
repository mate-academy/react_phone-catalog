import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FullProduct } from '../types/product';
import { Product } from '../types/products';
import { saveToLocalStorage } from '../components/utils/saveToLocalStorege';
import { loadItemsLocalStorage } from '../components/utils/loadItemsLocalStorage';

type CartItem = Product & { quantity: number };

interface CartState {
  cartItems: CartItem[];
  loading: boolean;
}

const initialState: CartState = {
  cartItems: loadItemsLocalStorage('cart'),
  loading: false,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<FullProduct>) => {
      const findItem = state.cartItems.find(
        item => item.id === action.payload.id,
      );

      if (!findItem) {
        state.cartItems.push({ ...action.payload, quantity: 1 });
        saveToLocalStorage(state.cartItems);
      } else {
        findItem.quantity += 1;
      }
    },
    clearOneItem: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(
        item => item.id !== action.payload,
      );
      saveToLocalStorage(state.cartItems);
    },
    incrementQuantity: (state, action: PayloadAction<string>) => {
      const findItem = state.cartItems.find(item => item.id === action.payload);

      if (findItem) {
        findItem.quantity += 1;
      }

      saveToLocalStorage(state.cartItems);
    },
    decrementQuantity: (state, action: PayloadAction<string>) => {
      const findItem = state.cartItems.find(item => item.id === action.payload);

      if (findItem && findItem.quantity > 1) {
        findItem.quantity -= 1;
      }

      saveToLocalStorage(state.cartItems);
    },
    clearAllCartItem: state => {
      state.cartItems = [];
      saveToLocalStorage(state.cartItems);
    },
  },
});

export const {
  addToCart,
  clearAllCartItem,
  clearOneItem,
  decrementQuantity,
  incrementQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
