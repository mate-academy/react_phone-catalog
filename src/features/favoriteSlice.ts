import {createSlice, PayloadAction, Slice} from "@reduxjs/toolkit";

import {Product} from "../types/Product";

type FavoriteState = {
  favorite: Product[];
};

const initialState: FavoriteState = {
  favorite: [],
};

const favoriteSlice: Slice<FavoriteState> = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    add: (state, {payload}: PayloadAction<Product>) => {
      const isExistProduct = state.favorite.find(
        product =>
          product.id === payload.id &&
          product.color === payload.color &&
          product.capacity === payload.capacity,
      );

      if (isExistProduct) {
        state.favorite = state.favorite.filter(
          product =>
            product.id !== payload.id ||
            product.color !== payload.color ||
            product.capacity !== payload.capacity,
        );
      } else {
        state.favorite.push({
          ...payload,
          color: payload.color,
          capacity: payload.capacity,
        });
      }
    },
  },
});

export const {reducer, actions} = favoriteSlice;
