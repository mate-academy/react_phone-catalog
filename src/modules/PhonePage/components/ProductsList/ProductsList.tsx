import { ProductCard } from '../../../HomePage/components/ProductCard';
import styles from './ProductsLisc.module.scss';

import usePagination from '../../../shared/hooks/usePagination';
import { useLocation } from 'react-router-dom';
import { Loader } from '../../../shared/Loader';
import { useAppSelector } from '../../../shared/hooks/hooks';
import usePageLocation from '../../../shared/hooks/usePageLocation';

export const ProductsList = () => {
  const { loading, error } = useAppSelector(state => state.product);
  const { createPageProducts } = usePagination();
  const { search } = useLocation();
  const { pageLocation } = usePageLocation();

  const findPage = search
    .split('&')
    .find(item => item.includes('page'))
    ?.slice(5);

  const numberPage = findPage ? +findPage - 1 : 0;

  return (
    <>
      {loading && <Loader />}
      {error && <h1>{`${pageLocation} Accessories page`}</h1>}
      <div className={styles.product}>
        {createPageProducts[+numberPage]?.map(phone => (
          <div key={phone.id} className={styles.product__page}>
            <ProductCard phone={phone} />
          </div>
        ))}
      </div>
    </>
  );
};
