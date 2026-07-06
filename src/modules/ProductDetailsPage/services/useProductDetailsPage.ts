//#region imports
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { useLoading } from '../../shared/hooks/useLoading';
import { loadProducts } from '../../../store/slices/productsSlice';
import { loadProductDetails } from '../../../store/slices/productDetailsSlice';
import { Category } from '../../shared/constants/categories';
import { selectProductById } from '../../../store/selectors/products';
import { selectDetailsById } from '../../../store/selectors/productDetails';
//#endregion

export function useProductDetailsPage(productId: string) {
  const dispatch = useAppDispatch();
  const delay = useLoading();

  const {
    items,
    isLoading: isProductsLoading,
    isError: isProductError,
  } = useAppSelector(state => state.products);

  const { isLoading: isDetailsLoading, isError: isDetailsError } =
    useAppSelector(state => state.productDetails);

  const product = useAppSelector(selectProductById(productId));
  const productDetails = useAppSelector(selectDetailsById(productId));

  useEffect(() => {
    if (items.length === 0) {
      dispatch(loadProducts());
    }
  }, [dispatch, items.length]);

  useEffect(() => {
    if (!product) {
      return;
    }

    if (!productDetails) {
      dispatch(loadProductDetails(product.category as Category));
    }
  }, [product, productDetails, dispatch]);

  const isLoading = isProductsLoading || isDetailsLoading || delay;
  const isError =
    !isLoading && (isProductError || isDetailsError || !productDetails);

  return {
    product,
    productDetails,
    isLoading,
    isError,
  };
}
