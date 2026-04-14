import { useMemo } from 'react';
import { Product } from '../../types/Product';

export const useProductPagination = (
  products: Product[],
  itemsPerPage: string,
  currentPage: number,
) => {
  const totalPages = itemsPerPage === 'All' ? 1 : Math.ceil(products.length / +itemsPerPage);

  const calculateOffset = () => {
    const BUTTON_SIZE = 32;
    const GAP = 8;
    const BUTTON_UNIT = 40;
    const VIEWPORT_WIDTH = 152;

    const offset = (currentPage - 1) * BUTTON_UNIT - VIEWPORT_WIDTH / 2 + BUTTON_SIZE / 2;

    const totalTrackWidth = totalPages * BUTTON_SIZE + (totalPages - 1) * GAP;

    const maxOffset = totalTrackWidth - VIEWPORT_WIDTH;

    return Math.max(0, Math.min(offset, maxOffset));
  };

  const visibleProducts = useMemo(() => {
    if (itemsPerPage === 'All') {
      return products;
    }

    const start = (currentPage - 1) * +itemsPerPage;
    const end = start + +itemsPerPage;

    return products.slice(start, end);
  }, [products, currentPage, itemsPerPage]);

  return { visibleProducts, totalPages, calculateOffset };
};
