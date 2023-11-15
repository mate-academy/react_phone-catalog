/* eslint-disable no-param-reassign */
import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import { Preview } from '../../types/Preview';
import { getData } from '../../helpers/httpClient';

type PreviewsState = {
  previews: Preview[],
  isLoaded: boolean,
  hasError: boolean,
};

const initialState: PreviewsState = {
  previews: [],
  isLoaded: false,
  hasError: false,
};

export const init = createAsyncThunk(
  'previews/fetch',
  () => getData<Preview[]>('previews'),
);

const goodsSlice = createSlice({
  name: 'previews',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      state.hasError = false;
      state.isLoaded = true;
    });

    builder.addCase(
      init.fulfilled, (state, action: PayloadAction<Preview[]>) => {
        state.previews = action.payload;
        state.isLoaded = false;
      },
    );

    builder.addCase(init.rejected, state => {
      state.isLoaded = false;
      state.hasError = true;
    });
  },
});

export default goodsSlice.reducer;
