import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import styles from './ProductsList.module.scss';

type Props = {
  products: Product[];
};

export const ProductsList = ({ products }: Props) => {
  return (
    <ul className={styles.list}>
      {products.map(product => (
        <li key={product.id} className={styles.item}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
};
