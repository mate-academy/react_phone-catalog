/* eslint-disable @typescript-eslint/indent */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '../../../../app/providers/StoreProvider';
import {
  ProductsSortField,
  ProductsSortPerPage,
} from '../../../../shared/const';
import { productPageSliceActions } from '../slice/productPageSlice';

interface InitProductsPageProps {
  searchParams: URLSearchParams;
}

export const initProductsPage = createAsyncThunk<
  void,
  InitProductsPageProps,
  ThunkConfig<boolean>
>('productsPage/initProductsPage', async ({ searchParams }, ThunkApi) => {
  const { dispatch } = ThunkApi;

  const sort = searchParams.get('sort');
  const search = searchParams.get('search');
  const perPage = searchParams.get('perPage');
  const page = searchParams.get('page');

  if (sort) {
    dispatch(productPageSliceActions.setSort(sort as ProductsSortField));
  }

  if (page) {
    dispatch(productPageSliceActions.setCurrentPage(+page));
  }

  if (perPage) {
    dispatch(
      productPageSliceActions.setPerPage(perPage as ProductsSortPerPage),
    );
  }

  if (search) {
    dispatch(productPageSliceActions.setSearch(search));
  }
});
