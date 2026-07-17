import { Product } from '../../types/Products';
import { ProductCard } from '../ProductCard';
import styles from './ProductsList.styles.module.scss';

type Props = {
  products: Product[];
};

export const ProductsList: React.FC<Props> = ({ products }) => {
  return (
    <div className={styles.products}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
