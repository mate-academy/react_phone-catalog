import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { CatalogProduct } from '../../types/CatalogProduct';
import { getAccessories } from '../../fetchClient/fetchClient';

type AccessoriesState = {
  accessories: CatalogProduct[];
  accessoriesLoading: boolean;
  accessoriesErrorMsg: string;
};

const initialState: AccessoriesState = {
  accessories: [],
  accessoriesLoading: false,
  accessoriesErrorMsg: '',
};

export const fetchAccessories = createAsyncThunk(
  'accessories/fetch',
  async () => {
    return getAccessories();
  },
);

const accessoriesSlice = createSlice({
  name: 'accessories',
  initialState,
  reducers: {
    clearErrorMsg: state => {
      return { ...state, accessoriesErrorMsg: '' };
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchAccessories.pending, state => {
      return { ...state, accessoriesLoading: true };
    });

    builder.addCase(
      fetchAccessories.fulfilled,
      (state, action: PayloadAction<CatalogProduct[]>) => {
        return {
          ...state,
          accessoriesLoading: false,
          accessories: action.payload,
        };
      },
    );

    builder.addCase(fetchAccessories.rejected, state => {
      return {
        ...state,
        accessoriesLoading: false,
        accessoriesErrorMsg: 'Oops! Something went wrong.',
      };
    });
  },
});

export default accessoriesSlice.reducer;
export const { clearErrorMsg } = accessoriesSlice.actions;
export const selectAccessories = (state: RootState) => state.accessories;
