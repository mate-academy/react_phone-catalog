/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  LOCAL_STORAGE_CART_PRODUCTS,
  LOCAL_STORAGE_FAVORITES,
  ProductInfo,
  ProductSchema,
} from '../types/product';
import { ICartItemsLocalStorage } from '../../../../shared/lib/hooks/useLocalStorage';

const initialState: ProductSchema = {
  products: [],
  _inited: false,
};

const ProductSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<string>) => {
      state.products.push({
        cartItem: false,
        favorite: false,
        itemId: action.payload,
      });
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      state.products.splice(action.payload, 1);
    },
    removeCartItem: (state, action: PayloadAction<string>) => {
      const index = state.products.findIndex(
        item => item.itemId === action.payload,
      );

      if (index && state.products[index].favorite === false) {
        ProductSlice.actions.removeProduct(index);
      } else {
        state.products[index].cartItem = false;
      }
    },
    removeAllCartItem: state => {
      const currentItems: ProductInfo[] = [];

      state.products.forEach(item => {
        if (item.favorite !== false) {
          currentItems.push(item);
        }
      });

      state.products = [...currentItems];
    },
    addCartItem: (state, action: PayloadAction<string>) => {
      const index = state.products.findIndex(
        item => item.itemId === action.payload,
      );

      if (index) {
        state.products[index].cartItem = 1;
      } else {
        ProductSlice.actions.addProduct(action.payload);
        const newIndex = state.products.findIndex(
          item => item.itemId === action.payload,
        );

        state.products[newIndex].cartItem = 1;
      }
    },
    calcCountCartItem: (
      state,
      action: PayloadAction<{ id: string; count: number }>,
    ) => {
      const index = state.products.findIndex(
        item => item.itemId === action.payload.id,
      );

      if (
        index !== -1 &&
        state.products[index].cartItem !== false &&
        state.products[index].cartItem !== 1
      ) {
        state.products[index].cartItem = action.payload.count;
      }
    },
    initProductsInfo: state => {
      const products: ProductInfo[] = [];

      const prepareFavorites = localStorage.getItem(LOCAL_STORAGE_FAVORITES);
      const favorites: string[] = prepareFavorites
        ? JSON.parse(prepareFavorites)
        : [];

      const prepareCartItems = localStorage.getItem(
        LOCAL_STORAGE_CART_PRODUCTS,
      );
      const cartItems: ICartItemsLocalStorage[] = prepareCartItems
        ? JSON.parse(prepareCartItems)
        : [];

      favorites.forEach(itemId => {
        products.push({ itemId, favorite: true, cartItem: false });
      });

      cartItems.forEach(item => {
        const product = products.findIndex(
          productsItem => productsItem.itemId === item.itemId,
        );

        if (product !== -1) {
          products[product].cartItem = item.count;
        } else {
          products.push({
            itemId: item.itemId,
            cartItem: item.count,
            favorite: false,
          });
        }
      });

      state.products = [...products];
      state._inited = true;
    },
  },
});

export const { name: ProductSliceName } = ProductSlice;
export const { reducer: ProductSliceReducer } = ProductSlice;
export const { actions: ProductSliceActions } = ProductSlice;
