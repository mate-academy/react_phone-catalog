import {createSlice, PayloadAction, Slice} from "@reduxjs/toolkit";

import {Product} from "../types/Product";

type SelectedProductState = {
  selectedProduct: Product | null;
};

const initialState: SelectedProductState = {
  selectedProduct: null,
};

export const selectedProductSlice: Slice<SelectedProductState> = createSlice({
  name: "selectedProduct",
  initialState,
  reducers: {
    addProduct: (state, {payload}: PayloadAction<Product>) => {
      if (state.selectedProduct?.id !== payload.id) {
        state.selectedProduct = payload;
      }
    },
  },
});

export const {reducer, actions} = selectedProductSlice;
