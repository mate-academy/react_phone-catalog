import { createSlice } from '@reduxjs/toolkit';

interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    incrementShoppingCounter: (state) => {
      state.value++;
    },
  },
});

export const { incrementShoppingCounter } = counterSlice.actions;
export default counterSlice.reducer;
