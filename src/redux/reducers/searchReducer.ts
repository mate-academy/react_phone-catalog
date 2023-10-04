import { createSlice } from '@reduxjs/toolkit';

type SearchState = {
  query: string;
};

const initialState: SearchState = {
  query: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      return {
        ...state,
        query: action.payload,
      };
    },
  },
});

export const { setSearchQuery } = searchSlice.actions;
export default searchSlice.reducer;
