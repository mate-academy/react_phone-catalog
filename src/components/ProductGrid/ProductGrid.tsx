import styles from './ProductGrid.module.scss';
import { ProductCard } from '../ProductCard/ProductCard';
import { Product } from '../../types/Product';

export const ProductGrid: React.FC<{ products: Product[] }> = ({
  products,
}) => (
  <div className={styles.grid}>
    {products.map(product => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
);
