import { useState } from 'react';
import { ProductCategory } from '../../types/ProductCategory';
import { Product } from '../../types/Product';
import { AppErrors } from '../../types/AppErrors';
import { ApiError } from '../../services/Errors';
import { getCachedProducts } from '../../utils/hooks/API/getCachedProducts';

type Params = {
  category: ProductCategory;
  itemId: string;
};

export const useProductAction = ({ category, itemId }: Params) => {
  const [error, setError] = useState<AppErrors | null>(null);

  const generalAction = async (): Promise<Product> => {
    setError(null);

    try {
      const { items } = await getCachedProducts(category);

      const product = items.find(p => p.itemId === itemId);

      if (!product) {
        throw new ApiError(404, 'NOT_FOUND');
      }

      return product;
    } catch (errorData) {
      if (errorData instanceof ApiError) {
        setError(errorData.code);
      } else {
        setError('UNKNOWN_ERROR');
      }

      throw errorData;
    }
  };

  return { generalAction, error };
};
