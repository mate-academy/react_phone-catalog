import { useEffect, useState } from 'react';
import { getSuggestedProducts } from '../../../api/products';
import { Product } from 'src/types/Product';
import { ProductDetails } from 'src/types/ProductDetails';

export const useSuggestedProducts = (product: ProductDetails | null) => {
  const [suggested, setSuggested] = useState<Product[]>([]);
  const [isSuggestedLoading, setIsSuggestedLoading] = useState(true);
  const [hasSuggestedError, setHasSuggestedError] = useState(true);

  useEffect(() => {
    if (!product) {
      return;
    }

    setSuggested([]);
    setIsSuggestedLoading(true);
    setHasSuggestedError(false);

    getSuggestedProducts(product.category)
      .then(setSuggested)
      .catch(() => setHasSuggestedError(true))
      .finally(() => setIsSuggestedLoading(false));
  }, [product]);

  return { suggested, isSuggestedLoading, hasSuggestedError };
};
