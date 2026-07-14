import { ProductCard } from '../ProductCard';
import { Product } from '../../types/Product';
import styles from './ProductList.module.scss';

interface Props {
  products: Product[];
}

export const ProductList: React.FC<Props> = ({ products }) => {
  return (
    <div className={styles['product-list']}>
      {products.map(product => (
        <div className={styles['product-list__item']} key={product.id}>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};
