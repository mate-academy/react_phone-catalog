import type { Product } from '../../types';
import { ProductCard } from '../ProductCard';
import styles from './ProductList.module.scss';
export function ProductList({ products }: { products: Product[] }) {
  return (
    <div className={styles.grid}>
      {products.map(p => (
        <ProductCard product={p} key={p.id} />
      ))}
    </div>
  );
}
