import React from 'react';
import { useFavorites } from '../../context/FavoritesContext';
import './FavoritesPage.scss';
import { Cart } from '../../components/Cart';
import { BackButton } from '../../components/BackButton';
import { EmptyPage } from '../EmptyPage';

export const FavoritesPage: React.FC = () => {
  const { favorites } = useFavorites();

  return (
    <div className="favorites container">
      <BackButton title="Favorites" />
      <h2 className="favorites__title">Favorites</h2>
      <div className="favorites__wrapper">
        {favorites.length > 0 ? (
          favorites.map((phone) => (
            <Cart key={phone.id} phone={phone} showDiscount={true} />
          ))
        ) : (
          <EmptyPage />
        )}
      </div>
    </div>
  );
};
