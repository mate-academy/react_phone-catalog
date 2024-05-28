import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
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
    addCart: (state: SelectedProduct, action: PayloadAction<Products>) => {
      const itemId = action.payload.id;
      const itemIndex = state.cartItem.findIndex(
        (item: CartDetails) => item.id === +itemId,
      );

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
          cartItem: state.cartItem.filter(item => item.id !== +itemId),
        };
      }
    },

    addCountProduct: (
      state: { cartItem: CartDetails[] },
      action: PayloadAction<number>,
    ) => {
      state.cartItem.forEach((item: CartDetails) => {
        if (item.id === action.payload) {
          const tempItem = item;

          tempItem.quantity += 1;
        }
      });
    },

    clearCart: (state: SelectedProduct) => {
      return {
        ...state,
        cartItem: [],
      };
    },

    minusCountProduct: (
      state: { cartItem: CartDetails[] },
      action: PayloadAction<number>,
    ) => {
      state.cartItem.forEach((item: CartDetails) => {
        if (item.id === action.payload) {
          const tempItem = item;

          tempItem.quantity -= 1;
        }
      });
    },

    deleteCart: (state: SelectedProduct, action: PayloadAction<number>) => {
      return {
        ...state,
        cartItem: state.cartItem.filter(
          (item: CartDetails) => item.id !== action.payload,
        ),
      };
    },

    addFavorite: (state: SelectedProduct, action: PayloadAction<Products>) => {
      const itemId = action.payload.id;
      const itemIndex = state.favorite.findIndex(
        (item: Products) => item.id === itemId,
      );

      if (itemIndex === -1) {
        return {
          ...state,
          favorite: [...state.favorite, action.payload],
        };
      } else {
        return {
          ...state,
          favorite: state.favorite.filter(
            (item: Products) => item.id !== itemId,
          ),
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
