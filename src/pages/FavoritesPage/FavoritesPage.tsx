import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProductCard } from '../../components/ProductCard';

import { ProductsContext } from '../../helpers/ProductsContext';
import './FavoritesPage.scss';

export const FavoritesPage: React.FC = () => {
  const { favorites } = useContext(ProductsContext);

  return (

    <div className="category-page favorites">
      <div className="category-page__status status">
        <Link
          to="/"
          className="status__home-logo"
        >
          <img
            src="img/icons/home.svg"
            alt=""
          />
        </Link>

        <img
          src="img/icons/next-arrow-disabled.svg"
          alt=""
          className="status__arrow"
        />

        <p className="status__title">Favorites</p>
      </div>

      <div className="section__title">
        Favorites
      </div>

      <div className="favorites__residue">
        {`${favorites.length} items`}
      </div>

      <div className="favorites__list">
        {favorites.map(favorite => (
          <ProductCard
            product={favorite}
          />
        ))}
      </div>

    </div>

  );
};
