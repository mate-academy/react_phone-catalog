// #regionImport
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import styles from './ProductsPage.module.scss';
import stylesCard from '@shared/ui/ProductCard/ProductCard.module.scss';

import { sortProducts } from '@shared/utils/sortProducts';
import { usePagination } from '@hooks/usePagination';
import { Pagination } from './components/Pagination';

import {
  SORT_OPTIONS,
  PER_PAGE_OPTIONS,
} from '@modules/ProductsPage/constants/sortOption';
import { Category } from '../../shared/constants/categoryConfig';

import { ProductCard } from '@shared/ui/ProductCard';
import { Dropdown } from '@shared/ui/Dropdown';
import { ErrorMessage } from '@shared/ui/ErrorMessage';
import { PageHeader } from '@shared/ui/PageHeader';
import { ProductsSkeleton } from '@shared/ui/Skeletons/ProductsSkeleton';
import { FadeIn } from '@shared/ui/FadeIn';
import { SearchInput } from './components/SearchInput';
import { useProductSearch } from './hooks/useProductSearch';
import { Typography } from '@shared/ui/Typography';
import { useAppSelector } from '@src/app/hooks';
import { selectProductsByCategory } from '@src/features/products/selectors';

// #endregion

type Props = {
  currentCategory: Category;
  title: string;
  breadcrumb: string;
};

const DEFAULT_SKELETON_COUNT = 8;

export const ProductsPage: React.FC<Props> = ({
  currentCategory,
  title,
  breadcrumb,
}) => {
  const { t } = useTranslation();
  const { isLoading, hasError } = useAppSelector(state => state.products);
  const items = useAppSelector(state =>
    selectProductsByCategory(state, currentCategory),
  );

  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort') || 'age';
  const perPage = searchParams.get('perPage') || 'all';

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams);

    params.set('sort', value);
    setSearchParams(params);
  };

  const handlePerPageChange = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value === 'all') {
      params.delete('perPage');
    } else {
      params.set('perPage', value);
    }

    params.delete('page');
    setSearchParams(params);
  };

  const sortedProducts = sortProducts(items, sort);

  const {
    query,
    filteredProducts,
    handleQueryChange,
    handleClear,
    hasNoResults,
  } = useProductSearch(sortedProducts);

  const getItemsPerPage = () => {
    if (perPage !== 'all') {
      return +perPage;
    }

    return isLoading ? DEFAULT_SKELETON_COUNT : sortedProducts.length;
  };

  const itemsPerPage = getItemsPerPage();

  const {
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    goToPage,
    startIndex,
    endIndex,
    isFirst,
    isLast,
  } = usePagination(filteredProducts.length, itemsPerPage);

  const visibleProducts = filteredProducts.slice(startIndex, endIndex);

  return (
    <FadeIn>
      <div className={styles.productsPage}>
        <PageHeader
          title={t(title)}
          breadcrumbs={[{ label: t(breadcrumb) }]}
          subtitle={`${visibleProducts.length} ${t('models.model', { count: visibleProducts.length })}`}
        />

        <Dropdown
          label={t('dropdown.sortBy')}
          value={sort}
          onChange={handleSortChange}
          options={SORT_OPTIONS}
          className={styles.productsPageFiltersSort}
        />

        <Dropdown
          label={t('dropdown.itemsOnPage')}
          value={perPage}
          onChange={handlePerPageChange}
          options={PER_PAGE_OPTIONS}
          className={styles.productsPageFiltersPerPage}
        />

        <SearchInput
          query={query}
          onChange={handleQueryChange}
          onClear={handleClear}
        />

        {hasNoResults && !isLoading && (
          <FadeIn className={styles.productsNoMatching}>
            <Typography variant="h2">{t('noResults.message')}</Typography>
          </FadeIn>
        )}

        {!isLoading && hasError && <ErrorMessage />}

        {isLoading && <ProductsSkeleton itemsPerPage={itemsPerPage} />}

        {!isLoading && !hasError && !hasNoResults && items.length > 0 && (
          <FadeIn key={currentPage} className={styles.productsPageList}>
            {visibleProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                className={stylesCard.cardProductsPage}
              />
            ))}
          </FadeIn>
        )}

        <div className={styles.productsPagePagination}>
          {perPage !== 'all' && !hasError && !hasNoResults && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={goToPage}
              onNext={nextPage}
              onPrev={prevPage}
              isFirst={isFirst}
              isLast={isLast}
            />
          )}
        </div>
      </div>
    </FadeIn>
  );
};
