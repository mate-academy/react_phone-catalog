import type { Product } from '../../types/product';
import { ProductCard } from '../ProductCard';
import styles from './ProductsList.module.scss';

type Props = {
  products: Product[];
};

export const ProductsList = ({ products }: Props) => (
  <ul className={styles.list}>
    {products.map(product => (
      <li key={product.id}>
        <ProductCard product={product} />
      </li>
    ))}
  </ul>
);
