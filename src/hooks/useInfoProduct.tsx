import { useCallback, useState } from 'react';
import { ProductCard } from '../shared/types/ProductCard';
import { getDataPublic } from '../shared/functions/functions';
import { Products } from '../shared/types/Products';

export const useInfoProduct = () => {
  const [product, setProduct] = useState<ProductCard[] | null>(null);

  const getProductCard = useCallback(
    async (category: Products, name: string) => {
      try {
        const response = await getDataPublic(category.toString());

        const findElement: ProductCard = response.find(
          (el: ProductCard) => el.id === name,
        );
        const filteredProducts = response.filter(
          (el: ProductCard) =>
            el.namespaceId === findElement.namespaceId &&
            el.id !== findElement.id,
        );

        setProduct([findElement, ...filteredProducts]);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(
          `Problem with fetching data: ${error instanceof Error ? error.message : error}`,
        );
      }
    },
    [],
  );

  return { getProductCard, product };
};
