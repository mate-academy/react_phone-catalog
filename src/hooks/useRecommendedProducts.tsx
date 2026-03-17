import { useContext, useMemo } from 'react';
import { Product } from '../types/Product';
import { ProductsContext } from '../store/ProductsContext';

export const useRecommendedProducts = (currentProduct?: Product) => {
  const { products } = useContext(ProductsContext);

  const recommendedProducts = useMemo(() => {
    if (!currentProduct) return [];

    const modelMatch = currentProduct.name.match(/^[^\d]*\d+/);
    const model = modelMatch ? modelMatch[0].trim() : currentProduct.name;

    return products
      .filter(
        p =>
          p.category === currentProduct.category &&
          p.id !== currentProduct.id &&
          p.name.includes(model),
      )
      .sort((a, b) => b.year - a.year)
      .slice(0, 6);
  }, [products, currentProduct]);

  return recommendedProducts;
};
