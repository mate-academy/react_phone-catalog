import React from 'react';
import { Catalog } from '../../components/Catalog/Catalog';
import { CatalogPropsType } from '../../interfaces';
import './TabletsPage.scss';

export const TabletsPage = ({
  products,
  cart,
  setCart,
  favorites,
  setFavorites
}: CatalogPropsType) => {
  const visibleProducts = products.filter(product => product.type === 'tablet');
  return (
    <div className="TabletsPage">
      <h1 className="TabletsPage__h1">Tablets</h1>
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
