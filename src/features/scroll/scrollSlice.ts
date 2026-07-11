import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type ScrollBehavior = 'auto' | 'smooth';

type ScrollState = {
  shouldScrollToTop: boolean;
  behavior: ScrollBehavior;
};

const initialState: ScrollState = {
  shouldScrollToTop: false,
  behavior: 'auto',
};

export const scrollSlice = createSlice({
  name: 'scroll',
  initialState,
  reducers: {
    setScrollToTop: (state, action: PayloadAction<ScrollBehavior>) => {
      state.shouldScrollToTop = true;
      state.behavior = action.payload;
    },
    // * auto use each time after calling setScrollToTop
    resetScrollToTop: (state) => {
      state.shouldScrollToTop = false;
      state.behavior = 'auto';
    },
  },
});

export default scrollSlice.reducer;
export const { setScrollToTop, resetScrollToTop } = scrollSlice.actions;
