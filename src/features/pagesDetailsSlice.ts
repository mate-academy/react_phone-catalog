/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type PagesDetails = {
  title: string;
  models: number;
};

const initialState: PagesDetails = {
  title: '',
  models: 0,
};

const pagesDetailsSlice = createSlice({
  name: 'pagesDetails',
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setModels: (state, action: PayloadAction<number>) => {
      state.models = action.payload;
    },
  },
});

export default pagesDetailsSlice.reducer;
export const { setTitle, setModels } = pagesDetailsSlice.actions;
