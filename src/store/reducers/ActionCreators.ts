import { fetchClient } from '../../utils/fetchClient';
import { Product } from '../models/product';
import { AppDispatch } from '../store';
import { productsSlice } from './ProductsSlice';

export const fetchProducts = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(productsSlice.actions.productsFetching());
    const response = await fetchClient.get<Product[]>('products.json');

    dispatch(productsSlice.actions.productsFetchingSuccess(response));
  } catch (e) {
    const error = e as Error;

    dispatch(productsSlice.actions.productsFetchingError(error.message));
  }
};
