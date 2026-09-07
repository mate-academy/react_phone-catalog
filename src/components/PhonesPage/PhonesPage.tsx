import { useProducts } from '../../hooks/useProducts';
import { Breadcrumbs } from '../Breadcrumbs';
import { EmptyMessage } from '../EmptyMessage';
import { ErrorSmthWentWrong } from '../ErrorSmthWentWrong';
import { FilterAndPagination } from '../FilterAndPagination';
import { Loader } from '../Loader';
import { Pagination } from '../Pagination';
import { ProductGrid } from '../ProductGrid';
import styles from './PhonesPage.module.scss';
import { useSearchParams } from 'react-router-dom';

export const PhonesPage = () => {
  const { products, loading, error, categoryCounts, reload } =
    useProducts('phones');

  const [searchParams] = useSearchParams();
  const perPageParam = searchParams.get('perPage') || '16';

  return (
    <div className={styles.phones}>
      <Breadcrumbs />
      <h1 className={styles.phones__header}>Mobile phones</h1>
      <span className={styles.phones__quantity}>
        {`${categoryCounts.phones} models`}
      </span>
      <FilterAndPagination />
      {loading && <Loader />}
      {error && <ErrorSmthWentWrong onReload={reload} />}{' '}
      {categoryCounts.phones === 0 && <EmptyMessage category="phones" />}
      {!loading && !error && (
        <>
          <ProductGrid products={products} />
          <Pagination total={categoryCounts.phones} perPage={perPageParam} />
        </>
      )}
    </div>
  );
};
