import React from 'react';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { AllItemsList } from '../../components/AllItemsList/AllItemsList';
import { useFavorites } from '../../context/FavouritesContext';

import style from './FavouritesPage.module.scss';

export const FavouritesPage: React.FC = () => {
  const { favorites } = useFavorites();

  return (
    <div>
      <Breadcrumbs />
      <div className={style.title}>
        <h1 className={style.title_name}>Favourites</h1>
        <p className={style.title_quantity}>{favorites.length} models</p>
      </div>

      <AllItemsList allItems={favorites} useFilters={false} />
    </div>
  );
};
