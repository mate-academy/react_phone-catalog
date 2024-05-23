import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TabAccessPhone } from '../types/tabAccessPhones';

export type favProductsInfo = {
  favProducts: TabAccessPhone[];
};

const initialState: favProductsInfo = {
  favProducts: [],
};

const favSlice = createSlice({
  name: 'favProducts',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<TabAccessPhone>) => {
      const currentState = state;

      currentState.favProducts.push(action.payload);
    },

    removeProduct: (state, action: PayloadAction<TabAccessPhone>) => {
      const currentState = state;

      currentState.favProducts = currentState.favProducts.filter(prod => prod !== action.payload);
    }
  },
});

export const { actions } = favSlice;
export default favSlice.reducer;