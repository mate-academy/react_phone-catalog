import { Product } from '../../types';
import { ProductCard } from '../ProductCard';
import styles from './ProductsList.module.scss';

export const ProductsList = ({ products }: { products: Product[] }) => (
  <ul className={styles['products-list']}>
    {products.map(product => (
      <li key={product.id} className={styles['products-list__item']}>
        <ProductCard product={product} />
      </li>
    ))}
  </ul>
);
