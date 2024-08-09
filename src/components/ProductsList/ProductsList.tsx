import { selectFavoritesItems } from '../../redux/slices/favoritesItemsSlice';
import { useAppSelector } from '../../redux/hooks';
import { ProductCard } from '../ProductCard';
import styles from './ProductsList.module.scss';

export const ProductsList = () => {
  const favoritesItems = useAppSelector(selectFavoritesItems);

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
