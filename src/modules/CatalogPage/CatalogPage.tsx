import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container } from '../../components/Container';
import { Button } from '../shared/components/Button';
import { EmptyState } from '../shared/components/EmptyState';
import { Pagination } from '../shared/components/Pagination';
import { ProductsList } from '../shared/components/ProductsList';
import { getProductsByCategory } from '../shared/api/products';
import { useDebounce } from '../shared/hooks/useDebounce';
import { useSearchConfig } from '../shared/context/SearchContext';
import { Category, Product, SortBy } from '../shared/types';
import { CatalogSkeleton } from './components/CatalogSkeleton';
import { FilterBar } from './components/FilterBar';
import styles from './CatalogPage.module.scss';

interface Props {
  category: Category;
  title: string;
}

const DEFAULT_SORT: SortBy = 'age';
const DEFAULT_PER_PAGE = 8;
const PER_PAGE_OPTIONS: Array<number | 'all'> = [4, 8, 16, 'all'];

export const CatalogPage: React.FC<Props> = ({ category, title }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('query') || '');
  const debouncedQuery = useDebounce(query, 400);

  const sort = (searchParams.get('sort') as SortBy) || DEFAULT_SORT;
  const perPageParam = searchParams.get('perPage');
  let perPage: number | 'all' = DEFAULT_PER_PAGE;

  if (perPageParam === 'all') {
    perPage = 'all';
  } else if (perPageParam) {
    const perPageValue = Number(perPageParam);

    perPage =
      Number.isFinite(perPageValue) && perPageValue > 0
        ? perPageValue
        : DEFAULT_PER_PAGE;
  }

  const page = Number(searchParams.get('page') || 1);

  useEffect(() => {
    setQuery(searchParams.get('query') || '');
  }, [searchParams]);

  const searchConfig = useMemo(
    () => ({
      visible: true,
      value: query,
      placeholder: `Search ${category}`,
      onChange: setQuery,
    }),
    [category, query],
  );

  useSearchConfig(searchConfig);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);
      const data = await getProductsByCategory(category);

      setProducts(data);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const updateSearchParams = useCallback(
    (updates: {
      sort?: SortBy;
      page?: number;
      perPage?: number | 'all';
      query?: string;
    }) => {
      const params = new URLSearchParams(searchParams);

      if (updates.sort) {
        if (updates.sort === DEFAULT_SORT) {
          params.delete('sort');
        } else {
          params.set('sort', updates.sort);
        }
      }

      if (updates.perPage !== undefined) {
        if (updates.perPage !== 'all' && updates.perPage === DEFAULT_PER_PAGE) {
          params.delete('perPage');
        } else {
          params.set('perPage', String(updates.perPage));
        }
      }

      if (updates.page !== undefined) {
        if (!updates.page || updates.page === 1) {
          params.delete('page');
        } else {
          params.set('page', String(updates.page));
        }
      }

      if (updates.query !== undefined) {
        if (!updates.query.trim()) {
          params.delete('query');
        } else {
          params.set('query', updates.query.trim());
        }
      }

      setSearchParams(params);
    },
    [searchParams, setSearchParams],
  );

  useEffect(() => {
    const currentQuery = searchParams.get('query') || '';
    const normalized = debouncedQuery.trim();

    if (currentQuery === normalized) {
      return;
    }

    updateSearchParams({ query: debouncedQuery, page: 1 });
  }, [debouncedQuery, searchParams, updateSearchParams]);

  const sorted = useMemo(() => {
    const normalizedQuery = debouncedQuery.trim().toLowerCase();
    const matchesQuery = (product: Product) =>
      product.name.toLowerCase().includes(normalizedQuery);
    const filtered = normalizedQuery ? products.filter(matchesQuery) : products;

    return [...filtered].sort((a, b) => {
      switch (sort) {
        case 'price':
          return a.price - b.price;
        case 'title':
          return a.name.localeCompare(b.name);
        case 'age':
        default:
          return b.year - a.year;
      }
    });
  }, [products, sort, debouncedQuery]);

  const total = sorted.length;
  const totalPages =
    perPage === 'all' ? 1 : Math.max(1, Math.ceil(total / perPage));
  const currentPage = Math.min(Math.max(page, 1), totalPages);

  const visibleProducts =
    perPage === 'all'
      ? sorted
      : sorted.slice((currentPage - 1) * perPage, currentPage * perPage);

  const hasQuery = Boolean(debouncedQuery.trim());

  function handlePageChange(pageNumber: number) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    updateSearchParams({ page: pageNumber });
  }

  return (
    <Container className={styles.page}>
      {loading ? (
        <CatalogSkeleton perPage={perPage} />
      ) : (
        <>
          <FilterBar
            sort={sort}
            onSortChange={value => updateSearchParams({ sort: value, page: 1 })}
            perPage={perPage}
            perPageOptions={PER_PAGE_OPTIONS}
            onPerPageChange={value =>
              updateSearchParams({ perPage: value, page: 1 })
            }
            total={total}
            title={title}
          />

          {error && (
            <EmptyState
              title="Something went wrong"
              description="We could not load the products."
              action={
                <Button onClick={fetchProducts} variant="primary">
                  Reload
                </Button>
              }
            />
          )}

          {!error && (
            <>
              {visibleProducts.length ? (
                <>
                  <ProductsList products={visibleProducts} />
                  <Pagination
                    total={total}
                    perPage={perPage}
                    currentPage={currentPage}
                    onPageChange={pageNumber => handlePageChange(pageNumber)}
                    onPerPageChange={nextPerPage =>
                      updateSearchParams({ perPage: nextPerPage, page: 1 })
                    }
                    showPerPage={false}
                  />
                </>
              ) : (
                <EmptyState
                  title={
                    hasQuery
                      ? `There are no ${category} matching the query`
                      : `There are no ${category} yet`
                  }
                />
              )}
            </>
          )}
        </>
      )}
    </Container>
  );
};
