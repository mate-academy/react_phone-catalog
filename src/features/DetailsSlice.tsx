import { createSlice } from '@reduxjs/toolkit';
import { Products } from '../types/Product';

export interface CartDetails {
  product: Products;
  id: number;
  quantity: number;
}

export interface SelectedProduct {
  favorite: Products[];
  cartItem: CartDetails[];
}

const initialState: SelectedProduct = {
  favorite: [],
  cartItem: [],
};

export const chooseProduct = createSlice({
  name: 'selectedProduct',
  initialState,
  reducers: {
    addCart: (state, action) => {
      const itemId = action.payload.id;
      const itemIndex = state.cartItem.findIndex(item => item.id === itemId);

      if (itemIndex === -1) {
        return {
          ...state,
          cartItem: [
            ...state.cartItem,
            { product: action.payload, id: action.payload.id, quantity: 1 },
          ],
        };
      } else {
        return {
          ...state,
          cartItem: state.cartItem.filter(item => item.id !== itemId),
        };
      }
    },

    addCountProduct: (state, action) => {
      state.cartItem.forEach(item => {
        if (item.id === action.payload) {
          const tempItem = item;

          tempItem.quantity += 1;
        }
      });
    },

    clearCart: state => {
      return {
        ...state,
        cartItem: [],
      };
    },

    minusCountProduct: (state, action) => {
      state.cartItem.forEach(item => {
        if (item.id === action.payload) {
          const tempItem = item;

          tempItem.quantity -= 1;
        }
      });
    },

    deleteCart: (state, action) => {
      return {
        ...state,
        cartItem: state.cartItem.filter(item => item.id !== action.payload),
      };
    },

    addFavorite: (state, action) => {
      const itemId = action.payload.id;
      const itemIndex = state.favorite.findIndex(item => item.id === itemId);

      if (itemIndex === -1) {
        return {
          ...state,
          favorite: [...state.favorite, action.payload],
        };
      } else {
        return {
          ...state,
          favorite: state.favorite.filter(item => item.id !== itemId),
        };
      }
    },
  },
});

export default chooseProduct.reducer;
export const {
  addCart,
  addFavorite,
  deleteCart,
  addCountProduct,
  minusCountProduct,
  clearCart,
} = chooseProduct.actions;
