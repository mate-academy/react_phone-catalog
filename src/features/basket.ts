import { PayloadAction, Reducer, createSlice } from '@reduxjs/toolkit';
import { ProductWithQuantity } from '../types/ProductWithQuantity';
import {
  getLocalStorData,
  setLocalStorageData,
} from '../helpers/localStorageData';

const key = 'selectedProducts';

export interface BasketState {
  selectedProducts: ProductWithQuantity[];
}

export const initialState: BasketState = {
  selectedProducts: getLocalStorData(key),
};

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    setSelectedProducts: (
      state,
      action: PayloadAction<ProductWithQuantity[]>,
    ) => {
      state.selectedProducts = action.payload;
    },
    addProductToBasket: (state, action: PayloadAction<ProductWithQuantity>) => {
      const { id } = action.payload;
      const existingProduct = state.selectedProducts.find(p => p.id === id);

      if (existingProduct) {
        if (existingProduct.quantity !== undefined) {
          existingProduct.quantity += 1;
        }
      } else {
        state.selectedProducts.push({ ...action.payload, quantity: 1 });
      }

      setLocalStorageData(key, state.selectedProducts);
    },
    incrementQuantity: (state, action: PayloadAction<string>) => {
      const product = state.selectedProducts.find(p => p.id === action.payload);
      if (product) {
        product.quantity = (product.quantity ?? 0) + 1;
      }

      setLocalStorageData(key, state.selectedProducts);
    },
    decrementQuantity: (state, action: PayloadAction<string>) => {
      const product = state.selectedProducts.find(p => p.id === action.payload);
      if (product && (product.quantity ?? 0) > 1) {
        product.quantity = (product.quantity ?? 0) - 1;
      }

      setLocalStorageData(key, state.selectedProducts);
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.selectedProducts = state.selectedProducts.filter(
        p => p.id !== action.payload,
      );

      setLocalStorageData(key, state.selectedProducts);
    },
  },
});

export const {
  setSelectedProducts,
  incrementQuantity,
  decrementQuantity,
  addProductToBasket,
  deleteProduct,
} = basketSlice.actions;

const basketReducer: Reducer<BasketState> = basketSlice.reducer;
export default basketReducer;
