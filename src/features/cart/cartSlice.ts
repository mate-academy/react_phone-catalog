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
        state.products.push({
          ...action.payload,
          quantity: 1,
          totalPrice: action.payload.price,
        });
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
    onAddQuantity: (state, action: PayloadAction<number>) => {
      const product = state.products.find(item => item.id === action.payload);

      if (product) {
        product.quantity! += 1;
        product.totalPrice! += product.price;
      }
    },
    descQuantity: (state, action: PayloadAction<number>) => {
      const product = state.products.find(item => item.id === action.payload);

      if (product && product.quantity) {
        if (product.quantity > 1) {
          product.quantity! -= 1;
          product.totalPrice! -= product.price;
        }
      }
    },
    checkout: state => {
      return {
        ...state,
        products: [],
      };
    },
  },
});

export default cartSlice;
