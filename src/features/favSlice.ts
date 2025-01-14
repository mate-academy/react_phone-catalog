import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type FavProductsInfo = {
  favProducts: string[];
};

const initialState: FavProductsInfo = {
  favProducts: [],
};

const FavSlice = createSlice({
  name: 'favProducts',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<string>) => {
      const currentState = state;

      const findSame = currentState.favProducts.find(
        prod => prod === action.payload,
      );

      /* eslint-disable */
      !findSame
        ? currentState.favProducts.push(action.payload)
        : currentState.favProducts;
    },

    removeProduct: (state, action: PayloadAction<string>) => {
      const currentState = state;

      currentState.favProducts = currentState.favProducts.filter(
        prod => prod !== action.payload,
      );
    },
  },
});

export const { actions } = FavSlice;
export default FavSlice.reducer;
