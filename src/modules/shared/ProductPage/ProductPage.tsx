import { ProductsList } from '../../PhonePage/components/ProductsList';
import { SortProduct } from '../../PhonePage/components/SortProduct/SortProduct';
import styles from './ProductPage.module.scss';
import { Pagination } from '../../PhonePage/components/Pagination';
import { useLocation } from 'react-router-dom';

export const ProductPage = () => {
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
