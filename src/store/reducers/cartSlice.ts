import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../models/product';
import { CartObject } from '../models/cart';

interface CartState {
  cart: CartObject[] | null,
}

const initialState: CartState = {
  cart: null,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const { id } = action.payload;

      if (state.cart === null) {
        state.cart = [{
          product: action.payload,
          quantity: 1,
          id: id,
        }];
      } else {
        const existingCartItem = state.cart.find(cartItem => cartItem.product.id === id);

        if (existingCartItem) {
          existingCartItem.quantity < 99 ?
            existingCartItem.quantity += 1 : undefined;
        } else {
          state.cart.push({
            product: action.payload,
            quantity: 1,
            id: id,
          });
        }
      }
    },
    incrementQuantity(state, action: PayloadAction<string>) {
      const id = action.payload;
      if (state.cart) {
        const product = state.cart.find((cartItem) => cartItem.id === id);

        if (product && product.quantity < 99) {
          product.quantity += 1;
        }
      }
    },
    decrementQuantity(state, action: PayloadAction<string>) {
      const id = action.payload;
      if (state.cart) {
        const product = state.cart.find((cartItem) => cartItem.id === id);
        if (product && product.quantity > 1) {
          product.quantity -= 1;
        }
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      const id = action.payload;

      if (state.cart) {
        const product = state.cart.find((cartItem) => cartItem.id === id);

        if (product) {
          const newState = state.cart.filter(item => item.id !== id);

          state.cart = [...newState];
        }
      }
    }
  },
});

export const { addToCart, incrementQuantity, decrementQuantity, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;

