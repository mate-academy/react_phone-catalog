/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  query: string;
  status: 'age' | 'name' | 'price';
  loading: boolean;
}
const initialState: FilterState = {
  query: '',
  status: 'age',
  loading: false,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setStatus: (state, action: PayloadAction<'age' | 'name' | 'price'>) => {
      state.status = action.payload;
    },
    clearQuery: state => {
      state.query = '';
    },
  },
});

export const { setQuery, setStatus, clearQuery } = filterSlice.actions;

export default filterSlice.reducer;
