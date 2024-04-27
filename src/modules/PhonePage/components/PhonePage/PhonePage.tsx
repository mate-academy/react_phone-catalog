import { ProductsList } from '../ProductsList';
import { SortProduct } from '../SortProduct/SortProduct';
import styles from './PhonePage.module.scss';
import { Pagination } from '../Pagination';

export const PhonePage = () => {
  return (
    <div className={styles.container}>
      <SortProduct />
      <ProductsList />
      <Pagination />
    </div>
  );
};
