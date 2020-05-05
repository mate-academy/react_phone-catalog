import React from 'react';
import './Favorites.scss';
import { NavLink } from 'react-router-dom';
import backArrow from '../../assets/images/icons/back-arrow.svg';
import homeIcon from '../../assets/images/icons/home-icon.svg';
import { ProductCard } from '../Phones/ProductCard/ProductCard';

export const Favorites = (props) => {
  const {
    favoritePhones,
    addToFavorites,
    addToCart,
  } = props;

  return (
    <div className="catalog">
      <div className="content-heading">
        <div className="favorites__navigation">
          <NavLink to="/" className="favorites__back-link">
            <img
              src={homeIcon}
              alt="back arrow navigation"
              className="favorites__back-arrow"
            />
            <img
              src={backArrow}
              alt="back arrow navigation"
              className="favorites__back-arrow"
            />
            <span className="favorites__back-link">Home</span>
          </NavLink>
        </div>
        <h1 className="content-heading__title">Favorites</h1>
        <p className="content-heading__count">{`${favoritePhones.length} phones`}</p>
      </div>

      <ul className="catalog__product-list">

        {favoritePhones.map(favoritePhone => (
          <li key={favoritePhone.age} className="catalog__product-item">
            <ProductCard
              {...favoritePhone}
              addToCart={addToCart}
              addToFavorites={addToFavorites}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
