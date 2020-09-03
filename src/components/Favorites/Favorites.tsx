import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { createSelector } from 'reselect';
import { favoriteItems } from '../../store/fullStore/store';
import BreadCrumbs from '../BreadCrumbs/BreadCrumbs';
import './Favorites.scss';
import ProductsList from '../ProductsList/ProductsList';
import EmptyStorage from '../EmptyStorage/EmptyStorage';

const Favorites = () => {
  const location = useLocation();
  const urlSearchParams = new URLSearchParams(location.search);
  const searchQuery = urlSearchParams.get('searchQuery') || '';

  const favoriteItemSelector = createSelector(
    favoriteItems,
    (items) => (
      items.filter(item => (
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      ))
    ),
  );
  const favorites = useSelector(favoriteItemSelector);
  console.log(favorites)

  if (favorites.length === 0) {
    return (
      <EmptyStorage />
    );
  }

  return (
    <div className="favorites">
      <BreadCrumbs />

      <h1 className="favorites__header">
        Favorites
      </h1>
      <div className="favorites__count">
        {`${favorites.length} items`}
      </div>

      <ProductsList gadgets={favorites} />
    </div>
  );
};

export default Favorites;
