import {createSlice, PayloadAction, Slice} from "@reduxjs/toolkit";

import {Product} from "../types/Product";

type CartState = {
  products: Product[];
};

const initialState: CartState = {
  products: [],
};

export const cartSlice: Slice<CartState> = createSlice({
  name: "products",
  initialState,
  reducers: {
    add: (state, {payload}: PayloadAction<Product>) => {
      const isExistProduct = state.products.find(
        product =>
          product.id === payload.id &&
          product.color === payload.color &&
          product.capacity === payload.capacity,
      );

      if (isExistProduct) {
        isExistProduct.quantity += 1;
      } else {
        state.products.push({
          ...payload,
          quantity: 1,
          color: payload.color,
          capacity: payload.capacity,
        });
      }
    },
    remove: (state, {payload}: PayloadAction<Product>) => {
      state.products = state.products.filter(
        product =>
          product.id !== payload.id ||
          product.color !== payload.color ||
          product.capacity !== payload.capacity,
      );
    },
    incQuantity: (state, {payload}: PayloadAction<Product>) => {
      const localProduct = state.products.find(
        product =>
          product.id === payload.id &&
          product.color === payload.color &&
          product.capacity === payload.capacity,
      );

      if (localProduct) {
        localProduct.quantity += 1;
      }
    },
    decQuantity: (state, {payload}: PayloadAction<Product>) => {
      const localProduct = state.products.find(
        product =>
          product.id === payload.id &&
          product.color === payload.color &&
          product.capacity === payload.capacity,
      );

      if (localProduct) {
        localProduct.quantity -= 1;
      }
    },
  },
});

export const {reducer, actions} = cartSlice;
