/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/Product';
import { RootState } from '../store';
import { init } from '../products/productsSlice';

interface CartItem {
  id: string;
  quantity: number;
}

export interface State {
  cart: CartItem[];
}

function getInitialCart(): CartItem[] {
  try {
    const stored = localStorage.getItem('cart');

    if (stored) {
      const result = JSON.parse(stored);

      if (Array.isArray(result)) {
        return result
          .filter(item => item.id && item.quantity)
          .map(item => ({
            id: item.id,
            quantity: item.quantity,
          }));
      }
    }
  } catch {
    localStorage.setItem('cart', JSON.stringify([]));

    return [];
  }

  return [];
}

const initialState: State = {
  cart: getInitialCart(),
};

function updateLocalStorage(cartItems: CartItem[]) {
  localStorage.setItem('cart', JSON.stringify(cartItems));
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleItem: (state, action: PayloadAction<string>) => {
      const newItem: CartItem = { id: action.payload, quantity: 1 };

      const itemExists = state.cart.some(item => item.id === newItem.id);

      if (itemExists) {
        state.cart = state.cart.filter(item => item.id !== newItem.id);
      } else {
        state.cart.push(newItem);
      }

      updateLocalStorage(state.cart);
    },
    deleteItem: (state, action: PayloadAction<string>) => {
      const deleteId = action.payload;

      const itemExists = state.cart.some(item => item.id === deleteId);

      if (itemExists) {
        state.cart = state.cart.filter(item => item.id !== deleteId);
      }

      updateLocalStorage(state.cart);
    },
    updateQuantity: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload;

      const itemExists = state.cart.some(item => item.id === newItem.id);

      if (itemExists) {
        state.cart = state.cart.map(item => {
          if (item.id === newItem.id) {
            return { id: item.id, quantity: newItem.quantity };
          }

          return item;
        });
      }

      updateLocalStorage(state.cart);
    },
    clear: state => {
      state.cart = [];

      updateLocalStorage(state.cart);
    },
  },
  extraReducers: builder => {
    builder.addCase(
      init.fulfilled,
      (state, action: PayloadAction<Product[]>) => {
        const products = action.payload;
        const validProductIds = new Set(
          products.map(product => product.itemId),
        );

        const updatedCart = state.cart.filter(item =>
          validProductIds.has(item.id),
        );

        state.cart = updatedCart;
        updateLocalStorage(updatedCart);
      },
    );
  },
});

export default cartSlice.reducer;
export const { actions: cartActions } = cartSlice;

export const selectCartCount = (state: RootState) => {
  return state.cart.cart.reduce((acc, item) => item.quantity + acc, 0);
};

let isStorageListenerAdded = false;

const handleStorageChange = (event: StorageEvent) => {
  if (event.key === 'cart') {
    window.location.reload();
  }
};

if (!isStorageListenerAdded) {
  window.addEventListener('storage', handleStorageChange);
  isStorageListenerAdded = true;
}
