import { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { AppErrors } from '../../types/AppErrors';
import { getCachedProducts } from '../../utils/hooks/API/getCachedProducts';
import { ApiError } from '../../services/Errors';
import { Goods } from '../../types/Goods';

// type Params = {
//   category: ProductCategory | null;
// };

export const useMathingProduct = (selectedProduct: Goods | null) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AppErrors | null>(null);

  useEffect(() => {
    if (!selectedProduct) {
      setProducts([]);

      return;
    }

    setIsLoading(true);
    setError(null);

    getCachedProducts(selectedProduct.category)
      .then(({ items }) => {
        const filtered = items.filter(
          product =>
            product.category === selectedProduct.category &&
            product.itemId !== selectedProduct.id,
        );

        const top20 = filtered.slice(0, 20);

        const random10 = top20.sort(() => Math.random() - 0.5).slice(0, 10);

        setProducts(random10);
      })
      .catch(errorData => {
        if (errorData instanceof ApiError) {
          setError(errorData.code);
        } else {
          setError('UNKNOWN_ERROR');
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [selectedProduct]);

  return { products, isLoading, error };
};
