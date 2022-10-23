import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ProductCard } from '../../components/ProductCard';
import { Product } from '../../types/Product';

import './FavoritesPage.scss';

export const FavoritesPage: React.FC = () => {
  const favorites = JSON.parse(localStorage.getItem('favorites') || '');

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const favoritesByQuery = favorites.filter((favorite: Product) => (
    favorite.name.toLowerCase().includes(query.toLocaleLowerCase())
    || favorite.id.toLowerCase().includes(query.toLocaleLowerCase())));

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
        {`${favoritesByQuery.length} items`}
      </div>

      <div className="favorites__list">
        {favoritesByQuery.map((favorite: Product) => (
          <ProductCard
            key={favorite.id}
            product={favorite}
          />
        ))}
      </div>

    </div>

  );
};
