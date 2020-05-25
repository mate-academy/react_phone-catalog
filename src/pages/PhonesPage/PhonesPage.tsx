
import React from 'react';
import { Catalog } from '../../components/Catalog/Catalog';
import { CatalogPropsType } from '../../interfaces';
import './PhonesPage.scss';

export const PhonesPage = ({
  products,
  cart,
  setCart,
  favorites,
  setFavorites
}: CatalogPropsType) => {
  const visibleProducts = products.filter(product => product.type === 'phone');
  return (
    <div className="PhonesPage">
      <h1 className="PhonesPage__h1">Mobile phones</h1>
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
