import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const asideMenuSlice = createSlice({
  name: 'aside',
  initialState: false,
  reducers: {
    setIsOpened: (_state, action: PayloadAction<boolean>) => action.payload,
  },
});

export const { setIsOpened } = asideMenuSlice.actions;
