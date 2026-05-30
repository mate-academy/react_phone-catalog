import { Pagination } from '../shared/Pagination';
import { HomeBtn } from '../../components/HomeBtn';
import { EmptyMessage } from '../shared/EmptyMessage';
import { ErrorMessage } from '../shared/ErrorMessage';
import { useProducts } from '../shared/hooks/useProducts';
import { Loader } from '../shared/Loader';
import { ProductList } from '../shared/ProductList';
import { SortSelect } from '../shared/SortSelect';
import styles from './PhonesPage.module.scss';
import { useSearchParams } from 'react-router-dom';

export const PhonesPage = () => {
  const { products, loading, error, reload, categoryCounts } =
    useProducts('phones');

  const [searchParams] = useSearchParams();
  const perPageParam = searchParams.get('perPage') || 'all';

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage onReload={reload} />;
  }

  if (products.length === 0) {
    return <EmptyMessage category="phones" />;
  }

  return (
    <div className={styles.phones}>
      <div className={styles.phones_nav}>
        <HomeBtn />
        <p>Phones</p>
      </div>
      <h1 className={styles.phones_header}>Mobile Phones</h1>
      <div
        className={styles.phones_quantity}
      >{`${categoryCounts.phones} models`}</div>
      <SortSelect />
      <ProductList products={products} />
      <Pagination total={categoryCounts.phones} perPage={perPageParam} />
    </div>
  );
};
