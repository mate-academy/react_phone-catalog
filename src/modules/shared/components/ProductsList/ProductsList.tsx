import { Product } from '../../types';
import { ProductCard } from '../ProductCard';
import styles from './ProductsList.module.scss';

type Props = {
  products: Product[] | null;
};

export const ProductsList: React.FC<Props> = ({ products }) => {
  return (
    <div className={styles.productsList}>
      {products?.map(product => (
        <div className={styles.productCard} key={product.id}>
          <ProductCard discount={true} product={product} />
        </div>
      ))}
    </div>
  );
};
