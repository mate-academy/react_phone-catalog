import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Card } from '../Card/Card';
import { getFavorites } from '../../store/index';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';

const FavoritesPage = () => {
  const favoriteProducts = useSelector(getFavorites);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query') || '';
  const lowerQuery = query.toLocaleLowerCase();

  const visibleProducts = useMemo(
    () => {
      return favoriteProducts.filter(({ name, capacity, screen }) => (
        (name + capacity + screen).toLowerCase().includes(lowerQuery)
      ));
    }, [favoriteProducts, lowerQuery],
  );

  const favorites = visibleProducts.length;

  return (
    <>
      <div className="Phones PhonesContainer">
        <Breadcrumbs />
        <h1 className="Phones__Title">Favourites</h1>
        <span className="Phones__Sum">
          {favorites}
          {' '}
          items
        </span>
      </div>
      <div className="PhonesContainer__Inner">
        {visibleProducts.map(product => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default FavoritesPage;
