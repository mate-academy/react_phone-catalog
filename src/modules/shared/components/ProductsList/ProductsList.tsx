import classNames from 'classnames';
import { Product } from '../../types/types';
import { ProductCard } from '../ProductCard';
import styles from './ProductsList.module.scss';

type Props = {
  products: Product[];
  className?: string;
};

export const ProductsList: React.FC<Props> = ({ products, className }) => {
  return (
    <ul className={classNames(styles.ProductsList, className)}>
      {products.map(product => (
        <li key={product.id}>
          <ProductCard product={product} className={styles.ProductCard} />
        </li>
      ))}
    </ul>
  );
};
