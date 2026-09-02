import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import styles from './ProductsList.module.scss';

type Props = { products: Product[] };

export const ProductsList: React.FC<Props> = ({ products }) => {
  return (
    <ul className={styles.ProductsListList}>
      {products.map(p => {
        return (
          <li key={p.id}>
            <ProductCard product={p} />
          </li>
        );
      })}
    </ul>
  );
};
