import { Catalog } from '../../components/Catalog';
import { useProducts } from '../../shared/context/ProductsContext';
import styles from './FavoritesPage.module.scss';

export const FavoritesPage = () => {
  const { favorites } = useProducts();
  const smallTitle = 'Favourites';
  const largeTitle = 'Favourites';

  return (
    <div className={styles.favorites__page}>
      <Catalog
        smallTitle={smallTitle}
        largeTitle={largeTitle}
        sorting={false}
        products={favorites}
      />
    </div>
  );
};
