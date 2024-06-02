import { ProductsList } from '../../PhonePage/components/ProductsList';
// eslint-disable-next-line max-len
import { SortProduct } from '../../PhonePage/components/SortProduct/SortProduct';
import styles from './ProductPage.module.scss';
import { useLocation } from 'react-router-dom';
import usePagination from '../hooks/usePagination';
import { Pagination } from '../Pagination';

export const ProductPage = () => {
  const { search } = useLocation();
  const findPage = search.split('&').find(item => item.includes('page'));
  const { createPageProducts } = usePagination();
  const isPagination = findPage && createPageProducts.length >= 2;

  return (
    <div className={styles.container}>
      <SortProduct />
      <ProductsList />
      {isPagination && <Pagination />}
    </div>
  );
};
