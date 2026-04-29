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
      const existingItem = state.items.find(
        item => item.id === action.payload.id,
      );

      if (!existingItem) {
        const newItems = [...state.items, { ...action.payload, quantity: 1 }];

        localStorage.setItem('cart', JSON.stringify(newItems));

        return { ...state, items: newItems };
      }
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      const newItems = state.items.filter(item => item.id !== action.payload);

      localStorage.setItem('cart', JSON.stringify(newItems));

      return { ...state, items: newItems };
    },

    changeQuantity: (
      state,
      action: PayloadAction<{ id: string; amount: number }>,
    ) => {
      const { id, amount } = action.payload;

      const newItems = state.items.map(item => {
        if (item.id === id) {
          const nextQuantity = item.quantity + amount;

          return {
            ...item,
            quantity: nextQuantity >= 1 ? nextQuantity : item.quantity,
          };
        }

        return item;
      });

      localStorage.setItem('cart', JSON.stringify(newItems));

      return { ...state, items: newItems };
    },

    clearCart: state => {
      localStorage.removeItem('cart');

      return { ...state, items: [] };
    },
  },
});

export const { addToCart, removeFromCart, changeQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
