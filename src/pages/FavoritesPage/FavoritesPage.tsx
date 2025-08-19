import React from 'react';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { AllItemsList } from '../../components/AllItemsList';
import { useFavorites } from '../../context/Favorites/FavoritesContext';

export const FavoritesPage: React.FC = () => {
  const { favorites } = useFavorites();

  return (
    <div>
      <Breadcrumbs />
      <div className="title">
        <h1 className="title__name">Favourites</h1>
        <p className="title__quantity">{favorites.length} models</p>
      </div>

      <AllItemsList allItems={favorites} useFilters={false} />
    </div>
  );
};
