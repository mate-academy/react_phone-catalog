import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

const isMenuActiveSlice = createSlice({
  name: 'isMenuActive',
  initialState: false,
  reducers: {
    setIsMenuActive: (_, action: PayloadAction<boolean>) => {
      return action.payload;
    },
  },
});

export default isMenuActiveSlice.reducer;
export const { setIsMenuActive } = isMenuActiveSlice.actions;
export const selectIsMenuActive = (state: RootState) => state.isMenuActive;
