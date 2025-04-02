import styles from './FavouritesPage.module.scss';
import { useFavourites } from '../../context/FavouritesContext';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import { Product } from '../../types/Product';
import { ProductCard } from '../../components/ProductCard';
import emptyFavouritesIcon from '/img/product-not-found.png';

const EmptyWishList = () => (
  <div className={styles.favourites__empty}>
    <img src={emptyFavouritesIcon} alt="empty favourites" />
  </div>
);

const FavouritesPage = () => {
  const { favourites } = useFavourites();

  return (
    <div className={styles.favourites}>
      <Breadcrumbs />

      <h1 className={styles.title}>Favourites</h1>
      <p className={styles.favourites__quantity}>{favourites.length} items</p>

      {favourites.length === 0 ? (
        <EmptyWishList />
      ) : (
        <div className={styles.favourites__products}>
          {favourites.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavouritesPage;
