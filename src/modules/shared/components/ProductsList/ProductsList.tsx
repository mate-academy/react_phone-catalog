import { ProductSummary } from '../../types/catalog';
import { ProductCard } from '../ProductCard';
import styles from './ProductsList.module.scss';

interface Props {
  products: ProductSummary[];
}

export const ProductsList = ({ products }: Props) => (
  <div className={styles.grid}>
    {products.map(product => (
      <ProductCard key={product.itemId} product={product} />
    ))}
  </div>
);
