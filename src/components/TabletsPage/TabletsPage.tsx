import { useProducts } from '../../hooks/useProducts';
import { Breadcrumbs } from '../Breadcrumbs';
import { EmptyMessage } from '../EmptyMessage';
import { ErrorSmthWentWrong } from '../ErrorSmthWentWrong';
import { FilterAndPagination } from '../FilterAndPagination';
import { Loader } from '../Loader';
import { Pagination } from '../Pagination';
import { ProductGrid } from '../ProductGrid';
import styles from './TabletsPage.module.scss';
import { useSearchParams } from 'react-router-dom';

export const TabletsPage = () => {
  const { products, loading, error, categoryCounts, reload } =
    useProducts('tablets');

  const [searchParams] = useSearchParams();
  const perPageParam = searchParams.get('perPage') || '16';

  return (
    <div className={styles.tablets}>
      <Breadcrumbs />
      <h1 className={styles.tablets__header}>Tablets</h1>
      <span className={styles.tablets__quantity}>
        {`${categoryCounts.tablets} models`}
      </span>
      <FilterAndPagination />
      {loading && <Loader />}
      {error && <ErrorSmthWentWrong onReload={reload} />}{' '}
      {categoryCounts.tablets === 0 && <EmptyMessage category="tablets" />}
      {!loading && !error && (
        <>
          <ProductGrid products={products} />
          <Pagination total={categoryCounts.tablets} perPage={perPageParam} />
        </>
      )}
    </div>
  );
};
