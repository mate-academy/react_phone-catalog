import styles from './Grid.module.scss';
import { Product } from '../../../../types/Product';
import { ProductCard } from '../../../../components/ProductCard';

interface Props {
  products: Product[];
}

export const Grid: React.FC<Props> = ({ products }) => {
  return (
    <ul className={styles.grid}>
      {products.map(product => {
        return (
          <li className={styles.grid__item} key={product.id}>
            <ProductCard product={product} />
          </li>
        );
      })}
    </ul>
  );
};
