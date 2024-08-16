import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SearchState = {
  visibleSearch: boolean;
  query: string;
};

const initialState: SearchState = {
  visibleSearch: false,
  query: '',
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      const currentState = state;

      currentState.query = action.payload;
    },

    setVisible: (state, action: PayloadAction<boolean>) => {
      const currentState = state;
      currentState.visibleSearch = action.payload
    }
  }
});

export const { actions } = searchSlice;
export default searchSlice.reducer;

