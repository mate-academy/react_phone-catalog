import { ProductsList } from '../ProductsList';
import { SortProduct } from '../SortProduct/SortProduct';
import styles from './PhonePage.module.scss';
import { Pagination } from '../Pagination';
import { useLocation } from 'react-router-dom';

export const PhonePage = () => {
  const { search } = useLocation();
  const findPage = search.split('&').find(item => item.includes('page'));

  return (
    <div className={styles.container}>
      <SortProduct />
      <ProductsList />
      {findPage && <Pagination />}
    </div>
  );
};
