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
import { Skeleton } from '../../components/Skeleton/Skeleton';
import { filterProducts, SortOptions } from '@/utils/filterProducts';
import { Pagination } from '../shared/components/Pagination/Pagination';
import { usePagination } from '../shared/hooks/usePagination';
import { Category } from '@/types/Category';
import { FC, useMemo } from 'react';
import { CategoryUI } from '../shared/types/CategoryUI';
import { PerPageOption } from '../shared/types/PerPageOption';
import { Message } from '../shared/components/Message';
import { Options } from '@/types/FetchOptions';

interface Props {
  category: Category;
}

const PRODUCT_SKELETONS_COUNT = 16;

export const CatalogPage: FC<Props> = ({ category }) => {
  const [searchParams] = useSearchParams();

  const productCategory = categories.find(
    cat => cat.type === category,
  ) as CategoryUI;

  const {
    data: products,
    loading,
    error,
    handleFetch,
  } = useFetch<Product[]>(
    (options: Options) => getProductsByCategory(productCategory.type, options),
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
      pagesToViewCount: 4,
      scrollToTop: true,
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

  return (
    <div className={classNames('container', styles.wrapper)}>
      <CatalogBreadcrumbs category={productCategory.type} />

      <section>
        <div className={styles.mainPageText}>
          <h1 className={styles.title}>{productCategory.title}</h1>
          {loading ? (
            <Skeleton height="21px" width="75px" />
          ) : (
            <span className={styles.modelsCount}>{products.length} models</span>
          )}
        </div>

        <Filters
          isDisabled={disabledFilters}
          initialPerPage={perPage}
          initialSortOption={sort}
        />
      </section>

      <section>
        {!error ? (
          <ProductsList
            products={preparedProducts}
            isLoading={loading}
            itemsPerPage={PRODUCT_SKELETONS_COUNT}
          />
        ) : (
          <Message
            message={error}
            showRetry
            onRetry={handleFetch}
            className={styles.error}
          />
        )}
      </section>

      <Pagination {...pagination} />
    </div>
  );
};
