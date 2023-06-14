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
    incrementFavoriteCounter: (state) => {
      state.value++;
    },
  },
});

export const { incrementFavoriteCounter } = counterSlice.actions;
export default counterSlice.reducer;
