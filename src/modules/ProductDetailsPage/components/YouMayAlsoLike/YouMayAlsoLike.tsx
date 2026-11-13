import { ProductsList } from '../../../../shared/ProductsList';
import { Product } from '../../../../api/types';
import { Loader } from '../../../../shared/Loader';
import styles from './YouMayAlsoLike.module.scss';

interface YouMayAlsoLikeProps {
  products: Product[];
  isLoading?: boolean;
}

export const YouMayAlsoLike = ({
  products,
  isLoading,
}: YouMayAlsoLikeProps) => {
  if (isLoading) {
    return (
      <div className={styles.block}>
        <h2 className={styles.title}>You may also like</h2>
        <Loader count={4} />
      </div>
    );
  }

  return (
    <div className={styles.block}>
      <h2 className={styles.title}>You may also like</h2>
      <ProductsList
        products={products}
        emptyMessage="No similar products found"
      />
    </div>
  );
};
