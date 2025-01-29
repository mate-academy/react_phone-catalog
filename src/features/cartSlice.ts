import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UpdatedProduct } from '../types/UpdatedProduct';
import { Product } from '../types/Product';

type Cart = {
  cartProducts: UpdatedProduct[];
};

const initialState: Cart = {
  cartProducts: JSON.parse(localStorage.getItem('cart') || '[]'),
};

const syncCartWithLocalStorage = (items: UpdatedProduct[]) => {
  localStorage.setItem('cart', JSON.stringify(items));
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<Product>) => {
      const { id } = action.payload;

      const existingItem = state.cartProducts.find(item => item.id === id);

      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
      } else {
        state.cartProducts.push({ ...action.payload, quantity: 1 });
      }

      syncCartWithLocalStorage(state.cartProducts);
    },

    removeItemFromCart: (state, action: PayloadAction<number>) => {
      // eslint-disable-next-line no-param-reassign
      state.cartProducts = state.cartProducts.filter(
        item => item.id !== action.payload,
      );
      syncCartWithLocalStorage(state.cartProducts);
    },

    clearCart: state => {
      // eslint-disable-next-line no-param-reassign
      state.cartProducts = [];
      syncCartWithLocalStorage(state.cartProducts);
    },

    incrementItemQuantity: (state, action: PayloadAction<number>) => {
      const targetItem = state.cartProducts.find(
        item => item.id === action.payload,
      );

      if (targetItem) {
        targetItem.quantity += 1;
        syncCartWithLocalStorage(state.cartProducts);
      }
    },

    decrementItemQuantity: (state, action: PayloadAction<number>) => {
      const targetItem = state.cartProducts.find(
        item => item.id === action.payload,
      );

      if (targetItem) {
        if (targetItem.quantity > 1) {
          targetItem.quantity -= 1;
        } else {
          // eslint-disable-next-line no-param-reassign
          state.cartProducts = state.cartProducts.filter(
            item => item.id !== action.payload,
          );
        }

        syncCartWithLocalStorage(state.cartProducts);
      }
    },
  },
});

export default cartSlice.reducer;
export const {
  addItemToCart,
  removeItemFromCart,
  clearCart,
  incrementItemQuantity,
  decrementItemQuantity,
} = cartSlice.actions;
