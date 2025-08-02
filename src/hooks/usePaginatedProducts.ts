import { useMemo } from 'react';
import { Product } from '../types/Product';
import { ItemPerPage } from '../enums/ItemsPerPage';

export function usePaginatedProducts(
  products: Product[],
  perPage: number | ItemPerPage.All,
  currentPage: number,
) {
  const totalPages =
    perPage === ItemPerPage.All
      ? 1
      : Math.ceil(products.length / Number(perPage));

  const paginated = useMemo(() => {
    if (perPage === ItemPerPage.All) return products;

    const start = (currentPage - 1) * Number(perPage);
    return products.slice(start, start + Number(perPage));
  }, [products, currentPage, perPage]);

  return { paginated, totalPages };
}
