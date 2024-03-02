import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TypeCard } from "../types/TypeCard";

export interface T {
  phonesInCart: TypeCard[];
}

export const initialState: T = {
  phonesInCart: [],
};

export const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addPhonesInCart: (state, action) => {
      return {
        ...state,
        phonesInCart: [...state.phonesInCart, action.payload],
      };
    },

    deletePhonesInCart: (state, action: PayloadAction<TypeCard>) => {
      return {
        ...state,
        phonesInCart: state.phonesInCart.filter(
          (card) => card.id !== action.payload.id,
        ),
      };
    },
  },
});

export default cart.reducer;

export const { addPhonesInCart, deletePhonesInCart } = cart.actions;
