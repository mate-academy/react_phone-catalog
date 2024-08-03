import { useContext } from 'react';
import { AppContext } from '../../Root';
import { ProductCard } from '../ProductCard';
import styles from './ProductsList.module.scss';

export const ProductsList = () => {
  const { favoritesItems } = useContext(AppContext);

  if (!favoritesItems.length) {
    return (
      <div className={styles.emptyList}>
        <p>There are no favorites products yet.</p>
      </div>
    );
  }

  return (
    <div className={styles.productsList}>
      {favoritesItems.map(({ id, product }) => (
        <ProductCard key={id} product={product} />
      ))}
    </div>
  );
};
