import { useMemo } from 'react';
import { Product } from '../types/Product';
import { useProducts } from '../context/useProducts';

const shuffleArray = (array: Product[]): Product[] => {
  const newArray = [...array];

  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }

  return newArray;
};

export const useSuggestions = (
  currentProductId: string | null | undefined,
  count = 10,
) => {
  const { products: allProducts } = useProducts();

  const suggestedProducts = useMemo(() => {
    if (allProducts.length <= 1 || !currentProductId) {
      return [];
    }

    const otherProducts = allProducts.filter(
      p => p.itemId !== currentProductId,
    );

    const shuffled = shuffleArray(otherProducts);

    return shuffled.slice(0, count);
  }, [allProducts, currentProductId, count]);

  return suggestedProducts;
};
