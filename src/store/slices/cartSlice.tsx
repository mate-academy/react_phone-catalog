import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { ProductData } from '../../modules/shared/types/ProductData';

export type CartItem = {
  item: ProductData;
  qty: number;
};

export type CartState = {
  items: CartItem[];
};

const initialState: CartState = { items: [] };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const item = action.payload;
      const exist = state.items.find(i => i.item.itemId === item.item.itemId);

      if (exist) {
        exist.qty += item.qty;
      } else {
        state.items.push(item);
      }
    },
    removeFromCart(state, action: PayloadAction<{ itemId: string }>) {
      return {
        ...state,
        items: state.items.filter(i => i.item.itemId !== action.payload.itemId),
      };
    },
    addQty(state, action: PayloadAction<{ itemId: string }>) {
      const it = state.items.find(i => i.item.itemId === action.payload.itemId);

      if (it) {
        it.qty += 1;
      }
    },
    takeQty(state, action: PayloadAction<{ itemId: string }>) {
      const it = state.items.find(i => i.item.itemId === action.payload.itemId);

      if (it) {
        it.qty = Math.max(1, it.qty - 1);
      }
    },
    clearCart(): CartState {
      return { items: [] };
    },
    setCart(state, action: PayloadAction<CartState>) {
      return action.payload;
    },
  },
});

// eslint-disable-next-line max-len
export const { addToCart, removeFromCart, addQty, takeQty, clearCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;

export const selectCartItems = (s: RootState) => (s.cart as CartState).items;

export const selectItemIds = createSelector(
  [selectCartItems],
  items => items.map(i => i.item.itemId), // memoized array
);

export const selectCartTotals = createSelector([selectCartItems], items => {
  const totalQty = items.reduce((a: number, i: CartItem) => a + i.qty, 0);
  // eslint-disable-next-line max-len
  const subtotal = items.reduce((a: number, i: CartItem) => a + i.qty * i.item.price, 0);

  return { totalQty, subtotal };
});
