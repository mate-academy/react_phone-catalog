import { Product } from '../../types/product';
import { useEffect, useMemo, useState } from 'react';
import { DEFAULT_ITEMS_PER_PAGE, FIRST_PAGE, ItemsPerPage } from '../constants';
import { SortBy, SORT } from '../constants';

type UseProductsPageParams = {
  fetchFn: () => Promise<Product[]>;
};

export const useProductsPage = ({ fetchFn }: UseProductsPageParams) => {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [sortBy, setSortBy] = useState<SortBy>(SORT.NEWEST);

  const [itemsPerPage, setItemsPerPage] = useState<ItemsPerPage>(
    DEFAULT_ITEMS_PER_PAGE,
  );

  const [currentPage, setCurrentPage] = useState(FIRST_PAGE);

  useEffect(() => {
    async function loadItems() {
      try {
        setLoading(true);
        setError(false);

        const data = await fetchFn();

        setItems(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadItems();
  }, [fetchFn]);

  const sorted = useMemo(() => {
    return [...items].sort((a, b) => {
      switch (sortBy) {
        case SORT.ALPHA:
          return a.name.localeCompare(b.name);
        case SORT.CHEAPEST:
          return a.price - b.price;
        default:
          return b.year - a.year;
      }
    });
  }, [items, sortBy]);

  const totalItems = sorted.length;

  const totalPages =
    itemsPerPage === 'all'
      ? FIRST_PAGE
      : Math.ceil(totalItems / (itemsPerPage as number));

  const startIndex =
    itemsPerPage === 'all' ? 0 : (currentPage - 1) * (itemsPerPage as number);

  const endIndex =
    itemsPerPage === 'all' ? totalItems : startIndex + (itemsPerPage as number);

  const paginated = useMemo(() => {
    if (itemsPerPage === 'all') {
      return sorted;
    }

    return sorted.slice(startIndex, endIndex);
  }, [sorted, startIndex, endIndex, itemsPerPage]);

  const handlePageChange = (page: number) => {
    if (page >= FIRST_PAGE && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return {
    items,
    loading,
    error,
    sorted,
    sortBy,
    setSortBy,

    paginated,
    itemsPerPage,
    setItemsPerPage,

    currentPage,
    setCurrentPage,
    totalPages,
    handlePageChange,
  };
};
