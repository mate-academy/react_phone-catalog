import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { Product } from '../types/Product';
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from '../helpers/handleLocalStorage';
import { localStorageKey } from '../enums/localStorageKey';
import { RootState } from '../store';

type CartItem = Product & { quantity: number };

type CartState = {
  cartItems: CartItem[];
  loading: boolean;
  error: boolean;
};

const initialState: CartState = {
  cartItems: [],
  loading: false,
  error: false,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Product>) => {
      const existingItem = state.cartItems.find(
        item => item.itemId === action.payload.itemId,
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }

      saveToLocalStorage(localStorageKey.cart, state.cartItems);
    },

    increase: (state, action: PayloadAction<Product>) => {
      const item = state.cartItems.find(
        i => i.itemId === action.payload.itemId,
      );
      if (item) {
        item.quantity += 1;
        saveToLocalStorage(localStorageKey.cart, state.cartItems);
      }
    },

    decrease: (state, action: PayloadAction<Product>) => {
      const item = state.cartItems.find(
        i => i.itemId === action.payload.itemId,
      );
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        saveToLocalStorage(localStorageKey.cart, state.cartItems);
      }
    },

    remove: (state, action: PayloadAction<Product>) => {
      state.cartItems = state.cartItems.filter(
        i => i.itemId !== action.payload.itemId,
      );
      saveToLocalStorage(localStorageKey.cart, state.cartItems);
    },

    clearCart: state => {
      state.cartItems = [];
      saveToLocalStorage(localStorageKey.cart, state.cartItems);
    },
  },

  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      state.loading = true;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.cartItems = action.payload;
      state.loading = false;
      state.error = false;
    });

    builder.addCase(init.rejected, state => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const { add, increase, decrease, remove, clearCart } = cartSlice.actions;

export default cartSlice.reducer;

export const init = createAsyncThunk<CartItem[]>('cart/init', async () => {
  return loadFromLocalStorage<CartItem[]>(localStorageKey.cart);
});

export const selectCartItems = (state: RootState) => state.cart.cartItems;

export const selectTotalItems = createSelector([selectCartItems], cartItems =>
  cartItems.reduce((total, item) => total + item.quantity, 0),
);

export const selectTotalPrice = createSelector([selectCartItems], cartItems =>
  cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
);
