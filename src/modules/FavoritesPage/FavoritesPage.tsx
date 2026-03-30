import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Card } from '../../components/Card';
import { useFavoritesState } from '../../store/FavouritesProvider';
import style from './FavoritesPage.module.scss';

export const FavoritesPage = () => {
  const { favItems } = useFavoritesState();

  return (
    <div className={style.favoritesPage}>
      <Breadcrumbs />
      <h1 className={style.favoritesPage__title}>Favourites</h1>
      {favItems.length !== 0 && (
        <span className={style.favoritesPage__items}>
          {`${favItems.length} items`}
        </span>
      )}
      {favItems.length === 0 && (
        <div className={style.favoritesPage__emptyFav}>
          <img
            src="/img/product-not-found.png"
            alt="product-not-found"
            className={style.favoritesPage__emptyFavImg}
          />
          <p className={style.favoritesPage__emptyFavText}>
            No favorite products
          </p>
        </div>
      )}
      <div className={style.favoritesPage__cards}>
        {favItems.map(item => (
          <div key={item.id}>
            <Card product={item} fullPrice={true} />
          </div>
        ))}
      </div>
    </div>
  );
};
