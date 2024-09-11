/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/indent */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '../../../../app/providers/StoreProvider';
import { CategoriesEnum } from '../../../../entities/Categories';
import { fetchProducts, Product } from '../../../../entities/Product';
import { getProductsSortField } from '../selectors/getProductsSortField';
import {
  ProductsSortField,
  ProductsSortPerPage,
} from '../../../../shared/const';
import { SortCallback } from '../types/ProductPageSchema';
import { getSearch } from '../selectors/getSearch';
import { getCountPerPage } from '../selectors/getProductsPerPage';
import { getCurrentPage } from '../selectors/getCurrentPage';
import { productPageSliceActions } from '../slice/productPageSlice';

export const prepareProductsList = createAsyncThunk<
  Product[],
  CategoriesEnum,
  ThunkConfig<boolean>
>('productsPage/getProductsList', async (category, ThunkApi) => {
  const { getState, rejectWithValue, dispatch } = ThunkApi;
  const { setPagesCount, setProductsCount } = productPageSliceActions;
  const state = getState();
  const sort = getProductsSortField(state);
  const perPage = getCountPerPage(state);
  const currentPage = getCurrentPage(state);
  const search = getSearch(state).trim();

  try {
    const products = await fetchProducts();

    if (typeof products !== 'string') {
      const productsByCategory = products.filter(
        product => product.category === category,
      );

      let result = [];
      let callback: SortCallback = undefined;

      switch (sort) {
        case ProductsSortField.NEWEST:
          callback = (a, b) => b.year - a.year;
          break;

        case ProductsSortField.ALPHABETICALLY:
          callback = (a, b) => a.name.localeCompare(b.name);
          break;

        case ProductsSortField.CHEAPEST:
          callback = (a, b) => a.price - b.price;
          break;
      }

      result = [...productsByCategory].sort(callback);

      if (search) {
        result = result.filter(pr => pr.name.toLowerCase().includes(search));
      }

      dispatch(setProductsCount(result.length));

      if (perPage !== ProductsSortPerPage.ALL && result.length !== 0) {
        const startIndex = (currentPage - 1) * +perPage;

        dispatch(setPagesCount(Math.ceil(result.length / +perPage)));
        result = result.slice(startIndex, startIndex + +perPage);
      } else {
        dispatch(setPagesCount(1));
      }

      return result;
    } else {
      return rejectWithValue(true);
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('result fetchProductsPage', e);

    return rejectWithValue(true);
  }
});
