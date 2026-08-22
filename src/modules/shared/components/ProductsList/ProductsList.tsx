import { Product } from '../../../../types/Product';
import { ProductCard } from '../ProductCard';
import styles from './ProductsList.module.scss';

type Props = {
  products: Product[];
};

export const ProductsList: React.FC<Props> = ({ products }) => (
  <ul className={styles.list}>
    {products.map(product => (
      <li key={product.id} className={styles.list__item}>
        <ProductCard product={product} />
      </li>
    ))}
  </ul>
);
