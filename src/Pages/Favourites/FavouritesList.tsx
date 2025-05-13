import React from 'react';
import { Phone, Tablet, Accessories } from '../../../src/Types/BaseItem';
import { FavouritesItem } from './Favouritesitem';
import './FavouritesList.scss';

interface FavouritesListProps {
  favourites: (Phone | Tablet | Accessories)[];
  onRemove: (id: string) => void;
  onAddToCart: (id: string) => void;
}

export const FavouritesList: React.FC<FavouritesListProps> = ({
  favourites,
  onRemove,
  onAddToCart,
}) => {
  return (
    <div className="favourites-list">
      {favourites.length === 0 ?
        <p className="favourites-list__empty">No favourite items yet.</p>
      : favourites.map((item) => (
          <FavouritesItem
            key={item.id}
            item={item}
            onRemove={() => onRemove(item.id)}
            onAddToCart={() => onAddToCart(item.id)}
          />
        ))
      }
    </div>
  );
};
