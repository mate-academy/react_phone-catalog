import {
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { Product } from "../../../modules/shared/types/Product";
import { getDataFromLS } from "../../../modules/shared/utils/getDataFromLS";

type ProductState = {
  items: Product[];
};

const initialState: ProductState = {
  items: getDataFromLS('favourites').items,
};

export const favouritesSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    addToFavourites: (state, action: PayloadAction<Product>) => {
      const findItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (findItem) {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      } else {
        state.items.push(action.payload);
      };

      localStorage.setItem('favourites', JSON.stringify(state.items));
    },
  },
});

export const { addToFavourites } = favouritesSlice.actions;

export default favouritesSlice.reducer;
