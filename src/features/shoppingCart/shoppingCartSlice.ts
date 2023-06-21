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
    removeProductFromCart: (state, action: PayloadAction<number>) => {
      state.value = state.value.filter(prod => prod.id !== action.payload);
    },
    addQuantity: (state, action: PayloadAction<number>) => {
      const product = state.value.find(product => product.id === action.payload);

      if (product) {
        product.quantity++;
      }
    },
    subtractQuantity: (state, action: PayloadAction<number>) => {
      const product = state.value.find(product => product.id === action.payload);
    
      if (product) {
        product.quantity--;
      }
    },
  },
});

export const {
  addProductToCart,
  removeProductFromCart,
  addQuantity,
  subtractQuantity,
} = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;
