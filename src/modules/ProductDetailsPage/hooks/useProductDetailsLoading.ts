//#region imports
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { selectDetailsById } from '../../../store/selectors/productDetails';
import { selectCategoryById } from '../../../store/selectors/products';
import { loadProductDetails } from '../../../store/slices/productDetailsSlice';
import { useLoading } from '../../shared/hooks/useLoading';
import { loadProducts } from '../../../store/slices/productsSlice';
import { Category } from '../../shared/constants/categories';
//#endregion

export function useProductDetailsLoading(id: string) {
  const dispatch = useAppDispatch();

  const { isError, isLoading } = useAppSelector(state => state.productDetails);
  const { isError: productError, isLoading: productLoading } = useAppSelector(
    state => state.products,
  );

  const productDetails = useAppSelector(selectDetailsById(id));
  const category = useAppSelector(selectCategoryById(id)) as Category;

  const delay = useLoading();

  useEffect(() => {
    if (!productDetails) {
      dispatch(loadProductDetails(category));
    }

    if (!category) {
      dispatch(loadProducts());
    }
  }, [dispatch, productDetails, category]);

  return {
    productDetails,
    isLoading: isLoading || productLoading || delay,
    isError: isError || productError,
  };
}
