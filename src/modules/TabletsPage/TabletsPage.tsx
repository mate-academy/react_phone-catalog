import { Pagination } from '../shared/Pagination';
import { HomeBtn } from '../../components/HomeBtn';
import { EmptyMessage } from '../shared/EmptyMessage';
import { ErrorMessage } from '../shared/ErrorMessage';
import { useProducts } from '../shared/hooks/useProducts';
import { Loader } from '../shared/Loader';
import { ProductList } from '../shared/ProductList';
import { SortSelect } from '../shared/SortSelect';
import styles from './TabletsPage.module.scss';
import { useSearchParams } from 'react-router-dom';

export const TabletsPage = () => {
  const { products, loading, error, reload, categoryCounts } =
    useProducts('tablets');

  const [searchParams] = useSearchParams();
  const perPageParam = searchParams.get('perPage') || 'all';

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage onReload={reload} />;
  }

  if (products.length === 0) {
    return <EmptyMessage category="tablets" />;
  }

  return (
    <div className={styles.tablets}>
      <div className={styles.tablets_nav}>
        <HomeBtn />
        <p>Tablets</p>
      </div>
      <h1 className={styles.tablets_header}>Tablets</h1>
      <div
        className={styles.tablets_quantity}
      >{`${categoryCounts.tablets} models`}</div>
      <SortSelect />
      <ProductList products={products} />
      <Pagination total={categoryCounts.tablets} perPage={perPageParam} />
    </div>
  );
};
