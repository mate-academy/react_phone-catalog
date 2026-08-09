import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';

import styles from './ProductsGrid.module.scss';

interface Props {
  products: Product[];
}

export const ProductsGrid = ({ products }: Props) => {
  return (
    <div className={styles.grid}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
