import { useContext } from 'react';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import styles from './FavoritePage.module.scss';
import FavoriteContext from '../../Contexts/FavoriteContext';
import ProductsGrid from '../../components/ProductsGrid/ProductsGrid';

export const FavoritePage = () => {
  const { favoritesItems } = useContext(FavoriteContext);

  return (
    <div className={styles.favoriuteContainer}>
      <Breadcrumbs />

      <div className={styles.title}>Favorites</div>
      <div className={styles.totalItems}>{favoritesItems.length} items</div>

      <div className={styles.itemsContainer}>
        <ProductsGrid products={favoritesItems} />
      </div>
    </div>
  );
};

export default FavoritePage;
