import React, { useContext, useMemo } from 'react';
import './FavoritesPage.scss';
import { GlobalContext } from '../../context/GlobalContext';
import { ProductsList } from '../../shared/ProductsList';
import { Breadcrumbs } from '../../shared/Breadcrumbs';

export const FavoritesPage: React.FC = () => {
  const { favorites } = useContext(GlobalContext);

  const favoritesCount = useMemo(() => favorites.length, [favorites]);

  return (
    <main className="main favorites">
      <div className="favorites__breadcrumbs">
        <Breadcrumbs />
      </div>
      <h1 className="favorites__title">Favorites</h1>
      <p className="favorites__count">{favoritesCount + ' items'}</p>
      <ProductsList products={favorites} />
    </main>
  );
};
