import { createSlice } from '@reduxjs/toolkit';

export const { reducer, actions } = createSlice({
  name: 'cart',
  initialState: [] as string[],
  reducers: {
    addProduct: (productsIds, { payload }) => [...productsIds, payload],
    removeProduct: (productsIds, { payload }) =>
      productsIds.filter(id => id !== payload),
    clearCart: () => [],
  },
});
