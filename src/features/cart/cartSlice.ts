import { Product } from '../../types/Product';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  products: Product[];
};

const initialState: InitialState = {
  products: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const productExists = state.products.find(
        product => product.id === action.payload.id,
      );

      if (!productExists) {
        state.products.push(action.payload);
      } else {
        return {
          ...state,
          products: state.products.filter(
            product => product.id !== productExists.id,
          ),
        };
      }
    },
    deleteFromCart: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        products: state.products.filter(
          product => product.id !== action.payload,
        ),
      };
    },
  },
});

export default cartSlice;
