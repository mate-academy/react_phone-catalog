import classNames from 'classnames';
import { ProductCard } from '../../components/ProductCard';
import { useFavouriteProducts } from '../../store/FavouriteProductsContext';
import styles from './FavouritesPage.module.scss';
import { Breadcrumbs } from '../../components/Breadcrumbs';

export const FavouritesPage = () => {
  const { favouriteProducts } = useFavouriteProducts();

  const quantity =
    favouriteProducts.length === 1
      ? `${favouriteProducts.length} item`
      : `${favouriteProducts.length} items`;

  return (
    <div className={styles.favourites}>
      <Breadcrumbs />
      <h1>Favourites</h1>
      <p className={classNames(styles.favourites__quantity, 'text-body')}>
        {quantity}
      </p>
      <div className={styles.favourites__cards}>
        {favouriteProducts.map(favourite => (
          <ProductCard key={favourite.id} product={favourite} />
        ))}
      </div>
    </div>
  );
};
