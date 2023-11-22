import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Phone } from '../types/Phone';
import { getPhones } from '../helpers/helper/htmlClient';

type InitialState = {
  phones: Phone[],
  loading: boolean,
  error: boolean,
};

export const init = createAsyncThunk('phones/fetch', getPhones);

const initialState: InitialState = {
  phones: [],
  loading: false,
  error: false,
};

const phonesSlice = createSlice({
  name: 'phones',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(init.pending, (state) => {
      return {
        ...state,
        error: false,
        loading: true,
      };
    });
    builder.addCase(init.fulfilled, (state, action) => {
      return {
        ...state,
        phones: action.payload,
        loading: false,
      };
    });
    builder.addCase(init.rejected, (state) => {
      return {
        ...state,
        error: true,
        loading: false,
      };
    });
  },
});

export default phonesSlice.reducer;
