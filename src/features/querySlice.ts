import { createSlice } from '@reduxjs/toolkit';

export interface QueryState {
  query: string;
}

const initialState: QueryState = {
  query: '',
};

export const querySlice = createSlice({
  name: 'query',
  initialState,
  reducers: {
    setQuery: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.query = action.payload;
    },
  },
});

export const {} = querySlice.actions;
export default querySlice.reducer;
