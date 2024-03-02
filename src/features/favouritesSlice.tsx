import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TypeCard } from "../types/TypeCard";

export interface T {
  favouritesPhones: TypeCard[];
}

export const initialState: T = {
  favouritesPhones: [],
};

export const favouritesSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    addFavouritePhones: (state, action) => {
      return {
        ...state,
        favouritesPhones: [...state.favouritesPhones, action.payload],
      };
    },

    deleteFavouritePhones: (state, action: PayloadAction<TypeCard>) => {
      return {
        ...state,
        favouritesPhones: state.favouritesPhones.filter(
          (card) => card.id !== action.payload.id,
        ),
      };
    },
  },
});

export default favouritesSlice.reducer;
export const { addFavouritePhones, deleteFavouritePhones } =
  favouritesSlice.actions;
