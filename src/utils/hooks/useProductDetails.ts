import { useParams } from 'react-router-dom';
import { ProductCategory } from '../../types/ProductCategory';
import { ProductDetails } from '../../types/ProductDetails';
import { useEffect, useRef, useState } from 'react';
import { getProductId } from '../api/services/products';

export const useProductDetails = () => {
  const { category, itemId } = useParams<{
    category: ProductCategory;
    itemId: string;
  }>();

  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [loader, setLoader] = useState(false);
  const [hasError, setHasError] = useState(false);

  const getBaseId = (id: string) => {
    return id.split('-').slice(0, 2).join('-');
  };

  const prevBaseId = useRef<string | null>(null);

  useEffect(() => {
    if (!category || !itemId) {
      return;
    }

    const currentBaseId = getBaseId(itemId);
    const isNewProduct = prevBaseId.current !== currentBaseId;

    if (isNewProduct) {
      setLoader(true);
    }

    setHasError(false);

    const delay = isNewProduct
      ? new Promise(resolve => setTimeout(resolve, 500))
      : Promise.resolve();

    const fetchPromise = getProductId(category, itemId)
      .then(fetchedProduct => {
        setProduct(fetchedProduct);
      })
      .catch(() => {
        setHasError(true);
      });

    Promise.all([fetchPromise, delay]).finally(() => {
      if (isNewProduct) {
        setLoader(false);
      }
    });

    prevBaseId.current = currentBaseId;
  }, [category, itemId]);

  return { product, loader, hasError };
};
