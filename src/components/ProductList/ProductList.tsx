import { Product } from '../../types/catalog';
import { ProductCard } from '../ProductCard';
import styles from './ProductList.module.scss';

export const ProductList = ({ products }: { products: Product[] }) => (
  <div className={styles.grid}>
    {products.map(product => (
      <ProductCard key={product.itemId} product={product} />
    ))}
  </div>
);
