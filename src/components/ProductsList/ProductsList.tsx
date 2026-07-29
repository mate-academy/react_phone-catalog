import { Product } from '@/types/Product';
import { ProductCard } from '@/components/ProductCard';
import styles from './ProductsList.module.scss';

type Props = {
  products: Product[];
};

export const ProductsList = ({ products }: Props) => (
  <ul className={styles.list}>
    {products.map(product => (
      <li key={product.itemId} className={styles.item}>
        <ProductCard product={product} />
      </li>
    ))}
  </ul>
);
