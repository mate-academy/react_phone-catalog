import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartProduct } from '../types/CartProduct';

type CartState = {
  items: CartProduct[];
  totalPrice: number;
};

const savedCart = localStorage.getItem('cart');

const initialState: CartState = savedCart
  ? (JSON.parse(savedCart) as CartState)
  : { items: [], totalPrice: 0 };

export const cartProductsSlice = createSlice({
  name: 'cartProducts',
  initialState,
  reducers: {
    addProduct(state, { payload }: PayloadAction<CartProduct>) {
      state.items.push(payload);
      state.totalPrice += payload.product.priceDiscount;
    },
    removeProduct(state, { payload }: PayloadAction<{ id: string }>) {
      const item = state.items.find(i => i.id === payload.id);

      if (!item) {
        return;
      }

      state.items = state.items.filter(i => i !== item);
      state.totalPrice -= item.quantity * item.product.priceDiscount;
    },
    clearCart(state) {
      state.items = [];
      state.totalPrice = 0;
    },
    changeQuantity(
      state,
      { payload }: PayloadAction<{ id: string; delta: 1 | -1 }>,
    ) {
      const item = state.items.find(i => i.id === payload.id);

      if (!item) {
        return;
      }

      item.quantity += payload.delta;
      state.totalPrice += payload.delta * item.product.priceDiscount;

      if (item.quantity <= 0) {
        state.items = state.items.filter(i => i.id !== payload.id);
      }
    },
  },
});
