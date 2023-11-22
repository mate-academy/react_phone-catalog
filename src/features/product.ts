import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DetailPhone } from '../types/DetailPhone';
import { getPhone } from '../helpers/helper/htmlClient';

type InitialState = {
  product: DetailPhone | null,
  mainImage: string,
  loading: boolean,
  error: boolean,
};

export const init = createAsyncThunk('product/fetch', (id: string) => {
  return getPhone(id);
});

const initialState: InitialState = {
  product: null,
  mainImage: '',
  loading: false,
  error: false,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setImage: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        mainImage: action.payload,
      };
    },
  },
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
        product: action.payload,
        mainImage: action.payload.images[0],
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

export default productSlice.reducer;
export const { setImage } = productSlice.actions;
