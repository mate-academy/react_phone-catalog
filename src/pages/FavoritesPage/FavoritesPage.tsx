import React from 'react';
import { Catalog } from '../../components/Catalog/Catalog';
import './FavoritesPage.scss';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { useSelector } from 'react-redux'
import { RootState } from '../../store';

export const FavoritesPage = () => {
  const favorites = useSelector((state: RootState) => state.favorites);

  return (
    <div className="FavoritesPage">
      <Breadcrumbs />
      <h1 className="FavoritesPage__h1">Favorites</h1>
      <Catalog
        products={favorites}
      />
    </div>
  )
}
