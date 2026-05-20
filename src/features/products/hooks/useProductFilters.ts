import { useMemo } from 'react';
import { Product } from '@/features/products/types/product';

type SortOption = 'newest' | 'priceAsc' | 'priceDesc' | string;

export const useProductFilters = (
  allProducts: Product[],
  categoryKey: string,
  sortBy: SortOption,
  currentPage: number,
  perPage: number | string,
) => {
  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => product.category === categoryKey);
  }, [allProducts, categoryKey]);

  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];

    switch (sortBy) {
      case 'priceAsc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'priceDesc':
        return sorted.sort((a, b) => b.price - a.price);
      case 'nameAsc':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'nameDesc':
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      case 'newest':
      default:
        return sorted.sort((a, b) => b.year - a.year);
    }
  }, [filteredProducts, sortBy]);

  const paginatedProducts = useMemo(() => {
    if (perPage === 'all') {
      return sortedProducts;
    }

    const itemsPerPage = Number(perPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return sortedProducts.slice(startIndex, endIndex);
  }, [sortedProducts, currentPage, perPage]);

  return {
    filteredProducts,
    paginatedProducts,
    totalCount: filteredProducts.length,
  };
};
