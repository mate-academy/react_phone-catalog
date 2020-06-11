import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Card } from '../Card/Card';
import { getFavorites } from '../../store/index';

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
        <h1 className="Phones__Title">Favourites</h1>
        <span className="Phones__Sum">
          {favorites}
          {' '}
          models
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
