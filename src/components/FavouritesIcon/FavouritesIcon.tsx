import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProductsContext } from '../../helpers/ProductsContext';
import './FavouritesIcon.scss';
import favouritesIcon from '../../images/favourites.svg';

export const FavouritesIcon: React.FC = () => {
  const { favourites } = useContext(ProductsContext);
  const numberOfFavourites = favourites.length;

  return (
    <Link to="/favourites" className="favourites-icon">
      <img src={favouritesIcon} alt="heart icon" />

      {!!numberOfFavourites && (
        <div className="favourites-icon__counter">
          {numberOfFavourites}
        </div>
      )}
    </Link>
  );
};
