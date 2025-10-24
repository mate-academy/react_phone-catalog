import styles from './FavoritesPage.module.scss';
import { ProductCard } from '../shared/components/ProductCard/ProductCard';
import { useAppSelector } from '../../store/hooks';
import { selectFavorites } from '../../store/slices/favoritesSlice';
import { Breadcrumb } from '../shared/components/Breadcrumb/Breadcrumb';

export const FavoritesPage = () => {
  const itemsInFavorites = useAppSelector(selectFavorites);
  const favoritesTotal = itemsInFavorites.length;

  return (
    <main className={styles.favorite}>
      <div className={styles.favorite__wrapper}>
        <div className={styles.favorite__container}>
          <section className={styles.favorite__navigation}>
            <Breadcrumb />
          </section>
          <section className={styles.favorite__header}>
            <div className={styles.header}>
              <h1 className={styles.header__title}>Favorites</h1>
              <h3 className={styles.header__subtitle}>{`${favoritesTotal} models`}</h3>
            </div>
          </section>
          {favoritesTotal > 0 ? (
            <section className={styles.favorite__products}>
              <div className={styles.favorite__list}>
                <ProductCard productsArray={itemsInFavorites} />
              </div>
            </section>
          ) : (
            <div className={styles.favorite__empty}>
              <img
                src="./img/product-not-found.png"
                alt="product-not-found"
                className={styles.favorite__empty__image}
              />
              <p className={styles.favorite__title}>No favorite items</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
