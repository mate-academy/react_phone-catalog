import { PayloadAction } from '@reduxjs/toolkit';
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { HomePageSchema } from '../types/homePageSchema';
import { fetchNewModels } from '../services/fetchNewModels';
import { Product } from '../../../../entities/Product';
import { fetchHotProducts } from '../services/fetchHotProducts';

const initialState: HomePageSchema = {
  hotProducts: [],
  hotProductsError: false,
  hotProductsLoading: false,
  newModelProducts: [],
  newModelProductsError: false,
  newModelProductsLoading: false,
};

const homePageSlice = createSlice({
  name: 'homePage',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchNewModels.pending, state => {
      state.newModelProductsLoading = true;
    });
    builder.addCase(
      fetchNewModels.fulfilled,
      (state, acttion: PayloadAction<Product[]>) => {
        state.newModelProductsLoading = false;
        state.newModelProducts = acttion.payload;
      },
    );
    // builder.addCase(fetchNewModels.rejected, state => {
    //   state.newModelProductsLoading = false;
    // });
    builder.addCase(fetchHotProducts.pending, state => {
      state.hotProductsLoading = true;
    });
    builder.addCase(
      fetchHotProducts.fulfilled,
      (state, acttion: PayloadAction<Product[]>) => {
        state.hotProductsLoading = false;
        state.hotProducts = acttion.payload;
      },
    );
    // builder.addCase(fetchHotProducts.rejected, state => {
    //   state.hotProductsError = true;
    //   state.newModelProductsLoading = false;
    // });
  },
});

export const { name: homePageSliceName } = homePageSlice;
export const { reducer: homePageSliceReducer } = homePageSlice;
