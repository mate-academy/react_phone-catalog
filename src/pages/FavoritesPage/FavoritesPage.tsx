import { useSearchParams } from 'react-router-dom';
import { Catalog } from '../../components/Catalog';
import { useProducts } from '../../shared/context/ProductsContext';
import styles from './FavoritesPage.module.scss';
import { useEffect } from 'react';

export const FavoritesPage = () => {
  const [, setSearchParams] = useSearchParams();
  const { favorites } = useProducts();
  const smallTitle = 'Favourites';
  const largeTitle = 'Favourites';

  useEffect(() => {
    setSearchParams({});
  }, [setSearchParams]);

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
