import { Product } from '../../types';
import { ProductCard } from '../ProductCard';
import styles from './ProductList.module.scss';

type Props = {
  products: Product[];
};

export const ProductList = ({ products }: Props) => {
  return (
    <div className={styles.grid}>
      {products.map(product => (
        <ProductCard key={product.itemId} product={product} />
      ))}
    </div>
  );
};
