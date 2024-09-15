import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Favorites = () => {
  const location = useLocation();

  return (
    <>
      <div className="page-phones">
        <Link to="/">
          <img className="page-phones__house" src="./img/Home.svg" alt="Home" />
        </Link>
        <img
          className="page-phones__arrow"
          src="./img/Chevron (Arrow Right).svg"
          alt="Chevron"
        />
        <p className="page-phones__catygory-text">
          {location.pathname.includes('/tablets')
            ? 'Tablets'
            : location.pathname.includes('/phones')
              ? 'Phones'
              : location.pathname.includes('/accessories')
                ? 'Accessories'
                : location.pathname.includes('/favourites')
                  ? 'Favourites'
                  : ''}
        </p>
      </div>

      <h1>Favourites</h1>
      <p>0 items</p>
    </>
  );
};
