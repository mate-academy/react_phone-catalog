import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import PageHeader from '../PageHeader/PageHeader';
import { Product } from '@/types/Product';
import { CardSkeleton } from '../SliderItem/CardSkeleton';
import { CustomSelect } from '../CustomSelect/CustomSelect';
import { PaginationComponent } from '../PaginationComponent/PaginationComponent';
import { getProducts } from '@/api/api';
import {
  DEFAULT_PER_PAGE,
  perPageOptions,
  sortOptions,
} from '../utils/constants/constants';
import { ProductsList } from '../ProductList/ProductList';
import NotFoundPage from '@/modules/NotFoundPage/NotFoundPage';
import styles from './CatalogPage.module.scss';

// Helper to format titles (moved outside component to prevent recreation)
const formatTitle = (category: string = ''): string => {
  const titles: Record<string, string> = {
    phones: 'Phones page',
    tablets: 'Tablets page',
    accessories: 'Accessories page',
  };
  return titles[category] || 'Products';
};

export const CatalogPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const { category } = useParams();

  const allowedCategories = ['phones', 'tablets', 'accessories'];
  const isValidCategory = allowedCategories.includes(category || '');

  // --- 1. DERIVE STATE FROM URL (Single Source of Truth) ---
  // No useState needed for these!
  const sortParam = searchParams.get('sort') || '';
  const perPageParam =
    searchParams.get('perPage') || DEFAULT_PER_PAGE.toString();
  const currentPage = Number(searchParams.get('page')) || 1;

  // --- 2. DATA FETCHING ---
  // Fetch ONLY once on mount. We don't need to refetch on sort/filter change.
  useEffect(() => {
    setLoading(true);
    getProducts()
      .then(setProducts)
      .catch(() => setError('Something went wrong'))
      .finally(() => setLoading(false));
  }, []);

  // --- 3. FILTERING & SORTING (Memoized) ---
  const processedData = useMemo(() => {
    let visibleList = [...products];

    // 1. SANITIZE: Remove empty objects or nulls immediately
    // Adjust logic based on what "empty" means to your API (e.g., !p.id, !p.name, etc.)
    visibleList = visibleList.filter(
      p => p && p.id && Object.keys(p).length > 0,
    );

    // 2. Filter by Category
    if (category) {
      visibleList = visibleList.filter(
        p => p.category.toLowerCase() === category.toLowerCase(),
      );
    }

    // 3. Sort
    if (sortParam) {
      visibleList.sort((a, b) => {
        switch (sortParam) {
          case 'age':
            return b.year - a.year;
          case 'title':
            return a.name.localeCompare(b.name);
          case 'price':
            return a.price - b.price;
          default:
            return 0;
        }
      });
    }

    return visibleList;
  }, [products, category, sortParam]);

  // --- 4. PAGINATION LOGIC ---
  const totalCount = processedData.length;
  const isAll = perPageParam === 'all';
  const perPageNumber = isAll ? totalCount : Number(perPageParam);

  const paginatedProducts = useMemo(() => {
    if (isAll) return processedData;
    const start = (currentPage - 1) * perPageNumber;
    return processedData.slice(start, start + perPageNumber);
  }, [processedData, currentPage, perPageNumber, isAll]);

  // --- 5. EFFECTS ---
  // Reset pagination/sort when CATEGORY changes
  useEffect(() => {
    if (!isValidCategory) return;

    // Check if we need to clean URL (only if sort/page exists)
    if (searchParams.has('page') || searchParams.has('sort')) {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete('page');
      newParams.delete('sort');
      newParams.delete('perPage');
      setSearchParams(newParams);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [category]); // Only runs when category changes in URL

  // --- 6. HANDLERS ---
  const handleSortChange = (value: string | null) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set('sort', value);
    else params.delete('sort');

    params.delete('page'); // Reset to page 1
    setSearchParams(params);
  };

  const handlePerPageChange = (value: string | null) => {
    const params = new URLSearchParams(searchParams);
    if (value && value !== DEFAULT_PER_PAGE.toString()) {
      params.set('perPage', value);
    } else {
      params.delete('perPage');
    }

    params.delete('page'); // Reset to page 1
    setSearchParams(params);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    if (newPage === 1) params.delete('page');
    else params.set('page', String(newPage));

    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- RENDER ---
  if (!isValidCategory) return <NotFoundPage />;

  const shouldShowPagination = !loading && !error && totalCount > perPageNumber;
  const pageTitle = formatTitle(category);

  return (
    <div className={styles.catalog}>
      <PageHeader title={pageTitle} variant="catalogPage" />

      <div className={styles.catalog__modelsCount}>{totalCount} models</div>

      <div className={styles.catalog__controls}>
        <CustomSelect
          label="Sort by"
          options={sortOptions}
          onChange={handleSortChange}
          value={sortParam}
        />

        <CustomSelect
          label="Items per page"
          value={perPageParam}
          onChange={handlePerPageChange}
          options={perPageOptions}
        />
      </div>

      {error && (
        <div className={styles.catalog__error}>
          <p>Something went wrong</p>
          <button onClick={() => window.location.reload()}>Reload</button>
        </div>
      )}

      {!error && (
        <>
          {loading ? (
            <div className={styles.catalog__container}>
              {Array(8)
                .fill(null)
                .map((_, i) => (
                  <CardSkeleton key={i} />
                ))}
            </div>
          ) : paginatedProducts.length === 0 ? (
            <div className={styles.catalog__empty}>
              {`There are no ${category} yet`}
            </div>
          ) : (
            <>
              <div
                className={`${styles.catalog__container} ${
                  shouldShowPagination
                    ? styles['catalog__container--hasPagination']
                    : styles['catalog__container--noPagination']
                }`}
              >
                <ProductsList products={paginatedProducts} />
              </div>

              {shouldShowPagination && (
                <PaginationComponent
                  totalCount={totalCount}
                  perPage={perPageNumber}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};
