import type { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';

import styles from './ProductsList.module.scss';

type Props = {
  products: Product[];
};

export const ProductsList = ({ products }: Props) => {
  return (
    <div
      className={styles.list}
      data-products-list
      role="list"
      aria-label="Products"
    >
      {products.map(product => (
        <div key={product.id} className={styles.item} role="listitem">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};
