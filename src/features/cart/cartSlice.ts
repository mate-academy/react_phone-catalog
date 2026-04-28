import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

const loadCart = (): CartItem[] => {
  try {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    return [];
  }
};

const initialState: CartState = {
  items: loadCart(),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);

      if (!existingItem) {
        state.items.push({ ...action.payload, quantity: 1 });
        localStorage.setItem('cart', JSON.stringify(state.items));
      }
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      localStorage.setItem('cart', JSON.stringify(state.items));
    },

    changeQuantity: (state, action: PayloadAction<{ id: string; amount: number }>) => {
      const { id, amount } = action.payload;
      const item = state.items.find(i => i.id === id);

      if (item) {
        const newQuantity = item.quantity + amount;

        if (newQuantity >= 1) {
          item.quantity = newQuantity;
          localStorage.setItem('cart', JSON.stringify(state.items));
        }
      }
    },

    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem('cart'); 
    },
  },
});

export const { addToCart, removeFromCart, changeQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
