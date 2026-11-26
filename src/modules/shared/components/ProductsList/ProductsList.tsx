import classNames from 'classnames';
import { ProductCard } from '../ProductCard';
import type { Product } from '../../types/Product';
import styles from './ProductsList.module.scss';

interface ProductsListProps {
  products: Product[];
  className?: string;
}

export function ProductsList({
  products,
  className,
}: ProductsListProps): JSX.Element {
  if (products.length === 0) {
    return <div className={styles.empty}>There are no products yet</div>;
  }

  return (
    <div className={classNames(styles.grid, className)} role="list">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
