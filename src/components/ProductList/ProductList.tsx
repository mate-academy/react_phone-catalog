import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import styles from './ProductList.module.scss';

type Props = {
  products: Product[];
};
export const ProductsList: React.FC<Props> = ({ products }) => {
  return (
    <div className={styles.productsList}>
      {products.map(product => (
        <ProductCard discount={false} key={product.id} product={product} />
      ))}
    </div>
  );
};
