import {createSlice, PayloadAction, Slice} from "@reduxjs/toolkit";

import {Product} from "../types/Product";

type ProductsState = {
  phones: Product[];
  tablets: Product[];
  acessories: Product[];
};

const initialState: ProductsState = {
  phones: [],
  tablets: [],
  acessories: [],
};

export const productsSlice: Slice<ProductsState> = createSlice({
  name: "products",
  initialState,
  reducers: {
    setPhones: (state, {payload}: PayloadAction<Product[]>) => {
      state.phones = payload;
    },
    setTablets: (state, {payload}: PayloadAction<Product[]>) => {
      state.tablets = payload;
    },
  },
});

export const {reducer, actions} = productsSlice;
