import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Product } from '../types/Product';

type ProdsState = {
  prods: Product[];
};

const initialState: ProdsState = {
  prods: [],
};

const prodsSlice = createSlice({
  name: 'prods',
  initialState,
  reducers: {
    setProds: (state, action: PayloadAction<Product[]>) => {
      // eslint-disable-next-line no-param-reassign
      state.prods = action.payload;
    },
  },
});

export default prodsSlice.reducer;
export const { setProds } = prodsSlice.actions;
