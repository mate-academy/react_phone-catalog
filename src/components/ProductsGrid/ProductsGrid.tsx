import { Product } from '../../types/Product';
// eslint-disable-next-line max-len
import { ProductCardDiscount } from '../ProductCardDiscount/ProductCardDiscount';
import styles from './ProductsGrid.module.scss';

type Props = {
  products: Product[];
};

export const ProductsGrid: React.FC<Props> = ({ products }) => {
  return (
    <div className={styles.grid}>
      {products.map(product => (
        <div key={product.id} className={styles.grid__item}>
          <ProductCardDiscount product={product} />
        </div>
      ))}
    </div>
  );
};
