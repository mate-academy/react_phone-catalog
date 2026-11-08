import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { ProductsList } from '../shared/components/ProductsList';
import { useFavorites } from '../shared/context/FavoritesContext';
import { pluralize } from '../shared/utils/pluralize';
import styles from './FavoritesPage.module.scss';

export const FavoritesPage = () => {
  const { favorites } = useFavorites();

  return (
    <div className={styles.page}>
      <Breadcrumbs
        items={[{ label: 'Favourites' }]}
        className={styles.breadcrumbs}
      />

      <h1 className={styles.title}>Favourites</h1>

      {favorites.length > 0 ? (
        <>
          <p className={styles.count}>{pluralize(favorites.length, 'item')}</p>

          <ProductsList products={favorites} />
        </>
      ) : (
        <p className={styles.message}>There are no favourites yet</p>
      )}
    </div>
  );
};
