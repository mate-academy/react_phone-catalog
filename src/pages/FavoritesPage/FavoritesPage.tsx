import React from 'react';
import { useFavorites } from '../../context/FavoritesContext';
import { ProductCard } from '../../components/ProductCard';
import '../FavoritesPage/Favorites.scss';

const BASE = import.meta.env.BASE_URL;

export const FavoritesPage: React.FC = () => {
  const { favorites } = useFavorites();

  return (
    <section className="favorites-page">
      <div className="container">
        <div className="favorites-page__breadcrumbs">
          <img src={`${BASE}img/icons/home.svg`} alt="home" />
          <span> / Favourites</span>
        </div>

        <h1 className="favorites-page__title">Favourites</h1>

        <p className="favorites-page__count">{favorites.length} items</p>

        {favorites.length === 0 ? (
          <p className="favorites-page__empty">No favorite products yet</p>
        ) : (
          <ul className="favorites-page__list">
            {favorites.map(product => (
              <li key={product.id}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};
