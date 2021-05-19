import React from 'react';

import { Breadcrumbs } from '../../Phones/components/Breadcrumbs/Breadcrumbs';
import { FavouritesBlock } from '../FavouritesBlock/FavouritesBlock';
import './Main.scss';

export const Main = () => {
  return (
    <main className="Main">
      <div className="Main-Container">
        <Breadcrumbs />
        <h1 className="Favourites-Title">
          Favourites
        </h1>
        <FavouritesBlock />
      </div>
    </main>
  );
};
