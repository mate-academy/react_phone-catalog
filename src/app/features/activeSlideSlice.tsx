import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const activeSlideSlice = createSlice({
  name: 'slide',
  initialState: 1,
  reducers: {
    setActiveSlide: (_state, action: PayloadAction<number>) => action.payload,
  },
});

export const { setActiveSlide } = activeSlideSlice.actions;
