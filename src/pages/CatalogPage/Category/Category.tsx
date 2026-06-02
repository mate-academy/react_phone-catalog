import styles from './Category.module.scss';
import { ProductCard } from '../../../components/ProductCard';
import { Product } from '../../../types/Product';

type Props = {
  products: Product[];
};

export const Category = ({ products }: Props) => {
  return (
    <div className={styles.phones}>
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          className={styles['catalog-card']}
        />
      ))}
    </div>
  );
};
