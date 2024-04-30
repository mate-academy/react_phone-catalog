import { useContext } from 'react';
import { Map } from '../../Components/Map';

import './FavoritesPage.scss';
import { FavouritesContext } from '../../Contexts/FavouritesContext';
import { Products } from '../../Components/Products';
import { ErrorMessage } from '../../Components/ErrorMessage';
import { Errors } from '../../Types/Errors';

export const FavoritesPage = () => {
  const { favourites } = useContext(FavouritesContext);

  return (
    <div className="favorites">
      <div className="container">
        <Map />

        <h1 className="favorites__title">Favorites</h1>
        <p className="favorites__count">
          {favourites.length === 1 ? '1 item' : `${favourites.length} items`}
        </p>

        {favourites.length ? (
          <Products products={favourites} catalog />
        ) : (
          <ErrorMessage message={Errors.EmptyFavourites} />
        )}
      </div>
    </div>
  );
};
