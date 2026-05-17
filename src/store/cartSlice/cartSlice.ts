import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AllProducts } from '../../shared/types/AllProducts/AllProducts';

export interface Cart {
  id: number;
  quantity: number;
  product: AllProducts;
}

const loadStateFromLocalStorage = () => {
  const savedItems = localStorage.getItem('cart');

  if (savedItems) {
    return JSON.parse(savedItems);
  }

  return [];
};

export const initialState: Cart[] = loadStateFromLocalStorage();

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartProduct: (state, action: PayloadAction<Cart>) => {
      const newState = [...state, action.payload];

      localStorage.setItem('cart', JSON.stringify(newState));

      return newState;
    },
    deleteCartProduct: (state, action: PayloadAction<number>) => {
      const newState = state.filter(cart => cart.id !== action.payload);

      localStorage.setItem('cart', JSON.stringify(newState));

      return newState;
    },
    updateCartProductQuantity: (
      state,
      action: PayloadAction<{ id: number; amount: number }>,
    ) => {
      const newState = state.map(cartProduct =>
        cartProduct.id === action.payload.id
          ? { ...cartProduct, quantity: action.payload.amount }
          : cartProduct,
      );

      localStorage.setItem('cart', JSON.stringify(newState));

      return newState;
    },
    clearCart: () => {
      return [];
    },
  },
});

export const {
  addCartProduct,
  deleteCartProduct,
  updateCartProductQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
