import { ProductCard } from '../ProductCard';
import { Product } from '../../types';
import styles from './ProductsList.module.scss';

interface ProductsListProps {
  products: Product[];
}

export const ProductsList = ({ products }: ProductsListProps) => (
  <div className={styles.list}>
    {products.map(product => (
      <ProductCard key={product.itemId || product.id} product={product} />
    ))}
  </div>
);
