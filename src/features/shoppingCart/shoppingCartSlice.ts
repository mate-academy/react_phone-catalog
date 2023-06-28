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
      // eslint-disable-next-line no-param-reassign
      state.value = state.value.filter(prod => prod.id !== action.payload);
    },
    addQuantity: (state, action: PayloadAction<number>) => {
      const product
        = state.value.find(prod => prod.id === action.payload);

      if (product) {
        // eslint-disable-next-line no-plusplus
        product.quantity++;
      }
    },
    subtractQuantity: (state, action: PayloadAction<number>) => {
      const product
        = state.value.find(prod => prod.id === action.payload);

      if (product) {
        // eslint-disable-next-line no-plusplus
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
