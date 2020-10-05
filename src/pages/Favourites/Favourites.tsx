import React from 'react';
import { ProductCard } from './../../components/ProductCard/ProductCard';
import { useSelector } from 'react-redux';
import { getFavouritesGoods } from '../../store';
import { BreadCrumbs } from '../../components/BreadCrumbs';

export const Favourites = () => {
  const favouriteGoods = useSelector(getFavouritesGoods);

  return(
    <div className="favourites__products">
      <BreadCrumbs />
      <h1 className="favourites__title">Favourites</h1>
      <p className="favourites__items-count">
        {favouriteGoods.length} items
      </p>
      <div className="favourites__products-container">
        {favouriteGoods.map((good:Good) => {
          return (
          <ProductCard good={good} key={good.id} />
          )
        })}
      </div>
    </div>
  )
}
