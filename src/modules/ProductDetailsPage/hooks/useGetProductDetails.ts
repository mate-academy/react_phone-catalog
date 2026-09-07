import { useLocation, useParams } from 'react-router-dom';
import { useDetailsProduct } from '../../../hooks/context/useDetailsProduct';
import { useEffect, useState } from 'react';
import { ProductCategoryType } from '../../../shared/types/ProductCatogoryType';

export const useGetProductDetails = () => {
  const [reloadFlaf, setReloadFlag] = useState<boolean>(false);
  const { getProduct, product, isLoading, isError } = useDetailsProduct();
  const { productId } = useParams();
  const location = useLocation();

  const categoryStr = location.pathname.split('/')[1];

  const category: ProductCategoryType | undefined =
    categoryStr === 'phones' ||
    categoryStr === 'tablets' ||
    categoryStr === 'accessories'
      ? categoryStr
      : undefined;

  const onReload = () => setReloadFlag(curr => !curr);

  useEffect(() => {
    if (category && productId) {
      getProduct(productId, category);
    }
  }, [category, productId, reloadFlaf]);

  return { product, isLoading, isError, onReload };
};
