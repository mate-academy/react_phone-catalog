import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, CartProduct } from '@/types/Product';

const loadFromLocalStorage = (): Product[] => {
  try {
    const data = localStorage.getItem('cart');
    const parsed = data ? JSON.parse(data) : [];
    return Array.isArray(parsed)
      ? parsed
          .filter((item): item is Product => item && item.id)
          .map(item => ({
            ...item,
            quantity: typeof item.quantity === 'number' ? item.quantity : 1,
          }))
      : [];
  } catch {
    return [];
  }
};

const saveToLocalStorage = (items: Product[]) => {
  try {
    localStorage.setItem('cart', JSON.stringify(items));
  } catch {}
};

export interface CartState {
  items: CartProduct[];
}

const initialState: CartState = {
  items: loadFromLocalStorage(),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleCart: (state, action: PayloadAction<Product>) => {
      const exists = state.items.find(item => item.id === action.payload.id);
      if (exists) {
        state.items = state.items.filter(item => item.id !== action.payload.id);
      } else {
        const newItem: CartProduct = { ...action.payload, quantity: 1 };
        state.items.push(newItem);
      }
      saveToLocalStorage(state.items);
    },
    increaseQuantity: (state, action) => {
      const item = state.items.find(p => p.id === action.payload);
      if (item && item.quantity < 30) item.quantity += 1;
      saveToLocalStorage(state.items);
    },
    decreaseQuantity: (state, action) => {
      const item = state.items.find(p => p.id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
      saveToLocalStorage(state.items);
    },
    clearCart: state => {
      state.items = [];
      saveToLocalStorage(state.items);
    },
  },
});

export const { toggleCart, increaseQuantity, decreaseQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
