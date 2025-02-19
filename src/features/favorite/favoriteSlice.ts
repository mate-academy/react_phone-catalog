import { Product } from '../../types/Product';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  products: Product[];
};

const initialState: InitialState = {
  products: [],
};

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addToFavorite: (state, action: PayloadAction<Product>) => {
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
    deleteFromFavorite: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        products: state.products.filter(
          product => product.id !== action.payload,
        ),
      };
    },
  },
});

export default favoriteSlice;
