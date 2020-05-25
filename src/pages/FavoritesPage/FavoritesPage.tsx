import React from 'react';
import { Catalog } from '../../components/Catalog/Catalog';
import './FavoritesPage.scss';
import { CatalogPropsType } from '../../interfaces';

export const FavoritesPage = ({
  cart,
  setCart,
  favorites,
  setFavorites
}:CatalogPropsType) => {


  return (
    <div className="PhonesPage">
      <h1 className="PhonesPage__h1">Favorites</h1>
      <Catalog
        products={favorites}
        cart={cart}
        setCart={setCart}
        favorites={favorites}
        setFavorites={setFavorites}
      />
    </div>
  )
}
