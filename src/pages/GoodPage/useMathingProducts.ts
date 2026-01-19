import { useEffect, useState } from 'react';
import { ProductCategory } from '../../types/ProductCategory';
import { Product } from '../../types/Product';
import { AppErrors } from '../../types/AppErrors';
import { getCachedProducts } from '../../utils/hooks/API/getCachedProducts';
import { ApiError } from '../../services/Errors';

// type Params = {
//   category: ProductCategory | null;
// };

export const useMathingProduct = (category: ProductCategory | null) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AppErrors | null>(null);

  useEffect(() => {
    if (!category) {
      setProducts([]);

      return;
    }

    setIsLoading(true);
    setError(null);

    getCachedProducts(category)
      .then(({ items }) => {
        const filtered = items.filter(product => product.category === category);

        setProducts(filtered);
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
  }, [category]);

  return { products, isLoading, error };
};
