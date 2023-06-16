import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/product';

const shoppingCart = JSON.parse(localStorage.getItem('shoppingCart') || '[]');

interface ShoppingCartState {
  value: Product[];
}

const initialState: ShoppingCartState = {
  value: shoppingCart,
};

const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {
    addProductToCart: (state, action: PayloadAction<Product>) => {
      state.value.push(action.payload);
    },
    removeProductFromCart: (state, action: PayloadAction<Product>) => {
      const index = state.value.findIndex(product => {
        return product.id === action.payload.id;
      });

      if (index !== -1) {
        state.value.splice(index, 1);
      }
    },
  },
});

export const {
  addProductToCart,
  removeProductFromCart,
} = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;
