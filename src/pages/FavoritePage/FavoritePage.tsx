import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './FavoritePage.scss';
import { ProductCard } from '../../components/ProductCard';
import { RootState } from '../../app/store';

export const FavoritePage: React.FC = () => {
  const likedProducts = useSelector((state: RootState) => state.likedProducts);

  return (
    <div className="favourites-page">
      <div className="favourites-page__top">
        <div className="favourites-page__nav">
          <Link to={'/'} className="nav__home" />
          <div className="nav__next-step" />
          <p className="nav__title">Favourites</p>
        </div>
        <h1 className="favourites-page__title">Favourites</h1>
      </div>

      {likedProducts.length === 0 ? (
        <h2>
          Your favorite products are waiting for you! Tap ❤️ to save them here
        </h2>
      ) : (
        <>
          <p className="product-page-list__models">
            {`${likedProducts ? likedProducts.length : 0} items`}
          </p>
          <div className="listOfProducts">
            <div className="listOfProducts__list">
              {likedProducts.map(product => (
                <ProductCard product={product} key={product.id} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
