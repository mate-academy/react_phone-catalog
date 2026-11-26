import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProductsByCategory } from '../../shared/api/products';
import type { Product, ProductCategory } from '../../shared/types/Product';

const DEFAULT_SORT = 'age';
const DEFAULT_PER_PAGE = 'all';
const PER_PAGE_OPTIONS = ['4', '8', '16', 'all'] as const;
const SORT_OPTIONS = {
  age: { field: 'year', direction: 'desc' as const },
  title: { field: 'title', direction: 'asc' as const },
  price: { field: 'price', direction: 'asc' as const },
} as const;

export type SortKey = keyof typeof SORT_OPTIONS;
export type PerPageValue = (typeof PER_PAGE_OPTIONS)[number];

export function useProducts(category: ProductCategory) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const sort = (searchParams.get('sort') as SortKey) || DEFAULT_SORT;
  const page = parseInt(searchParams.get('page') || '1', 10);
  const perPage =
    (searchParams.get('perPage') as PerPageValue) || DEFAULT_PER_PAGE;
  const query = searchParams.get('query') || '';

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProductsByCategory(category);

      setProducts(data);
    } catch (err) {
      setError('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (query) {
      const lowerQuery = query.toLowerCase();

      result = result.filter(
        p =>
          p.name.toLowerCase().includes(lowerQuery) ||
          p.itemId.toLowerCase().includes(lowerQuery),
      );
    }

    const sortConfig = SORT_OPTIONS[sort];

    result.sort((a, b) => {
      const aVal = a[sortConfig.field as keyof Product];
      const bVal = b[sortConfig.field as keyof Product];

      if (aVal < bVal) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }

      if (aVal > bVal) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }

      return 0;
    });

    return result;
  }, [products, sort, query]);

  const totalPages = useMemo(() => {
    if (perPage === 'all') {
      return 1;
    }

    return Math.ceil(filteredProducts.length / parseInt(perPage, 10));
  }, [filteredProducts.length, perPage]);

  const paginatedProducts = useMemo(() => {
    if (perPage === 'all') {
      return filteredProducts;
    }

    const start = (page - 1) * parseInt(perPage, 10);

    return filteredProducts.slice(start, start + parseInt(perPage, 10));
  }, [filteredProducts, page, perPage]);

  const handleSortChange = useCallback(
    (newSort: SortKey) => {
      const params = new URLSearchParams(searchParams);

      if (newSort === DEFAULT_SORT) {
        params.delete('sort');
      } else {
        params.set('sort', newSort);
      }

      params.delete('page');
      setSearchParams(params, { replace: true });
    },
    [searchParams, setSearchParams],
  );

  const handlePerPageChange = useCallback(
    (newPerPage: PerPageValue) => {
      const params = new URLSearchParams(searchParams);

      if (newPerPage === DEFAULT_PER_PAGE) {
        params.delete('perPage');
      } else {
        params.set('perPage', newPerPage);
      }

      params.delete('page');
      setSearchParams(params, { replace: true });
    },
    [searchParams, setSearchParams],
  );

  const handlePageChange = useCallback(
    (newPage: number) => {
      const params = new URLSearchParams(searchParams);

      if (newPage === 1) {
        params.delete('page');
      } else {
        params.set('page', String(newPage));
      }

      setSearchParams(params, { replace: true });
    },
    [searchParams, setSearchParams],
  );

  const handleQueryChange = useCallback(
    (newQuery: string) => {
      const params = new URLSearchParams(searchParams);

      if (newQuery) {
        params.set('query', newQuery);
      } else {
        params.delete('query');
      }

      params.delete('page');
      setSearchParams(params, { replace: true });
    },
    [searchParams, setSearchParams],
  );

  const handleRetry = useCallback(() => {
    fetchProducts();
  }, [fetchProducts]);

  const showPagination = perPage !== 'all' && totalPages > 1;

  return {
    products: paginatedProducts,
    allProducts: filteredProducts,
    loading,
    error,
    sort,
    page,
    perPage,
    query,
    totalPages,
    totalCount: filteredProducts.length,
    showPagination,
    handleSortChange,
    handlePerPageChange,
    handlePageChange,
    handleQueryChange,
    handleRetry,
    PER_PAGE_OPTIONS,
    SORT_OPTIONS,
  };
}
