import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { TabAccessPhone } from '../types/tabAccessPhones';

export type ProductInfo = {
  product: TabAccessPhone | undefined;
  // loading: boolean;
  // error: boolean;
};

const initialState: ProductInfo = {
  product: undefined,
  // loading: false,
  // error: false,
};

// export const fetchProductInfo = createAsyncThunk(
//   'products/fetchProductInfo',
//   async (route: string) => {
//     let product;
//     product = await getProductDetails(route);
//     return product;
//   },
// );

const productInfoSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProductInfo: (state, action: PayloadAction<TabAccessPhone | undefined>) => {
      const currentState = state;

      currentState.product = action.payload;
    },
  },
});

export const selectedInfoProduct = (state: RootState) => state.selectedProduct.product;
export const { setProductInfo } = productInfoSlice.actions;
export default productInfoSlice.reducer;