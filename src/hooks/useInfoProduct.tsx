import { useCallback, useState } from 'react';
import { ProductCard } from '../shared/types/ProductCard';
import { getDataPublic } from '../shared/functions/getDataPublic';
import { Products } from '../shared/types/Products';

export const useInfoProduct = () => {
  const [product, setProduct] = useState<ProductCard[] | null>(null);

  const getProductCard = useCallback(
    async (name: string, category: Products) => {
      try {
        const response = await getDataPublic(category, 10);

        const filteredProducts = response.filter(
          (el: ProductCard) => el.namespaceId === name,
        );

        if (filteredProducts.length === 0) {
          throw new Error('No matching products found');
        }

        setProduct(filteredProducts);
      } catch (error) {
        throw new Error(`error: ${error}`);
      }
    },
    [],
  );

  return { getProductCard, product };
};
