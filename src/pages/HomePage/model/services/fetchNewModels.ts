/* eslint-disable @typescript-eslint/indent */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProducts, Product } from '../../../../entities/Product';
import { ThunkConfig } from '../../../../app/providers/StoreProvider';
import { getItemsInfo } from '../../../../entities/Product/model/selectors/getItemsInfo';

export const fetchNewModels = createAsyncThunk<
  Product[],
  void,
  ThunkConfig<boolean>
>('homePage/fetchNewModels', async (_, ThuncApi) => {
  const { rejectWithValue, getState } = ThuncApi;

  try {
    const productsInfo = getItemsInfo(getState());
    const products = await fetchProducts(productsInfo);

    if (typeof products === 'string') {
      return rejectWithValue(false);
    } else {
      return products.filter(product => product.year === 2022);
    }
  } catch (e) {
    return rejectWithValue(false);
  }
});
