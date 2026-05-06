import { useCallback, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useFetchProducts } from '../../../features/products/useFetchProducts';
import type { Product } from '../../../types/product';

export type CategoryType = 'phones' | 'tablets' | 'accessories';
export type SortKey = 'age' | 'title' | 'price' | '';

export interface UseProductsParams {
  type: CategoryType;
  syncWithUrl?: boolean;
  initialQuery?: string;
  initialSort?: SortKey;
  initialPage?: number;
  initialPerPage?: string;
}

export interface UseProductsResult {
  items: Product[];
  totalItems: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
  query: string;
  setQuery: (q: string) => void;
  sort: SortKey;
  setSort: (s: SortKey) => void;
  page: number;
  setPage: (p: number) => void;
  perPage: string;
  setPerPage: (pp: string) => void;
}

export function useProductsForCategory(
  opts: UseProductsParams,
): UseProductsResult {
  const {
    type,
    syncWithUrl = true,
    initialQuery = '',
    initialSort = '',
    initialPage = 1,
    initialPerPage = 'all',
  } = opts;

  const { products, isLoading, error } = useFetchProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  const updateParams = useCallback(
    (update: (params: URLSearchParams) => void) => {
      const params = new URLSearchParams(searchParams);

      update(params);
      setSearchParams(params, { replace: true });
    },
    [searchParams, setSearchParams],
  );

  const query = syncWithUrl
    ? (searchParams.get('query') ?? initialQuery)
    : initialQuery;
  const sort = syncWithUrl
    ? ((searchParams.get('sort') as SortKey) ?? initialSort)
    : initialSort;
  const page = syncWithUrl
    ? parseInt(searchParams.get('page') ?? '', 10) || initialPage
    : initialPage;
  const perPage = syncWithUrl
    ? (searchParams.get('perPage') ?? initialPerPage)
    : initialPerPage;

  const setQuery = useCallback(
    (value: string) => {
      if (!syncWithUrl) {
        return;
      }

      updateParams(params => {
        const normalized = value.trim();

        if (normalized) {
          params.set('query', normalized);
        } else {
          params.delete('query');
        }

        params.delete('page');
      });
    },
    [syncWithUrl, updateParams],
  );

  const setSort = useCallback(
    (value: SortKey) => {
      if (!syncWithUrl) {
        return;
      }

      updateParams(params => {
        if (value) {
          params.set('sort', value);
        } else {
          params.delete('sort');
        }

        params.delete('page');
      });
    },
    [syncWithUrl, updateParams],
  );

  const setPage = useCallback(
    (value: number) => {
      if (!syncWithUrl) {
        return;
      }

      updateParams(params => {
        if (value && value !== 1) {
          params.set('page', String(value));
        } else {
          params.delete('page');
        }
      });
    },
    [syncWithUrl, updateParams],
  );

  const setPerPage = useCallback(
    (value: string) => {
      if (!syncWithUrl) {
        return;
      }

      updateParams(params => {
        if (value && value !== 'all') {
          params.set('perPage', value);
        } else {
          params.delete('perPage');
        }

        params.delete('page');
      });
    },
    [syncWithUrl, updateParams],
  );

  const byCategory = useMemo(() => {
    if (!products) {
      return [];
    }

    return products.filter(product => product.category === type);
  }, [products, type]);

  const filtered = useMemo(() => {
    if (!query) {
      return byCategory;
    }

    const normalizedQuery = query.trim().toLowerCase();

    return byCategory.filter(product =>
      product.name.toLowerCase().includes(normalizedQuery),
    );
  }, [byCategory, query]);

  const sorted = useMemo(() => {
    if (!sort) {
      return filtered;
    }

    const items = [...filtered];

    if (sort === 'age') {
      items.sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
    } else if (sort === 'title') {
      items.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === 'price') {
      items.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
    }

    return items;
  }, [filtered, sort]);

  const totalItems = sorted.length;
  const perPageNum =
    perPage === 'all' ? Infinity : parseInt(perPage, 10) || Infinity;
  const totalPages =
    perPageNum === Infinity
      ? 1
      : Math.max(1, Math.ceil(totalItems / perPageNum));

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }

    if (page < 1) {
      setPage(1);
    }
  }, [page, setPage, totalPages]);

  const paginated = useMemo(() => {
    if (perPageNum === Infinity) {
      return sorted;
    }

    const start = (page - 1) * perPageNum;

    return sorted.slice(start, start + perPageNum);
  }, [page, perPageNum, sorted]);

  return {
    items: paginated,
    totalItems,
    totalPages,
    isLoading,
    error,
    query,
    setQuery,
    sort,
    setSort,
    page,
    setPage,
    perPage,
    setPerPage,
  };
}
