import { useGetProductsQuery } from './services/productsApi';
import { usePagination } from './hooks/usePagination';
import type { FC } from 'react';
import { Category, Sort } from '../../types';
import { DropdownProvider } from '../shared/providers/DropdownProvider';
import { Dropdown } from '../shared/components/ui/Dropdown/Dropdown';
import { NoResults } from '../shared/components/NoResults';
import { ProductList } from './components/ProductList';
import { Pagination } from '../shared/components/ui/Pagination/Pagination';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { useParams, useSearchParams } from 'react-router-dom';
import { NotFoundPage } from '../NotFoundPage/NotFoundPage';
import { useTranslations } from 'use-intl';
import { ErrorMessage } from '../shared/components/ErrorMessage';

export const ProductsPage: FC = () => {
  const { category } = useParams<{ category: string }>();
  const validCategory = category as Category;

  const { isLoading, isError, refetch } = useGetProductsQuery();
  const {
    visibleProducts,
    totalProducts,
    currentPage,
    visiblePages,
    totalPages,
    setPage,
  } = usePagination(validCategory);

  const [searchParams, setSearchParams] = useSearchParams();
  const t = useTranslations('products');

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams);

    params.set('sort', value);
    params.delete('page');
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

  const tNav = useTranslations('nav');
  const localizedTitle = tNav(validCategory.toLowerCase());

  if (!category || !(Object.values(Category) as string[]).includes(category)) {
    return <NotFoundPage />;
  }

  if (isError) {
    return <ErrorMessage onRetry={refetch} />;
  }

  if (!isLoading && (!visibleProducts || visibleProducts.length < 1)) {
    return (
      <NoResults
        text={t('noResults', {
          category: localizedTitle?.toLowerCase() || validCategory,
        })}
      />
    );
  }

  return (
    <div>
      <Breadcrumbs
        className="mt-6"
        routes={[
          {
            path: '/:category',
            breadcrumb: localizedTitle,
          },
        ]}
      />
      <h1 className="sr-only">{localizedTitle} page</h1>
      <span className="text-h1 text-primary dark:text-d-white mt-6 inline-block sm:mt-10">
        {localizedTitle}
      </span>

      <p className="text-body text-secondary dark:text-d-secondary mt-2">
        {t('modelCount', { count: totalProducts })}
      </p>

      <div className="pageGrid mt-8 gap-y-4 sm:mt-10">
        <DropdownProvider>
          <Dropdown
            id="sort"
            label={t('sortLabel')}
            options={{
              [t('sortOptions.newest')]: Sort.Age,
              [t('sortOptions.alphabetically')]: Sort.Title,
              [t('sortOptions.cheapest')]: Sort.Price,
            }}
            value={searchParams.get('sort') || Sort.Age}
            onChange={handleSortChange}
            className="col-span-2 sm:col-span-4"
          />
          <Dropdown
            id="perPage"
            label={t('perPageLabel')}
            options={{
              4: '4',
              8: '8',
              16: '16',
              [t('perPageOptions.all')]: 'all',
            }}
            value={searchParams.get('perPage') || 'all'}
            onChange={handlePerPageChange}
            className="col-span-2 sm:col-span-3"
          />
        </DropdownProvider>
      </div>

      <ProductList
        products={visibleProducts}
        isLoading={isLoading}
        skeletonCount={8}
        className="mt-6"
      />

      {totalPages > 1 && !isLoading && (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setPage}
          pages={visiblePages}
          totalPages={totalPages}
        />
      )}
    </div>
  );
};
