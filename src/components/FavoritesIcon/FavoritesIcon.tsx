import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProductsContext } from '../../helpers/ProductsContext';
import './FavoritesIcon.scss';
import favoritesIcon from '../../images/favorites.svg';

export const FavoritesIcon: React.FC = () => {
  const { favorites } = useContext(ProductsContext);
  const numberOfFavorites = favorites.length;

  return (
    <Link to="/favorites" className="favorites-icon">
      <img src={favoritesIcon} alt="heart icon" />

      {!!numberOfFavorites && (
        <div className="favorites-icon__counter">
          {numberOfFavorites}
        </div>
      )}
    </Link>
  );
};
