import React, { useContext } from 'react';
import { FavouritesContext } from './../../components/FavouritesContext';
import { ProductCard } from './../../components/ProductCard/ProductCard';

export const Favourites = () => {
  const {favouriteGoods} = useContext(FavouritesContext);

  return(
    <div className="favourites__products">
      {favouriteGoods.map((good:Good) => {
        return (
        <ProductCard good={good} key={good.id} />
        )
      })}
    </div>
  )
}
