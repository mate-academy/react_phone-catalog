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

// Функція завантаження з localStorage
const loadCart = (): CartItem[] => {
  try {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Error loading cart:', error);
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

      if (existingItem) {
        // Якщо товар вже є, збільшуємо кількість
        existingItem.quantity += 1;
      } else {
        // Якщо немає, додаємо новий об'єкт з quantity: 1
        state.items.push({ ...action.payload, quantity: 1 });
      }

      localStorage.setItem('cart', JSON.stringify(state.items));
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      localStorage.setItem('cart', JSON.stringify(state.items));
    },

    // Зміна кількості (з кроком +1 або -1)
    changeQuantity: (state, action: PayloadAction<{ id: string; amount: number }>) => {
      const { id, amount } = action.payload;
      const item = state.items.find(i => i.id === id);

      if (item) {
        item.quantity = Math.max(1, item.quantity + amount);
        localStorage.setItem('cart', JSON.stringify(state.items));
      }
    },

    // Повне очищення кошика (наприклад, після оформлення замовлення)
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem('cart');
    },
  },
});

export const { addToCart, removeFromCart, changeQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
