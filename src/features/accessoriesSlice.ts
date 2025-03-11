import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Product } from '../types';
import { getAccessories } from '../utils/api';

export interface AccessoriesState {
  accessories: Product[];
}

const initialState: AccessoriesState = {
  accessories: JSON.parse(localStorage.getItem('accessories') || '[]'),
};

export const setAccessoriesAsync = createAsyncThunk(
  'accessories/fetch',
  async () => {
    const data = await getAccessories();

    localStorage.setItem('accessories', JSON.stringify(data));

    return data;
  },
);

export const accessoriesSlice = createSlice({
  name: 'accessories',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(setAccessoriesAsync.fulfilled, (state, action) => {
      return {
        ...state,
        accessories: action.payload,
      };
    });
  },
});

export const {} = accessoriesSlice.actions;
export default accessoriesSlice.reducer;
