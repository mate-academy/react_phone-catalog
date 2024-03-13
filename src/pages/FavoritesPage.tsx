/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';

import { BreadCrumbs } from '../components/BreadCrumbs';
import { GlobalContext } from '../GlobalContext';
import { ProductsList } from '../components/ProductsList';
import { WarningMessage } from '../types/WarningMessage';
import { Categories } from '../types/Categories';
import { BackButton } from '../components/BackButton';

import '../styles/FavoritesPage.scss';
import '../App.scss';
import { prepareProductList } from '../helpers/prepareProductList';

export const FavoritesPage: React.FC = () => {
  const { favList } = useContext(GlobalContext);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const visibleFavList = prepareProductList(favList, query);

  if (query && !visibleFavList.length) {
    return (
      <main className="favorites-page">
        <BreadCrumbs category={Categories.Favorites} />

        <h1 className="warning">{WarningMessage.Search}</h1>
      </main>
    );
  }

  if (!visibleFavList.length) {
    return (
      <main className="cart-page">
        <BackButton />

        <h1 className="warning">{WarningMessage.Favourites}</h1>
      </main>
    );
  }

  return (
    <main className="favorites-page">
      <BreadCrumbs category={Categories.Favorites} />

      <h1 className="favorites-page__title">
        Favorites
      </h1>

      <p className="favorites-page__count">
        {`${visibleFavList.length} ${visibleFavList.length === 1 ? 'model' : 'models'}`}
      </p>

      <ProductsList products={visibleFavList} />
    </main>
  );
};
