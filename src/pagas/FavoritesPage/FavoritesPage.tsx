import { useFavourites } from '../../context/FavouritesProvider';
import { BreadCrumbs } from '../../components/BreadCrumbs';
import { ProductList } from '../../components/ProductList';

import './FavoritesPage.scss';

export const FavoritesPage = () => {
  const { favourites } = useFavourites();

  return (
    <div className="container">
      <div className="FavouritesPage">
        <BreadCrumbs />
        <h1 className="FavouritesPage__title">favourites</h1>
        <p className="FavouritesPage__count">
          {favourites ? `${favourites.length} ${favourites.length <= 1 ? 'model' : 'models'}` : '0 models'}
        </p>
        {favourites.length >= 1
          ? (
            <ProductList products={favourites} />
          )
          : (
            <p className="no-goods">
              No items have been added to favorites.
              Explore our selection and add items to your favorites
              list for convenient tracking and future purchases.
            </p>
          )}
      </div>
    </div>
  );
};
