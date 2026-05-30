import ProductCard from '../ProductCard';
import { Product } from '../../types/Product';
import styles from './ProductsList.module.scss';

interface ProductsListProps {
  products: Product[];
}

export default function ProductsList({ products }: ProductsListProps) {
  return (
    <div className={styles.productsList}>
      {products.map(product => (
        <ProductCard key={product.itemId} product={product} />
      ))}
    </div>
  );
}
