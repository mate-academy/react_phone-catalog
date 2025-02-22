import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Product } from '../types';
import { getPhones } from '../utils/api';

export interface PhonesState {
  phones: Product[];
}

const initialState: PhonesState = {
  phones: JSON.parse(localStorage.getItem('phones') || '[]'),
};

export const setPhonesAsync = createAsyncThunk('phones/fetch', async () => {
  const data = await getPhones();

  localStorage.setItem('phones', JSON.stringify(data));

  return data;
});

export const phonesSlice = createSlice({
  name: 'phones',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(setPhonesAsync.fulfilled, (state, action) => {
      return {
        ...state,
        phones: action.payload,
      };
    });
  },
});

export const {} = phonesSlice.actions;
export default phonesSlice.reducer;
