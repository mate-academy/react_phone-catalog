import { useContext } from 'react';
import { FavouritesContext } from '../../store/SavedProductsContext';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { NoResults } from '../../components/NoResults';
import { ProductsList } from '../../components/ProductsList';

import './FavouritesPage.scss';

export const FavouritesPage = () => {
  const { favourites } = useContext(FavouritesContext);

  return (
    <div className="FavouritesPage">
      <div className="container container--with-min-height">
        <div className="FavouritesPage__content">
          <div className="FavouritesPage__breadcrumbs">
            <Breadcrumbs />
          </div>

          <h1 className="FavouritesPage__title">
            Favourites
          </h1>

          <p className="FavouritesPage__amount">
            {`${favourites.length} model${favourites.length !== 1 ? 's' : ''}`}
          </p>

          {!favourites.length ? (
            <NoResults />
          ) : (
            <ProductsList products={favourites} />
          )}
        </div>
      </div>
    </div>
  );
};
