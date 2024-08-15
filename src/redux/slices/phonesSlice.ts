import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { CatalogProduct } from '../../types/CatalogProduct';
import { getPhones } from '../../fetchClient/fetchClient';

type PhonesState = {
  phones: CatalogProduct[];
  phonesLoading: boolean;
  phonesErrorMsg: string;
};

const initialState: PhonesState = {
  phones: [],
  phonesLoading: false,
  phonesErrorMsg: '',
};

export const fetchPhones = createAsyncThunk('phones/fetch', async () => {
  return getPhones();
});

const phonesSlice = createSlice({
  name: 'phones',
  initialState,
  reducers: {
    clearErrorMsg: state => {
      return { ...state, phonesErrorMsg: '' };
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchPhones.pending, state => {
      return { ...state, phonesLoading: true };
    });

    builder.addCase(
      fetchPhones.fulfilled,
      (state, action: PayloadAction<CatalogProduct[]>) => {
        return { ...state, phonesLoading: false, phones: action.payload };
      },
    );

    builder.addCase(fetchPhones.rejected, state => {
      return {
        ...state,
        phonesLoading: false,
        phonesErrorMsg: 'Oops! Something went wrong.',
      };
    });
  },
});

export default phonesSlice.reducer;
export const { clearErrorMsg } = phonesSlice.actions;
export const selectPhones = (state: RootState) => state.phones;
