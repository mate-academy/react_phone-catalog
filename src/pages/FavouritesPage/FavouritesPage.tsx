import { useContext } from 'react';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ProductsList } from '../../components/ProductsList';

import './FavouritesPage.scss';
import { FavsContext } from '../../contexts/FavsContext';
import { NoSearchResults } from '../../components/NoSearchResults';

export const FavouritesPage = () => {
  const { favs } = useContext(FavsContext);

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
            {`${favs.length} model${favs.length !== 1 ? 's' : ''}`}
          </p>

          {!favs.length ? (
            <NoSearchResults categoryName="Favourites" />
          ) : (
            <ProductsList products={favs} />
          )}
        </div>
      </div>
    </div>
  );
};
