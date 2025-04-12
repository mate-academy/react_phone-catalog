import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface initialState {
  crumbs: string[];
}

const initialState: initialState = {
  crumbs: [],
}

export const CrumbsSlice = createSlice({
  name: 'crumbs',
  initialState,
  reducers: {
    resetCrumbs: (state, action: PayloadAction<string[]>) => {
      state.crumbs = action.payload;
    },
    updateCrumbs: (state, action: PayloadAction<string>) => {
      if (!state.crumbs.includes(action.payload)) {
        state.crumbs.push(action.payload);
      }
    },
  },
});

export const { resetCrumbs, updateCrumbs } = CrumbsSlice.actions;
export default CrumbsSlice.reducer;
