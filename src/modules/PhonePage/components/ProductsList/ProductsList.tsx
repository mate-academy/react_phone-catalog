import { ProductCard } from '../../../HomePage/components/ProductCard';
import styles from './ProductsLisc.module.scss';

import usePagination from '../../../shared/hooks/usePagination';

export const ProductsList = () => {
  const { createPageProducts } = usePagination();

  return (
    <div className={styles.product}>
      {createPageProducts[0]?.map(phone => (
        <div key={phone.id} className={styles.product__page}>
          <ProductCard phone={phone} />
        </div>
      ))}
    </div>
  );
};
