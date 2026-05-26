import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { ProductsList } from '../shared/components/ProductList';
import { useFavorites } from '../shared/context/FavoritesContext';
import styles from './FavouritesPage.module.scss';

export const FavouritesPage = () => {
  const { favorites } = useFavorites();

  return (
    <section className={styles.favourites}>
      <div className={styles.favourites__container}>
        <Breadcrumbs firstPath="Favourites" secondPath="" />

        <h1 className={styles.favourites__title}>Favourites</h1>

        <p className={styles.favourites__count}>
          {favorites.length} {favorites.length === 1 ? 'item' : 'items'}
        </p>

        {favorites.length > 0 ? (
          <ProductsList products={favorites} />
        ) : (
          <h1 className={styles['favourites__empty-title']}>
            You have no favourite products
          </h1>
        )}
      </div>
    </section>
  );
};
