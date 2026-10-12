import type { Product } from '../../shared/types';
import { ProductCard } from '../ProductCard';
import styles from './ProductsList.module.scss';
export function ProductsList({ products }: { products: Product[] }) {
  if (!products.length) {
    return null;
  }

  return (
    <div className={styles.list}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
