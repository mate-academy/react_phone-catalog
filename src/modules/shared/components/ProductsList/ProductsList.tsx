import { Product } from '@shared/types';
import { ProductCard } from '@shared/components/ProductCard';
import styles from './ProductsList.module.scss';

interface Props {
  products: Product[];
}

export const ProductsList: React.FC<Props> = ({ products }) => (
  <ul className={styles.list}>
    {products.map(product => (
      <li key={product.id} className={styles.item}>
        <ProductCard product={product} showDiscount />
      </li>
    ))}
  </ul>
);
