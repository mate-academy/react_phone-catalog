//#region imports
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { selectProductsByCategory } from '../../../store/selectors/products';
import { loadProducts } from '../../../store/slices/productsSlice';
import { useLoading } from '../../shared/hooks/useLoading';
import { Category } from '../../shared/constants/categories';
//#endregion

export function useProductsLoading(category: Category) {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector(state => state.products);
  const products = useAppSelector(selectProductsByCategory(category));
  const delay = useLoading();

  useEffect(() => {
    if (!isLoading && products.length === 0) {
      dispatch(loadProducts());
    }
  }, [isLoading, products, dispatch]);

  return {
    products,
    isLoading: isLoading || delay,
  };
}
