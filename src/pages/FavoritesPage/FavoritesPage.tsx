import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContextProvider';
import { SecondNavBar } from '../../components/SecondNavBar/SecondNavBar';
import { NotFound } from '../../components/NotFound/NotFound';
import { ModelsCounter } from '../../components/ModelsCounter/ModelsCounter';
import { ProductList } from '../../components/ProductList/ProductList';
import './favoritesPage.scss';

export const FavoritesPage:React.FC = () => {
  const { favorites } = useContext(AppContext);

  return (
    <div className="page__favorites">
      <SecondNavBar />
      <h1 className="main-title">Favorites</h1>
      <ModelsCounter number={favorites.length} />

      {!favorites.length ? (
        <NotFound
          title="Your favorites list is empty"
        />
      ) : (
        <ProductList products={favorites} />
      )}
    </div>
  );
};
