import React from 'react';
import { Catalog } from '../../components/Catalog/Catalog';
import { CatalogPropsType } from '../../interfaces';
import './AccessoriesPage.scss';

export const AccessoriesPage = ({
  products,
  cart,
  setCart,
  favorites,
  setFavorites

}: CatalogPropsType) => {
  const visibleProducts = products.filter(product => product.type === 'accessorie' || !product.type);
  return (
    <div className="AccessoriesPage">
      <h1 className="Accessories__h1">Accessories</h1>
      <Catalog
        products={visibleProducts}
        cart={cart}
        setCart={setCart}
        favorites={favorites}
        setFavorites={setFavorites}
      />
    </div>
  )
}
