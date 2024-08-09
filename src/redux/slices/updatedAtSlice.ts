import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

const updatedAtSlice = createSlice({
  name: 'updatedAt',
  initialState: +new Date(),
  reducers: {
    setUpdatedAt: (_, action: PayloadAction<number>) => {
      return action.payload;
    },
  },
});

export default updatedAtSlice.reducer;
export const { setUpdatedAt } = updatedAtSlice.actions;
export const selectUpdatedAt = (state: RootState) => state.updatedAt;
