import { useApp } from '../../providers/context';
import { ProductCard } from '../shared/ProductCard';
import styles from './FavouritesPage.module.scss';

export const FavouritesPage = () => {
  const { favourites} = useApp();

  return (
    <div className={styles.container}>
      <div className={styles.favourite__title}>Favourites</div>
      <div className={styles.favourite__counter}>
        {favourites.length < 1 ? favourites.length + ' item' : favourites.length + ' items'}
      </div>
      <div className={styles.favourite__items}>
        {favourites.map(item => (
          <div className={styles.favourite__item} key={item.id}>
            <ProductCard product={item} />
          </div>
        ))}
      </div>
    </div>
  );
};
