import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import PageHeader from '../../shared/components/PageHeader/PageHeader';
import { Product } from '@/types/Product';
import { CardSkeleton } from '../../features/home/components/SliderItem/CardSkeleton';
import { CustomSelect } from '../../shared/ui/CustomSelect/CustomSelect';
import { PaginationComponent } from '../../shared/ui/PaginationComponent/PaginationComponent';
import { getProducts } from '@/shared/api/api';
import {
  DEFAULT_PER_PAGE,
  perPageOptions,
} from '@/shared/constants/pageOptions';
import { sortOptions } from '@/shared/constants/sortOptions';
import { ProductsList } from '../../features/product/components/ProductList/ProductList';
import NotFoundPage from '@/pages/NotFound/NotFoundPage';
import styles from './CatalogPage.module.scss';

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

  const sortParam = searchParams.get('sort') || '';
  const perPageParam =
    searchParams.get('perPage') || DEFAULT_PER_PAGE.toString();
  const currentPage = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    setLoading(true);
    getProducts()
      .then(setProducts)
      .catch(() => setError('Something went wrong'))
      .finally(() => setLoading(false));
  }, []);

  const processedData = useMemo(() => {
    let visibleList = [...products];

    visibleList = visibleList.filter(
      p => p && p.id && Object.keys(p).length > 0,
    );

    if (category) {
      visibleList = visibleList.filter(
        p => p.category.toLowerCase() === category.toLowerCase(),
      );
    }

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

  const totalCount = processedData.length;
  const isAll = perPageParam === 'all';
  const perPageNumber = isAll ? totalCount : Number(perPageParam);

  const paginatedProducts = useMemo(() => {
    if (isAll) {
      return processedData;
    }

    const start = (currentPage - 1) * perPageNumber;

    return processedData.slice(start, start + perPageNumber);
  }, [processedData, currentPage, perPageNumber, isAll]);

  useEffect(() => {
    if (!isValidCategory) {
      return;
    }

    if (searchParams.has('page') || searchParams.has('sort')) {
      const newParams = new URLSearchParams(searchParams);

      newParams.delete('page');
      newParams.delete('sort');
      newParams.delete('perPage');
      setSearchParams(newParams);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [category]);

  const handleSortChange = (value: string | null) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set('sort', value);
    } else {
      params.delete('sort');
    }

    params.delete('page');
    setSearchParams(params);
  };

  const handlePerPageChange = (value: string | null) => {
    const params = new URLSearchParams(searchParams);

    if (value && value !== DEFAULT_PER_PAGE.toString()) {
      params.set('perPage', value);
    } else {
      params.delete('perPage');
    }

    params.delete('page');
    setSearchParams(params);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);

    if (newPage === 1) {
      params.delete('page');
    } else {
      params.set('page', String(newPage));
    }

    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isValidCategory) {
    return <NotFoundPage />;
  }

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
