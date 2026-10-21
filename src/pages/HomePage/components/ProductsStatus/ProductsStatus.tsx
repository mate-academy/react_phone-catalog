import { useProducts } from '../../../../context/ProductsContext';
import styles from './ProductsStatus.module.scss';

export const ProductsStatus = () => {
  const { isLoading, error, reload } = useProducts();

  if (isLoading) {
    return <p className={styles.status}>Loading products...</p>;
  }

  if (error) {
    return (
      <div className={styles.status}>
        <p>{error}</p>
        <button type="button" onClick={reload}>
          Try again
        </button>
      </div>
    );
  }

  return null;
};
