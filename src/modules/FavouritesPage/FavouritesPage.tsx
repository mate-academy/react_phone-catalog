import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ProductsList } from '../../components/ProductsList';
import { useFavourites } from '../../context/FavouritesContext';
import { useProducts } from '../../context/ProductsContext';
import { getProductId } from '../../utils/getProductId';
import styles from './FavouritesPage.module.scss';
import noFavourites from '../../../public/img/product-not-found.png';

export const FavouritesPage = () => {
  const { favouriteIds, favouritesCount } = useFavourites();
  const { products } = useProducts();

  const favouriteProducts = products.filter(product => {
    const itemId = getProductId(product);
    return favouriteIds.includes(itemId);
  });

  return (
    <div className={styles.page}>
      <div className={styles.breadcrumbs}>
        <Breadcrumbs />
      </div>

      <h1 className={styles.page__title}>Favourites</h1>

      {favouritesCount === 0 ? (
        <div className={styles.page__empty}>
          <p className={styles.page__error}>No favourite items found</p>
          <img className={styles.page__image} src={noFavourites} alt="no favourite items found" />
        </div>
      ) : (
        <>
          <p className={styles.page__itemsAmount}>{favouritesCount} items</p>
          <ProductsList itemsPerPage={favouritesCount} items={favouriteProducts} />
        </>
      )}
    </div>
  );
};
