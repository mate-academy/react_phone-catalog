import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TabAccessPhone } from '../types/tabAccessPhones';

export type FavProductsInfo = {
  favProducts: TabAccessPhone[];
};

const initialState: FavProductsInfo = {
  favProducts: [],
};

const FavSlice = createSlice({
  name: 'favProducts',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<TabAccessPhone>) => {
      const currentState = state;

      const findSame = currentState.favProducts.find((prod) => prod.id === action.payload.id);
      
      if (!findSame) {
        currentState.favProducts.push(action.payload);
      } else {
        currentState
      }
    },

    removeProduct: (state, action: PayloadAction<TabAccessPhone>) => {
      const currentState = state;

      currentState.favProducts = currentState.favProducts.filter(
        prod => prod.id !== action.payload.id,
      );
    },
  },
});

export const { actions } = FavSlice;
export default FavSlice.reducer;
