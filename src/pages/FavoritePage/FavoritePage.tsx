import { Path } from '../../components/Path';
import { useFavorite } from './context/FavoriteContext';
import { ProductCard } from '../../components/ProductCard';
import styles from './FavoritePage.module.scss';

export const FavoritePage = () => {
  const { favoriteItems } = useFavorite();

  return (
    <div className={styles.favorite}>
      <div className={styles.container}>
        <Path category="Favorite" />
        <h1 className={styles.title}>Favorites</h1>
        <p className={styles.itemsCount}>{`${favoriteItems.length} items`}</p>

        <div className={styles.content}>
          <div className={styles.items}>
            {favoriteItems.map(item => (
              <ProductCard
                key={item.id}
                product={item}
                className={styles.catalog - card}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
