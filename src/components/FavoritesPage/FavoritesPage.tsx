import React from 'react';
import { useSelector } from 'react-redux';
import { getFavorites } from '../../store';
import ProductList from '../ProductList/ProductList';

import './FavoritesPage.scss';

const FavoritesPage = () => {
  const favorites = useSelector(getFavorites);

  return (
    <>

      <div className="FavoritesPage">
        <div className="FavoritesPage__title">
          <p className="FavoritesPage__name">Favorites</p>
          <span className="FavoritesPage__quantity">
            {favorites.length}
            {' '}
            items
          </span>
        </div>

        <ProductList products={favorites} />
      </div>
    </>

  );
};

export default FavoritesPage;
