import { Product } from '../../types';
import { useEffect, useMemo, useState } from 'react';
import { DEFAULT_ITEMS_PER_PAGE, FIRST_PAGE, ItemsPerPage } from '../constants';
import { SortBy, SORT } from '../constants';
import { useSearchParams } from 'react-router-dom';

type UseProductsPageParams = {
  fetchFn: () => Promise<Product[]>;
};

export const useProductsPage = ({ fetchFn }: UseProductsPageParams) => {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [sortBy, setSortBy] = useState<SortBy>(SORT.NEWEST);

  const [searchParams, setSearchParams] = useSearchParams();

  const sortParam = searchParams.get('sort');

  const initialSortBy: SortBy =
    sortParam === SORT.ALPHA ||
    sortParam === SORT.CHEAPEST ||
    sortParam === SORT.NEWEST
      ? sortParam
      : SORT.NEWEST;

  const initialPerPage =
    (searchParams.get('perPage') as ItemsPerPage) || DEFAULT_ITEMS_PER_PAGE;

  const [itemsPerPage, setItemsPerPage] =
    useState<ItemsPerPage>(initialPerPage);

  const initialPage = Number(searchParams.get('page')) || FIRST_PAGE;

  const [currentPage, setCurrentPage] = useState(initialPage);

  function updateSearchParams(patch: Record<string, string>) {
    const next = new URLSearchParams(searchParams);

    Object.entries(patch).forEach(([key, value]) => {
      next.set(key, value);
    });

    setSearchParams(next);
  }

  const handleSortChange = (value: SortBy) => {
    setSortBy(value);

    updateSearchParams({
      sort: value,
      page: '1',
    });

    setCurrentPage(1);
  };

  const handlePerPageChange = (value: ItemsPerPage) => {
    setItemsPerPage(value);
    setCurrentPage(1);

    updateSearchParams({
      perPage: String(value),
      page: '1',
    });
  };

  useEffect(() => {
    setSortBy(initialSortBy);
  }, [initialSortBy]);

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

      updateSearchParams({
        page: String(page),
      });

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return {
    items,
    loading,
    error,
    sorted,

    sortBy,
    setSortBy: handleSortChange,

    paginated,
    itemsPerPage,
    setItemsPerPage: handlePerPageChange,

    currentPage,
    setCurrentPage,
    totalPages,
    handlePageChange,
  };
};
