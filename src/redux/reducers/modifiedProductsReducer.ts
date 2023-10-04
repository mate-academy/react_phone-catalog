import { createSlice } from '@reduxjs/toolkit';

const modifiedProductsSlice = createSlice({
  name: 'modifiedProducts',
  initialState: [],
  reducers: {
    setModifiedProducts: (_state, action) => {
      return action.payload;
    },
  },
});

export const { setModifiedProducts } = modifiedProductsSlice.actions;

export default modifiedProductsSlice.reducer;
