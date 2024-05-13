import { useLocation } from 'react-router-dom';
import { ProductsList } from '../../../PhonePage/components/ProductsList';
// eslint-disable-next-line max-len
import { SortProduct } from '../../../PhonePage/components/SortProduct/SortProduct';
import styles from './TabletsPage.module.scss';
import { Pagination } from '../../../PhonePage/components/Pagination';

export const TabletsPage = () => {
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
