// /* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ProductType } from '../services/enums';
import { ProductDetailes } from '../services/typePhone';
// import { ProductType } from '../services/enums';

// export const loadTablets = createAsyncThunk(
//   'productsDetail/loadPhones',
//   async () => {
//     const response = await fetch('/api/phones.json');
//     const data = await response.json();

//     return data.filter(
//       (tablets: { category: string }) => tablets.category === 'tablets',
//     );
//   },
// );

export const loadProductsDetail = createAsyncThunk(
  'products/loadProducs',
  async (type: ProductType) => {
    await new Promise(resolve => setTimeout(resolve, 3000));

    let apiUrl = '';

    if (type === 'phones') {
      apiUrl = '/api/phones.json';
    } else if (type === 'tablets') {
      apiUrl = '/api/tablets.json';
    } else if (type === 'accessories') {
      apiUrl = '/api/accessories.json';
    }

    const response = await fetch(apiUrl);
    const data = await response.json();

    return data;
  },
);

// export const loadPhoneDetail = createAsyncThunk(
//   'products/loadProductDetails',
//   async () => {
//     await new Promise(resolve => setTimeout(resolve, 3000));
//     const response = await fetch('/api/phones.json');
//     const data = await response.json();

//     return data;
//   },
// );

export interface DetailState {
  detail: ProductDetailes[];
  isLoading: boolean;
  isError: boolean;
}

const initialState: DetailState = {
  detail: [],
  isLoading: false,
  isError: false,
};

export const detailSlice = createSlice({
  name: 'details',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(loadProductsDetail.pending, state => {
        // eslint-disable-next-line no-param-reassign
        state.isLoading = true;
      })
      .addCase(loadProductsDetail.fulfilled, (state, action) => {
        // eslint-disable-next-line no-param-reassign
        state.isLoading = false;
        // eslint-disable-next-line no-param-reassign
        state.detail = action.payload;
      })
      .addCase(loadProductsDetail.rejected, state => {
        // eslint-disable-next-line no-param-reassign
        state.isLoading = false;
        // eslint-disable-next-line no-param-reassign
        state.isError = true;
      });
  },
});

export default detailSlice.reducer;
