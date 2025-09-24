import { useProducts } from '../../hooks/useProducts';
import { Breadcrumbs } from '../Breadcrumbs';
import { EmptyMessage } from '../EmptyMessage';
import { ErrorSmthWentWrong } from '../ErrorSmthWentWrong';
import { FilterAndPagination } from '../FilterAndPagination';
import { Loader } from '../Loader';
import { Pagination } from '../Pagination';
import { ProductGrid } from '../ProductGrid';
import styles from './AccessoriesPage.module.scss';
import { useSearchParams } from 'react-router-dom';

export const AccessoriesPage = () => {
  const { products, loading, error, categoryCounts, reload } =
    useProducts('accessories');

  const [searchParams] = useSearchParams();
  const perPageParam = searchParams.get('perPage') || '16';

  return (
    <div className={styles.accessories}>
      <Breadcrumbs />
      <h1 className={styles.accessories__header}>Accessories</h1>
      <span className={styles.accessories__quantity}>
        {`${categoryCounts.accessories} models`}
      </span>
      <FilterAndPagination />
      {loading && <Loader />}
      {error && <ErrorSmthWentWrong onReload={reload} />}{' '}
      {categoryCounts.accessories === 0 && (
        <EmptyMessage category="accessories" />
      )}
      {!loading && !error && (
        <>
          <ProductGrid products={products} />
          <Pagination
            total={categoryCounts.accessories}
            perPage={perPageParam}
          />
        </>
      )}
    </div>
  );
};
