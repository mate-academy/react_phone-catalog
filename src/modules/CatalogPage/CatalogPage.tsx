import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Product } from '@/types/Product';
import { getProducts } from '@/api/api';
import { ProductList } from '@/modules/shared/components/ProductList';
import { Pagination } from '@/modules/shared/ui/Pagination';
import { Heading } from '@/modules/shared/ui/Heading';
import { Breadcrumbs } from '@/modules/shared/ui/Breadcrumbs';
import styles from './CatalogPage.module.scss';
import { CatalogFilters } from '@/modules/CatalogPage/components/CatalogFilter';
import { NotFoundPage } from '../NotFoundPage';
import { Skeleton } from '@/components/Skelton';
import { useTranslation } from 'react-i18next';

// Valid categories for routing guard
const validCategories = ['phones', 'tablets', 'accessories'];

export const CatalogPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFiltering, setIsFiltering] = useState(false);
  const { t } = useTranslation();

  // --- DATA FETCHING ---
  // Fetches products from API and filters them by the current URL category
  useEffect(() => {
    setIsLoading(true);

    getProducts()
      .then(data => {
        const filtered = data.filter(p => p.category === category);

        setProducts(filtered);
      })
      // eslint-disable-next-line no-console
      .catch(err => console.error(err))
      .finally(() => {
        setTimeout(() => setIsLoading(false), 300);
      });
  }, [category]);

  // --- READING URL PARAMETERS ---
  // Default values are used if parameters are missing from the URL
  const sort = searchParams.get('sort') || 'age';
  const perPage = searchParams.get('perPage') || 'all';
  const currentPage = Number(searchParams.get('page')) || 1;

  // --- SORTING LOGIC ---
  // Returns a new sorted array based on the chosen criteria (title, price, or year)
  const sortedProducts = [...products].sort((a, b) => {
    switch (sort) {
      case 'title':
        return a.name.localeCompare(b.name);
      case 'cheapest':
        return a.price - b.price;
      case 'age':
      default:
        return b.year - a.year;
    }
  });

  // --- PAGINATION CALCULATIONS ---
  // Determines which slice of the sorted array should be displayed
  const isAll = perPage === 'all';
  const itemsPerPage = isAll ? sortedProducts.length : Number(perPage);

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentProducts = sortedProducts.slice(firstItemIndex, lastItemIndex);

  // --- URL UPDATE FUNCTION ---
  // Synchronizes filter/pagination state with URL search parameters
  const updateParams = (newValues: Record<string, string | number>) => {
    setIsFiltering(true);

    const params = new URLSearchParams(searchParams);

    Object.entries(newValues).forEach(([key, value]) => {
      if (
        (key === 'sort' && value === 'age') ||
        (key === 'perPage' && value === 'all') ||
        (key === 'page' && value === 1)
      ) {
        params.delete(key);
      } else {
        params.set(key, value.toString());
      }
    });

    // Reset to page 1 when sort or perPage changes (unless explicitly setting page)
    if (!newValues.hasOwnProperty('page')) {
      params.delete('page');
    }

    setSearchParams(params);

    setTimeout(() => {
      setIsFiltering(false);
    }, 300);
  };

  // --- CONDITIONAL RENDERING LOGIC ---
  const shouldShowPagination = !isAll && sortedProducts.length > itemsPerPage;
  const showLoader = isLoading || isFiltering;

  // Dynamic title based on category translation
  const displayTitle = category
    ? t(`categories.${category.toLowerCase()}`)
    : t('nav.catalog');

  if (category && !validCategories.includes(category)) {
    return <NotFoundPage />;
  }

  // Skelton
  const skeletonCount = perPage === 'all' ? 12 : Number(perPage);

  return (
    <section className={styles.catalog}>
      <div className={styles.catalog__container}>
        <Breadcrumbs category={category} />

        <Heading as="h1" className={styles.catalog__title}>
          {displayTitle}
        </Heading>
        <p className={styles.catalog__count}>
          {t('catalog.modelsCount', { count: products.length })}
        </p>

        <CatalogFilters
          sort={sort}
          perPage={perPage}
          onSortChange={val => updateParams({ sort: val })}
          onPerPageChange={val => updateParams({ perPage: val })}
        />

        {showLoader ? (
          <div className={styles.loaderGrid}>
            {Array.from({ length: skeletonCount }).map((_, index) => (
              <div key={index} className={styles.loaderGrid__item}>
                <Skeleton />
              </div>
            ))}
          </div>
        ) : (
          <>
            <ProductList products={currentProducts} />

            {shouldShowPagination && (
              <Pagination
                total={sortedProducts.length}
                perPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={newPage => {
                  updateParams({ page: newPage });
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}
          </>
        )}
      </div>
    </section>
  );
};
