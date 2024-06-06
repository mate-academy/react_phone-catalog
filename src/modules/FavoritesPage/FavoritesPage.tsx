import React, { useContext, useMemo } from 'react';
import './FavoritesPage.scss';
import { StateContext } from '../../contexts/AppContext/AppContext';
import { BreadCrumb } from '../shared/BreadCrumb/BreadCrumb';
import { ProductList } from '../shared/ProductList';

export const FavoritesPage: React.FC = () => {
  const { favorites } = useContext(StateContext);

  const items = useMemo(() => {
    return favorites.length === 1 ? 'item' : 'items';
  }, [favorites.length]);

  return (
    <div className="favorites container">
      <BreadCrumb />

      <h1 className="favorites__title h1">Favorites</h1>
      <p className="favorites__items">
        {!!favorites.length
          ? `${favorites.length} ${items}`
          : `Your wish list is currently empty.`}
      </p>

      <div className="favorites__products">
        <ProductList products={favorites} />
      </div>
    </div>
  );
};
