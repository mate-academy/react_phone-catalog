import React from 'react';
import { Link } from 'react-router-dom';
import './FavouritesPage.scss';
import { useProducts } from '../context/ProductContext';
import { ProductCard } from '../ProductCard/ProductCard';

export const FavouritesPage: React.FC = () => {
  const { favorites, getCardProductById } = useProducts();

  return (
    <div className="favourites-page">
      <div className="favourites-page__wrapper">
        <div className="elements__wrapper">
          <Link to="/" className="icon icon--home"></Link>
          <div className="icon icon--right"></div>
          <div className="elements__nav-text small-text">Favourites</div>
        </div>
        <h1 className="favourites-page__title">Favourites</h1>
        <div className="favourites-page__subtitle">
          {favorites.length} items
        </div>
        {favorites.length === 0 ? (
          <img
            src={`${import.meta.env.BASE_URL}img/product-not-found.png`}
            alt="product not found"
            className="favourites-page__empty"
          />
        ) : (
          <div className="elements__products favourites-page__products">
            {favorites.map(f => {
              const p = getCardProductById(f.id);

              if (!p) {
                throw new Error('Error');
              } else {
                return (
                  <ProductCard
                    product={p}
                    discounted={true}
                    key={p.id}
                    cn="product__card product__card--page"
                  />
                );
              }
            })}
          </div>
        )}
      </div>
    </div>
  );
};
