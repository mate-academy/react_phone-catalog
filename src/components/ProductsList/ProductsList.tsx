import styles from './ProductsList.module.scss';

import { ProductCard } from '../ProductCard';
import { Product } from '../../types/Product';

type Props = {
  products: Product[];
  hasDiscount?: boolean;
};

export const ProductsList: React.FC<Props> = ({
  products,
  hasDiscount = false,
}) => {
  return (
    <div className={styles.productsList}>
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          hasDiscount={hasDiscount}
        />
      ))}
    </div>
  );
};
