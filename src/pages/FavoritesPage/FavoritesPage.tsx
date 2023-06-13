import React from 'react';
import './favoritesPage.scss';
import ProductList from '../components/ProductList/ProductList';

export const FavoritesPage = () => {
  return (
    <>
      <h1 className="favoritesPage__title">Mobile phones</h1>
      <p className="favoritesPage__description">5 items</p>
      {/* <ProductList dataPhones={} /> */}
    </>

  );
};
