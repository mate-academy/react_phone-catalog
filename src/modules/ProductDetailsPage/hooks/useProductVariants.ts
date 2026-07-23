import { useEffect, useState } from 'react';
import { getProductVariant } from '@api/products';
import { ProductDetails } from 'src/types/ProductDetails';

export const useProductVariants = (product: ProductDetails | null) => {
  const [variants, setVariants] = useState<ProductDetails[]>([]);

  useEffect(() => {
    if (!product) {
      return;
    }

    getProductVariant(product.namespaceId).then(setVariants);
  }, [product]);

  return { variants };
};
