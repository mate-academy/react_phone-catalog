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
    decreasePhonesCountToSell: (state, action: PayloadAction<string>) => {
      const index = state.phonesInCart.findIndex(
        (phone) => phone.id === action.payload,
      );

      return {
        ...state,
        phonesInCart: state.phonesInCart.map((phone) => {
          if (phone.id === state.phonesInCart[index].id) {
            return {
              ...phone,
              countToSell: phone.countToSell - 1,
            };
          }

          return phone;
        }),
      };
    },

    increasePhonesCountToSell: (state, action: PayloadAction<string>) => {
      const index = state.phonesInCart.findIndex(
        (phone) => phone.id === action.payload,
      );

      return {
        ...state,
        phonesInCart: state.phonesInCart.map((phone) => {
          if (phone.id === state.phonesInCart[index].id) {
            return {
              ...phone,
              countToSell: phone.countToSell + 1,
            };
          }

          return phone;
        }),
      };
    },

    addPhonesInCart: (state, action: PayloadAction<TypeCard>) => {
      const newPhone = {
        ...action.payload,
        countToSell: 1,
      };

      return {
        ...state,
        phonesInCart: [...state.phonesInCart, newPhone],
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

export const {
  decreasePhonesCountToSell,
  increasePhonesCountToSell,
  addPhonesInCart,
  deletePhonesInCart,
} = cart.actions;
