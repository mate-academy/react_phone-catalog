import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { CatalogProduct } from '../../types/CatalogProduct';
import { getTablets } from '../../fetchClient/fetchClient';

type TabletsState = {
  tablets: CatalogProduct[];
  tabletsLoading: boolean;
  tabletsErrorMsg: string;
};

const initialState: TabletsState = {
  tablets: [],
  tabletsLoading: false,
  tabletsErrorMsg: '',
};

export const fetchTablets = createAsyncThunk('tablets/fetch', async () => {
  return getTablets();
});

const tabletsSlice = createSlice({
  name: 'tablets',
  initialState,
  reducers: {
    clearErrorMsg: state => {
      return { ...state, tabletsErrorMsg: '' };
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchTablets.pending, state => {
      return { ...state, tabletsLoading: true };
    });

    builder.addCase(
      fetchTablets.fulfilled,
      (state, action: PayloadAction<CatalogProduct[]>) => {
        return { ...state, tabletsLoading: false, tablets: action.payload };
      },
    );

    builder.addCase(fetchTablets.rejected, state => {
      return {
        ...state,
        tabletsLoading: false,
        tabletsErrorMsg: 'Oops! Something went wrong.',
      };
    });
  },
});

export default tabletsSlice.reducer;
export const { clearErrorMsg } = tabletsSlice.actions;
export const selectTablets = (state: RootState) => state.tablets;
