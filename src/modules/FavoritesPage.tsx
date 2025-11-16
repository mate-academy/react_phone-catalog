import React, { useContext } from 'react';
import { FavoriteContext } from '../shared/contexts/FavoriteContext';
import { ProductsList } from '../shared/components/ProductList/ProductsList';

export const FavoritesPage: React.FC = () => {
  const { favorites } = useContext(FavoriteContext);

  return <ProductsList products={favorites} />;
};
