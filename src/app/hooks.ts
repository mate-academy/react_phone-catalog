import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { SetURLSearchParams } from 'react-router-dom';
import type { RootState, AppDispatch } from './store';
import { Product } from '../types/Product';
import { SelectedOptions } from '../types/SelectedOptions';
import { AsyncStatus } from '../types/AsyncStatus';
import { getVisibleProducts } from './utils';

// Use these hooks everywhere instead of useDispatch and useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export function updateStateProductsAndUrl(
  setVisibleStateOfProducts: React.Dispatch<React.SetStateAction<Product[]>>,
  productsFromApi: Product[],
  selectedOptions: SelectedOptions,
  statusOfLoadingProducts: AsyncStatus,
  currentPage: number,
  setSearchParams: SetURLSearchParams,
) {
  if (statusOfLoadingProducts === AsyncStatus.IDLE
    && productsFromApi.length > 0) {
    const result = getVisibleProducts(productsFromApi, selectedOptions);

    setVisibleStateOfProducts(result);
  }

  const params = new URLSearchParams();

  params.set('page', `${currentPage}`);
  params.set('sort', selectedOptions.sortBy);
  params.set('perPage', selectedOptions.itemsShow as string);

  setSearchParams(params);
}
