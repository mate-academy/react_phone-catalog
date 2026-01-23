import { ProductsList } from '../ProductsPage/ProductsList';
import Breadcrumps from '../shared/components/Breadcrumps/Breadcrumps';
import { useFavorites } from '../shared/hooks/useFavorites';
import styles from './FavoritesPage.module.scss';

export const FavoritesPage: React.FC = () => {
  const { items, count } = useFavorites();

  return (
    <div className={styles.section}>
      <Breadcrumps type={'fovorites'} />

      <div className={styles.sectionTitle}>
        <h2>Favourites</h2>
      </div>

      <p className={styles.count}>{count} items</p>

      <ProductsList products={items} />
    </div>
  );
};
