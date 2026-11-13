import { Loader } from '../Loader';
import { ProductCard } from '../ProductCard';
import { Product } from '../../api/types';
import styles from './ProductsList.module.scss';

interface ProductsListProps {
  products: Product[];
  isLoading?: boolean;
  emptyMessage?: string;
}

export const ProductsList = ({
  products,
  isLoading,
  emptyMessage,
}: ProductsListProps) => {
  if (isLoading) {
    return <Loader count={8} />;
  }

  if (products.length === 0) {
    return (
      <p className={styles.empty}>{emptyMessage ?? 'Products not found'}</p>
    );
  }

  return (
    <div className={styles.list}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
