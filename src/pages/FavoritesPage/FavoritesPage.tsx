import { useLocation } from 'react-router-dom';
import { Breadcrumbs } from '../../components/Breadcrumbs';

import { ProductList } from '../../components/ProductList';
import { useAppSelector } from '../../hooks/useAppSelector';
import styles from './FavoritesPage.module.scss';

export const FavoritesPage = () => {
  const { pathname } = useLocation();
  const category = pathname.slice(1);
  const { favorites } = useAppSelector(state => state.favorites);

  return (
    <>
      <Breadcrumbs category={category} />

      <h1 className={styles.Title}>Favourites</h1>

      <p className={styles.Subtitle}>{favorites.length} items</p>

      <ProductList products={favorites} isHaveSlider={false} />
    </>
  );
};
