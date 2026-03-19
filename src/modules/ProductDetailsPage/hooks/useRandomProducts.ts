import { useMemo } from 'react';
import { Product } from '../../../types';

export const useRandomProducts = (
  products: Product[],
  id: string,
  namespaceId: string,
) => {
  return useMemo(() => {
    const filtered = products.filter(p => p.itemId !== id);
    const seed = namespaceId
      .split('')
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);

    return [...filtered].sort((a, b) => {
      const sortA = (Number(a.id) * seed) % filtered.length;
      const sortB = (Number(b.id) * seed) % filtered.length;

      return sortA - sortB;
    });
  }, [products, id, namespaceId]);
};
