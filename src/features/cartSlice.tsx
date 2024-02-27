import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TypeCard } from '../types/TypeCard';

export interface T {
  phonesInCart: TypeCard[];
}

export const initialState: T = {
  phonesInCart: [],
};

export const cart = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addPhonesInCart: (state, action) => {
      // const oldCart = localStorage.getItem('cart') || '';
      // const newCart: TypeCard[] = JSON.parse(oldCart);

      // newCart.push(action.payload);
      // localStorage.setItem('cart', JSON.stringify(newCart));

      // localStorage.setItem('cart', JSON.stringify(
      //   [...state.phonesInCart, action.payload],
      // ));

      return {
        ...state,
        phonesInCart: [...state.phonesInCart, action.payload],
      };
    },

    deletePhonesInCart: (state, action: PayloadAction<TypeCard>) => {
      // const oldCart = localStorage.getItem('cart') || '';
      // const newCart: TypeCard[] = JSON.parse(oldCart);

      // localStorage.setItem('cart', JSON.stringify(
      //   newCart.filter(item => item.id !== action.payload.id),
      // ));

      // localStorage.setItem('cart', JSON.stringify(
      //   state.phonesInCart
      //     .filter(card => card.id !== action.payload.id),
      // ));

      return {
        ...state,
        phonesInCart: state.phonesInCart
          .filter(card => card.id !== action.payload.id),
      };
    },

    // setSearchFilter: (state, action) => {
    //   return {
    //     ...state,
    //     searchFilter: action.payload,
    //   };
    // },
  },
});

export default cart.reducer;

export const {
  addPhonesInCart,
  deletePhonesInCart,
  // setSearchFilter,
} = cart.actions;
