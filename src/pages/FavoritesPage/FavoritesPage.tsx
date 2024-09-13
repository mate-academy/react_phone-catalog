import React from 'react';
import { useFavorites } from '../../context/FavoritesContext';
import './FavoritesPage.scss';
import { Cart } from '../../components/Cart';
import { BackButton } from '../../components/BackButton';
import { EmptyPage } from '../EmptyPage';
import { useFooter } from '../../context/FooterContext';

export const FavoritesPage: React.FC = () => {
  const { favorites } = useFavorites();
  const { setIsShow } = useFooter();

  if (favorites.length === 0) {
    setIsShow(false);
  } else {
    setIsShow(true);
  }

  return (
    <div className="favorites container">
      <BackButton title="Favorites" />
      <h2 className="favorites__title">Favorites</h2>
      <p className="favorites__length">{favorites.length} items</p>
      <div className="favorites__wrapper">
        {favorites.length > 0 ? (
          favorites.map((product) => (
            <Cart key={product.id} product={product} showDiscount={true} />
          ))
        ) : (
          <EmptyPage />
        )}
      </div>
    </div>
  );
};
