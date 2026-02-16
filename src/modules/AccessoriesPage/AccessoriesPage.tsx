import { Pagination } from '../shared/Pagination';
import { HomeBtn } from '../../components/HomeBtn';
import { EmptyMessage } from '../shared/EmptyMessage';
import { ErrorMessage } from '../shared/ErrorMessage';
import { useProducts } from '../shared/hooks/useProducts';
import { Loader } from '../shared/Loader';
import { ProductList } from '../shared/ProductList';
import { SortSelect } from '../shared/SortSelect';
import styles from './AccessoriesPage.module.scss';
import { useSearchParams } from 'react-router-dom';

export const AccessoriesPage = () => {
  const { products, loading, error, reload, categoryCounts } =
    useProducts('accessories');

  const [searchParams] = useSearchParams();
  const perPageParam = searchParams.get('perPage') || 'all';

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage onReload={reload} />;
  }

  if (products.length === 0) {
    return <EmptyMessage category="accessories" />;
  }

  return (
    <div className={styles.accessories}>
      <div className={styles.accessories_nav}>
        <HomeBtn />
        <p>Accessories</p>
      </div>
      <h1 className={styles.accessories_header}>Accessories</h1>
      <div
        className={styles.accessories_quantity}
      >{`${categoryCounts.accessories} models`}</div>
      <SortSelect />
      <ProductList products={products} />
      <Pagination total={categoryCounts.accessories} perPage={perPageParam} />
    </div>
  );
};
