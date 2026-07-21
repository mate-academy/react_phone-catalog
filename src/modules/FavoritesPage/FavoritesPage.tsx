import styles from './FavoritesPage.module.scss';
import { Breadcrumb } from '../shared/components/Breadcrumb';
import { ProductsList } from '../shared/components/ProductsList';
import { useShop } from '../../context/ShopContext';
import classNames from 'classnames';

export const FavoritesPage = () => {
  const { favorites } = useShop();

  return (
    <div className={classNames(styles.favoritesPage, 'container')}>
      <Breadcrumb items={[{ label: 'Favourites' }]} />
      <h1 className={styles.favoritesPage__title}>Favourites</h1>
      <p className={styles.favoritesPage__itemsCount}>
        {favorites.length} models
      </p>

      <section className={styles.favoritesPage__content}>
        {favorites.length === 0 ? (
          <p className={styles.favoritesPage__emptyMessage}>
            No favourites yet
          </p>
        ) : (
          <ProductsList products={favorites} />
        )}
      </section>
    </div>
  );
};
