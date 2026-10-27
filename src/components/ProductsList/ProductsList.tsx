import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';

import styles from './ProductsList.module.scss';

type Props = {
  products: Product[];
  limitedDiscounts?: boolean;
};

export const ProductsList = ({ products, limitedDiscounts = false }: Props) => {
  return (
    <div className={styles.products}>
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          limitedDiscounts={limitedDiscounts}
        />
      ))}
    </div>
  );
};
