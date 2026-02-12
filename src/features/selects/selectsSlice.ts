import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SortBy } from '../../types/SortBy';
import { SortPages } from '../../types/SortPages';
import { SelectsState } from '../../types/SelectState';

const initialState: SelectsState = {
  sortType: SortBy.newest,
  pages: SortPages.all,
};

const selectsSlice = createSlice({
  name: 'selects',
  initialState,
  reducers: {
    setSortType: (state, action: PayloadAction<SortBy>) => {
      state.sortType = action.payload;
    },
    setPages: (state, action: PayloadAction<SortPages>) => {
      state.pages = action.payload;
    },
  },
});

export default selectsSlice.reducer;
export const { setSortType, setPages } = selectsSlice.actions;
