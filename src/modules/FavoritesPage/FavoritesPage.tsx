import { ProductsList } from '../../components/ProductsList';
import { useShop } from '../../shared/context/ShopContext';
import styles from './FavoritesPage.module.scss';

export function FavoritesPage() {
  const { favorites } = useShop();

  return (
    <section className={styles.page}>
      <div className={styles.breadcrumb}>Home&nbsp; › &nbsp;Favorites</div>
      <h1>Favourites</h1>
      <p className={styles.count}>{favorites.length} items</p>
      {favorites.length ? (
        <ProductsList products={favorites} />
      ) : (
        <p>You don&apos;t have any favourites yet.</p>
      )}
    </section>
  );
}
