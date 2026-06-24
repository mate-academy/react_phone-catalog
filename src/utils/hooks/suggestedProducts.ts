import { useParams } from 'react-router-dom';
import { ProductCategory } from '../../types/ProductCategory';
import { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { getSuggestedProducts } from '../api/services/products';

export const useSuggestedProducts = () => {
  const { category, itemId } = useParams<{
    category: ProductCategory;
    itemId: string;
  }>();

  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!category || !itemId) {
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      getSuggestedProducts(category)
        .then(setSuggestedProducts)
        .finally(() => setIsLoading(false));
    }, 500);
  }, [category, itemId]);

  return { suggestedProducts, isLoading };
};
