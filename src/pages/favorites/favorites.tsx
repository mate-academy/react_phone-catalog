import { useLocation } from 'react-router-dom';
import styles from './favorites.module.scss';
import { useContext, useMemo } from 'react';
import { ProductContext } from '../../context/ProductContext';
import { BreadCrumbs } from '../../components/breadCrumbs';
import { Title } from '../../components/title';
import { ProductQuantity } from '../../components/productQuantity';
import { ProductCard } from '../../components/productCard';

export const Favorites = () => {
  const location = useLocation();

  const arrLocation = useMemo(() => {
    const parts = location.pathname.split('/').filter(Boolean);

    return parts;
  }, [location.pathname]);

  const { favorites, products } = useContext(ProductContext);

  const filteredFavorites = [...products].filter(prod =>
    favorites.includes(prod.itemId),
  );

  return (
    <div className={styles.favorites}>
      <BreadCrumbs location={arrLocation} />
      <Title title="favorites" />
      <div className={styles.container}>
        <ProductQuantity quantity={favorites.length} favorites />
        <div className={styles.favoritesProd}>
          <ProductCard product={filteredFavorites} catalog />
        </div>
      </div>
    </div>
  );
};
