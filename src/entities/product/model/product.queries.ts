import { useQuery } from '@tanstack/react-query';

import type { Category } from '@/shared/types/Category';

import { productApi } from '../product.api';

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: productApi.getAll,
  });
};

export const useProduct = (slug: string) => {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: () => productApi.getBySlug(slug),
    enabled: Boolean(slug),
  });
};

export const useProductByCategory = (slug: Category) => {
  return useQuery({
    queryKey: ['product', 'category', slug],
    queryFn: () => productApi.getByCategory(slug),
    enabled: Boolean(slug),
  });
};

export const useProductByIds = (ids: number[]) => {
  const sortedIds = [...new Set(ids)].sort((first, second) => first - second);

  return useQuery({
    queryKey: ['product', 'by-ids', sortedIds],
    queryFn: () => productApi.getByIds(sortedIds),
    enabled: sortedIds.length > 0,
  });
};

export const useProductByIdInCategory = <T extends Category>(
  category: T | undefined,
  id: string | undefined,
) => {
  return useQuery({
    queryKey: ['product-details', category, id],

    queryFn: () => {
      if (!category || !id) {
        throw new Error('Missing category or ID');
      }

      return productApi.getByIdInCategory(category, id);
    },

    enabled: Boolean(category && id),
  });
};

export const useProductByVariant = (
  table?: Category,
  namespaceId?: string,
  color?: string,
  capacity?: string,
) => {
  return useQuery({
    queryKey: ['product', 'variant', table, namespaceId, color, capacity],

    queryFn: () => {
      if (!table || !namespaceId || !color || !capacity) {
        throw new Error('Missing product parameters');
      }

      return productApi.getByVariant(table, namespaceId, color, capacity);
    },

    enabled: Boolean(table && namespaceId && color && capacity),
  });
};
