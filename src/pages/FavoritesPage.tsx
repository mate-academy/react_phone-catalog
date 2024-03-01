import React, { useContext } from 'react';
import { BreadCrumbs } from '../components/BreadCrumbs';

import '../styles/FavoritesPage.scss';
import { GlobalContext } from '../GlobalContext';
import { ProductsList } from '../components/ProductsList';

export const FavoritesPage: React.FC = () => {
  const { favList } = useContext(GlobalContext);

  return (
    <main className="favorites-page">
      <BreadCrumbs category="Favorites" />

      <h1 className="favorites-page__title">
        Favorites
      </h1>

      <p className="favorites-page__count">
        {`${favList.length} models`}
      </p>

      <ProductsList products={favList} />
    </main>
  );
};
