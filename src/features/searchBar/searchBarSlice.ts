import { createSlice } from '@reduxjs/toolkit';

export interface SearchBarState {
  value: string;
}

const initialState: SearchBarState = {
  value: '',
};

const searchBarSlice = createSlice({
  name: 'searchBar',
  initialState,
  reducers: {
    setSearchValue: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.value = action.payload;
    },
  },
});

export const { setSearchValue } = searchBarSlice.actions;
export default searchBarSlice.reducer;
