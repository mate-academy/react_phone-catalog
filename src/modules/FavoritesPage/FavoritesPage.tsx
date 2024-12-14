import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../store/GlobalContext';
import { Breadcrumbs } from '../shared/Breadcrumbs';
import { ProductCard } from '../shared/ProductCard';
import './FavoritesPage.scss';

export const FavoritesPage: React.FC = () => {
  const { favorites } = useContext(GlobalContext);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const normalizeProductsType =
    pathname.slice(1, 2).toUpperCase() + pathname.slice(2);

  const countFavoritesProducts = favorites.length;

  return (
    <div className="favoritesPage">
      <button className="favoritesPage__button-back" onClick={handleBack}>
        Back
      </button>

      <h1 className="favoritesPage__title">{normalizeProductsType}</h1>

      <span className="favoritesPage__description">
        {`${countFavoritesProducts} ${
          countFavoritesProducts === 1 ? 'model' : 'models'
        }`}
      </span>

      {countFavoritesProducts === 0 ? (
        <div className="favoritesPage__empty-content">Favourites is empty</div>
      ) : (
        <div className="favoritesPage__content">
          {favorites.map(favourite => (
            <div key={favourite.id} className="favoritesPage__item">
              <ProductCard
                product={favourite}
                displayType={'with-discount'}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
