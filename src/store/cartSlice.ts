import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ICart,
  IChangQuantityPayload,
  IInitialStateCart
} from "../interfaces/Cart.interface";
import {
  loadCartFromLocalStorage,
  saveCartToLocalStorage
} from "../helpers/CartLocalStorage";

const initialState: IInitialStateCart = loadCartFromLocalStorage();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<ICart>) {
      const existingItem =
        state.items.find(item => item.id === action.payload.id);

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }

      state.totalPrice += action.payload.price * action.payload.quantity;
      saveCartToLocalStorage(state.items, state.totalPrice);
    },

    deleteWithCart(state, action: PayloadAction<ICart>) {
      const existingItem =
        state.items.find(item => item.id === action.payload.id);

      if (existingItem) {
        state.items = state.items.filter(item => item.id !== action.payload.id);
        state.totalPrice -= existingItem.price * existingItem.quantity;
      }

      saveCartToLocalStorage(state.items, state.totalPrice);
    },

    changeQuantity(state, action: PayloadAction<IChangQuantityPayload>) {
      const existingItem =
        state.items.find(item => item.id === action.payload.id);

      if (existingItem) {
        if (action.payload.type === 'plus') {
          existingItem.quantity++;
        }

        if (action.payload.type === 'minus' && existingItem.quantity > 1) {
          existingItem.quantity--;
        }

        state.totalPrice = state.items
          .reduce((total, item) => total + item.price * item.quantity, 0);
      }

      saveCartToLocalStorage(state.items, state.totalPrice);
    }
  }
});

export const { addToCart, deleteWithCart, changeQuantity } = cartSlice.actions;
export default cartSlice.reducer;
