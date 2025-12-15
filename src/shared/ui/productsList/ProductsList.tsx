import { Product } from '../../types/Product';
import { ProductCard } from '../productCard';
import styles from './ProductsList.module.scss';

type Props = {
  products: Product[];
};

export const ProductsList: React.FC<Props> = ({ products }) => {
  return (
    <div className={styles.wrapper}>
      {products.map(product => (
        <ProductCard product={product} showFullPrice key={product.id} />
      ))}
    </div>
  );
};
