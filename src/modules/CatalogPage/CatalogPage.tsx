import { useFetch } from '../shared/hooks/useFetch';
import { Product } from '@/types/Product';
import { getProductsByCategory } from '@/api/product.service';
import classNames from 'classnames';

import styles from './CatalogPage.module.scss';
import { categories } from '../shared/constants/categories';
import { useSearchParams } from 'react-router-dom';
import { CatalogBreadcrumbs } from './components/CatalogBreadcrumbs';
import { Filters } from './components/Filters';
import { ProductsList } from '../shared/components/ProductsList';
import { Skeleton } from '../shared/components/Skeleton/Skeleton';
import { filterProducts, SortOptions } from '@/utils/filterProducts';
import { Pagination } from '../shared/components/Pagination/Pagination';
import { usePagination } from '../shared/hooks/usePagination';
import { Category } from '@/types/Category';
import { FC, useMemo } from 'react';
import { PerPageOption } from '../shared/types/PerPageOption';
import { FetchOptions } from '@/types/FetchOptions';
import { ErrorMessage } from '../shared/components/ErrorMessage';
import { EmptyMessage } from '../shared/components/EmptyMessage';

interface Props {
  category: Category;
}

const PRODUCT_SKELETONS_COUNT = 16;

export const CatalogPage: FC<Props> = ({ category }) => {
  const [searchParams] = useSearchParams();

  const productCategory = categories.find(cat => cat.type === category);

  const {
    data: products,
    loading,
    error,
    handleFetch,
  } = useFetch<Product[]>(
    (options: FetchOptions) => {
      if (!productCategory) {
        return Promise.resolve([]);
      }

      return getProductsByCategory(productCategory.type, options);
    },
    {
      initialValue: [],
      dependency: [category],
    },
  );

  const sort = (searchParams.get('sort') || 'newest') as SortOptions;
  const perPage = (searchParams.get('perPage') || 'all') as PerPageOption;

  const normilizedPerPage = perPage === 'all' ? products.length : +perPage;

  const pagination = usePagination(
    {
      totalItems: products.length,
      itemsPerPage: normilizedPerPage,
    },
    [sort, perPage],
  );

  const preparedProducts = useMemo(
    () =>
      filterProducts(products, {
        sortOption: sort,
        pageOptions: {
          start: pagination.startIndex,
          end: pagination.endIndex,
        },
      }),
    [products, sort, pagination.startIndex, pagination.endIndex],
  );

  const disabledFilters =
    loading || Boolean(error) || preparedProducts.length === 0;

  if (!productCategory) {
    return null;
  }

  return (
    <div className={classNames('container', styles.wrapper)}>
      <CatalogBreadcrumbs category={productCategory.type} />

      <h1 className={styles.title}>{productCategory.title}</h1>

      <div className={styles.counterWrapper}>
        {loading ? (
          <Skeleton height="21px" width="75px" />
        ) : (
          <span className={styles.modelsCount}>{products.length} models</span>
        )}
      </div>

      <section className={styles.filters}>
        <Filters
          isDisabled={disabledFilters}
          initialPerPage={perPage}
          initialSortOption={sort}
        />
      </section>

      <section className={styles.mainContent}>
        {error && (
          <div className={styles.messageWrapper}>
            <ErrorMessage message={error} onRetry={handleFetch} />
          </div>
        )}

        {!loading && !error && preparedProducts.length === 0 && (
          <div className={styles.messageWrapper}>
            <EmptyMessage
              message={`No ${productCategory.title.toLowerCase()} available`}
            />
          </div>
        )}

        {loading && (
          <ProductsList
            isLoading
            products={[]}
            itemsPerPage={PRODUCT_SKELETONS_COUNT}
          />
        )}

        {preparedProducts.length !== 0 && !loading && (
          <div className={styles.products}>
            <ProductsList
              products={preparedProducts}
              itemsPerPage={PRODUCT_SKELETONS_COUNT}
            />
            <Pagination {...pagination} className={styles.pagination} />
          </div>
        )}
      </section>
    </div>
  );
};
