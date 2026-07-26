import { useMemo } from 'react';
import { ProductCardData, ProductCatalogAPI } from '../types';
import { mapCatalogToCard } from '../utils/mappers/product.mappers';

export function useSuggestedProducts(
  products: ProductCatalogAPI[],
  currentProductId: string,
  limit: number = 4,
): ProductCardData[] {
  return useMemo(() => {
    // Фільтруємо поточний продукт
    const filtered = products.filter(p => p.id !== currentProductId);

    // Перемішуємо масив
    const shuffled = [...filtered];

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // Беремо перші `limit` і мапимо через mapCatalogToCard
    return shuffled.slice(0, limit).map(mapCatalogToCard);
  }, [products, currentProductId, limit]);
}
