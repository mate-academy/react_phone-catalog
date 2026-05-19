import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

const loadCartFromStorage = (): CartItem[] => {
  try {
    const storedCart = localStorage.getItem('cart-storage');

    if (storedCart) {
      const parsed = JSON.parse(storedCart);

      return parsed.state?.items || [];
    }

    return [];
  } catch (error) {
    return [];
  }
};

const initialState: CartState = {
  items: loadCartFromStorage(),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {
      const existingItem = state.items.find(
        item => item.id === action.payload.id,
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }

      localStorage.setItem(
        'cart-storage',
        JSON.stringify({ state: { items: state.items } }),
      );
    },

    removeItem: (state, action: PayloadAction<string>) => {
      const items = state.items.filter(item => item.id !== action.payload);

      localStorage.setItem(
        'cart-storage',
        JSON.stringify({ state: { items } }),
      );

      return { ...state, items };
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>,
    ) => {
      const { id, quantity } = action.payload;

      let items;

      if (quantity <= 0) {
        items = state.items.filter(item => item.id !== id);
      } else {
        items = state.items.map(item =>
          item.id === id ? { ...item, quantity } : item,
        );
      }

      localStorage.setItem(
        'cart-storage',
        JSON.stringify({ state: { items } }),
      );

      return { ...state, items };
    },

    clearCart: state => {
      const items: CartItem[] = [];

      localStorage.setItem(
        'cart-storage',
        JSON.stringify({ state: { items } }),
      );

      return { ...state, items };
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } =
  cartSlice.actions;

export const selectCartItems = (state: { cart: CartState }) => state.cart.items;

export const selectTotalItems = (state: { cart: CartState }) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

export const selectTotalPrice = (state: { cart: CartState }) =>
  state.cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

export const selectIsInCart = (id: string) => (state: { cart: CartState }) =>
  state.cart.items.some(item => item.id === id);

export default cartSlice.reducer;
