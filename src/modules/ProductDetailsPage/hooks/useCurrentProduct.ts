import { useEffect, useState } from 'react';
import { getProductByItemId } from '../../../api/products';
import { Product } from 'src/types/Product';
import { ProductDetails } from 'src/types/ProductDetails';

export const useCurrentProduct = (product: ProductDetails | null) => {
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!product) {
      return;
    }

    getProductByItemId(product.id).then(setCurrentProduct);
  }, [product]);

  return { currentProduct };
};
