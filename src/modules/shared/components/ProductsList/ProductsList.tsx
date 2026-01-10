import { Product } from '../../types';
import { ProductCard } from '../ProductCard';
import styles from './ProductsList.module.scss';

interface Props {
  products: Product[];
}

export const ProductsList: React.FC<Props> = ({ products }) => (
  <div className={styles.grid}>
    {products.map(product => (
      <ProductCard key={product.itemId} product={product} />
    ))}
  </div>
);
