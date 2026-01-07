import React from 'react';
import { useFav } from '../../context/FavContext';
import { ProductsList } from '../../components/ProductsList/ProductsList';

export const FavoritesPage = () => {
  const { favItems } = useFav();

  return (
    <div className="container">
      <h1 className="title">Favourites</h1>
      <p style={{ color: '#89939a', marginBottom: '24px' }}>
        {favItems.length} items
      </p>

      {favItems.length > 0 ? (
        <ProductsList products={favItems} />
      ) : (
        <p>No favourites yet.</p>
      )}
    </div>
  );
};
