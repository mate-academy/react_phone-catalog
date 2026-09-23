import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ProductsList } from '../../components/ProductsList';
import { useShop } from '../../context/ShopContext';
import styles from './FavoritesPage.module.scss';

export const FavoritesPage = () => {
  const { favorites } = useShop();

  return (
    <div className={styles.page}>
      <Breadcrumbs items={[{ title: 'Favourites' }]} />

      <h1 className={styles.title}>Favourites</h1>

      <p className={styles.count}>
        {favorites.length} {favorites.length === 1 ? 'item' : 'items'}
      </p>

      {favorites.length > 0 ? (
        <ProductsList products={favorites} />
      ) : (
        <p className={styles.empty}>You have no favourite products yet</p>
      )}
    </div>
  );
};
