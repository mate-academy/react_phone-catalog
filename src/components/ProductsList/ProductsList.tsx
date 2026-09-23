import type { Product } from '../../types';
import { ProductCard } from '../ProductCard';
import styles from './ProductsList.module.scss';

type ProductsListProps = {
  products: Product[];
};

export const ProductsList = ({ products }: ProductsListProps) => {
  return (
    <div className={styles.list} data-cy="productList">
      {products.map(product => (
        <ProductCard product={product} key={product.itemId} />
      ))}
    </div>
  );
};
