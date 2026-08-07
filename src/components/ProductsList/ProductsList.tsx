// .. ProductsList.tsx
import { ProductCard } from '../ProductCard';
import styles from './ProductsList.module.scss';
import type { Product } from '../../types/Product';

interface ProductsListProps {
  products: Product[];
  hasHover?: boolean;
}

export const ProductsList = ({
  products,
  hasHover = true,
}: ProductsListProps) => {
  return (
    <div className={styles.grid}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} hasHover={hasHover} />
      ))}
    </div>
  );
};
