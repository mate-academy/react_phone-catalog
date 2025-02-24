import { useContext, useMemo } from 'react';
import { Breadcrumbs } from '../../../shared/components/Breadcrumbs';
import styles from './FavoritesPage.module.scss';
import { FavoritesContext } from '../../../shared/_store/FavoritesProvider';
import { ProductsContext } from '../../../shared/_store/DataProvider';
import { ProductsList } from '../../../ProductsPage/components/ProductsList';

export const FavoritesPage = () => {
  //const { favorites, addToFavorites, removeFromFavorites, isFavorite } =
  const { favorites } = useContext(FavoritesContext);
  const { products } = useContext(ProductsContext);
  const productsList = useMemo(
    () => products.filter(product => favorites.includes(product.itemId)),
    [favorites, products],
  );

  return (
    <div className={styles.favorites}>
      <Breadcrumbs category="favourites" />
      <h1 className={styles.favorites__title}>Favourites</h1>
      <div className={styles.favorites__count}>{productsList.length} items</div>
      <ProductsList products={productsList} />
    </div>
  );
};
