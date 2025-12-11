import { Product } from '../../types';
import { useEffect, useMemo, useState } from 'react';
import {
  DEFAULT_ITEMS_PER_PAGE,
  FIRST_PAGE,
  ItemsPerPage,
  ITEMS_PER_PAGE_OPTIONS,
} from '../constants';
import { SortBy, SORT } from '../constants';
import { useSearchParams } from 'react-router-dom';

type UseProductsPageParams = {
  fetchFn: () => Promise<Product[]>;
};

export const useProductsPage = ({ fetchFn }: UseProductsPageParams) => {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const sortParam = searchParams.get('sort');
  const perPageParam = searchParams.get('perPage');
  const pageParam = searchParams.get('page');

  const initialSortBy: SortBy =
    sortParam === SORT.ALPHA ||
    sortParam === SORT.CHEAPEST ||
    sortParam === SORT.NEWEST
      ? sortParam
      : SORT.NEWEST;

  const initialPerPage: ItemsPerPage = ITEMS_PER_PAGE_OPTIONS.includes(
    perPageParam as ItemsPerPage,
  )
    ? (perPageParam as ItemsPerPage)
    : DEFAULT_ITEMS_PER_PAGE;

  const initialPage = Number(pageParam) > 0 ? Number(pageParam) : FIRST_PAGE;

  const [sortBy, setSortBy] = useState<SortBy>(initialSortBy);
  const [itemsPerPage, setItemsPerPage] =
    useState<ItemsPerPage>(initialPerPage);
  const [currentPage, setCurrentPage] = useState(initialPage);

  function updateSearchParams(patch: Record<string, string>) {
    const next = new URLSearchParams(searchParams);

    Object.entries(patch).forEach(([key, value]) => next.set(key, value));

    setSearchParams(next);
  }

  const handleSortChange = (value: SortBy) => {
    setSortBy(value);
    setCurrentPage(1);

    updateSearchParams({
      sort: value,
      perPage: String(itemsPerPage),
      page: '1',
    });
  };

  const handlePerPageChange = (value: ItemsPerPage) => {
    setItemsPerPage(value);
    setCurrentPage(1);

    updateSearchParams({
      sort: sortBy,
      perPage: String(value),
      page: '1',
    });
  };

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
      ? 1
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
        sort: sortBy,
        perPage: String(itemsPerPage),
        page: String(page),
      });
    }
  };

  useEffect(() => {
    requestAnimationFrame(() => {
      document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
      document.body.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }, [currentPage]);

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
