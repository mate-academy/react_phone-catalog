import { useEffect, useState } from 'react';
import { getProductDetailsById } from '../api/products';
import { ProductDetailsType } from '../types/types';

export const useProductDetails = (
  productId: string | undefined,
  category: string | undefined,
) => {
  const [product, setProduct] = useState<ProductDetailsType | undefined>();
  const [isProductLoading, setIsProductLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!productId || !category) {
      return;
    }

    // setIsProductLoading(true);

    getProductDetailsById(category, productId)
      .then(data => {
        setProduct(data);
      })
      .finally(() => {
        setIsProductLoading(false);
      });
  }, [productId, category]);

  return { product, isProductLoading };
};
