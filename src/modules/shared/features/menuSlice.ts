import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const menuSlice = createSlice({
  name: 'menu',
  initialState: false,

  reducers: {
    set: (_state, action: PayloadAction<boolean>) => action.payload,
  },
});

export default menuSlice.reducer;
export const menuActions = menuSlice.actions;
