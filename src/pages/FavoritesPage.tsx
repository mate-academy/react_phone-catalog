import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { FavouritesContext } from '../context/FavsContext';
import { Breadcrumbs } from '../components/Breadcrumbs/Breadcrumbs';
import { ProductsList } from '../components/ProductsList/ProductsList';
import { QueryContext } from '../context/QueryContext';
import { filteringByQuery } from '../utils/filteringByQuery';

export const FavoritesPage = () => {
  const { favItems } = useContext(FavouritesContext);
  const { appliedQuery } = useContext(QueryContext);
  const { pathname } = useLocation();
  const path = pathname.slice(1, 2).toUpperCase() + pathname.slice(2);
  const favouriteItems = favItems.map(item => item.product);
  const filteredFavoriteItems = filteringByQuery(favouriteItems, appliedQuery);

  return (
    <div className="container">
      <div className="favourites">
        <Breadcrumbs pathname={path} />
        <h1 className="favourites__title">
          Favourites
        </h1>

        {favItems.length ? (
          <p className="favourites__quantity">
            {`${favItems.length} items`}
          </p>
        ) : (
          <p className="favourites__quantity">There are no Favourite items.</p>
        )}

        <div className="favourites__content">
          <ProductsList arrOfItems={filteredFavoriteItems} />
        </div>
      </div>
    </div>

  );
};
