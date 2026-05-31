import { Product } from '../../types';
import { ProductCard } from '../ProductCard';
import styles from './ProductList.module.scss';

export const ProductList = ({ products }: { products: Product[] }) => (
  <div className={styles.list}>
    {products.map(product => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
);
