import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const directionSlice = createSlice({
  name: 'direction',
  initialState: 'rigth',
  reducers: {
    setDirection: (_state, action: PayloadAction<'left' | 'right'>) =>
      action.payload,
  },
});

export const { setDirection } = directionSlice.actions;
