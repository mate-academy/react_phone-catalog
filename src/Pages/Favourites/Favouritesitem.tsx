import React from 'react';
import { Link } from 'react-router-dom';
import { useCartContext } from '../../../src/CartContext/useCartContext';
import { BaseItem } from '../../Types/BaseItem';
import './Favourites.scss';

interface FavouritesItemProps {
  item: BaseItem;
  onRemove: (id: string) => void;
  onAddToCart: (id: string) => void;
}

export const FavouritesItem: React.FC<FavouritesItemProps> = ({ item }) => {
  const { addToCart, removeFromFavorites } = useCartContext();

  const itemLink =
    'screen' in item ? `/phones/${(item as BaseItem).id}`
    : 'capacity' in item ? `/tablets/${(item as BaseItem).id}`
    : `/accessories/${(item as BaseItem).id}`;

  return (
    <div className="favourites-card">
      <Link to={itemLink}>
        <img
          src={item.images?.[0] || '/img/product-not-found.png'}
          alt={item.name}
          className="favourites-card__image"
        />
        <div className="favourites-card__info">
          <h3 className="favourites-card__name">{item.name}</h3>
          <div className="favourites-card__price-wrapper">
            <span className="favourites-card__price">
              ${item.priceDiscount}
            </span>
            <span className="favourites-card__price--old">
              ${item.priceRegular}
            </span>
          </div>

          {'screen' in item && (
            <p className="favourites-card__detail">
              <span>Screen</span> <span>{item.screen}</span>
            </p>
          )}
          {'capacity' in item && (
            <p className="favourites-card__detail">
              <span>Capacity</span> <span>{item.capacity}</span>
            </p>
          )}
          {'ram' in item && (
            <p className="favourites-card__detail">
              <span>RAM</span> <span>{item.ram}</span>
            </p>
          )}
        </div>
      </Link>

      <div className="favourites-card__actions">
        <button
          className="favourites-card__btn-primary"
          onClick={() => addToCart(item)}
        >
          Add to cart
        </button>
        <img
          className="favourites-card__btn-favorite"
          onClick={() => removeFromFavorites(item.id)}
          src="./img/AddFavorAct.png"
          alt=""
        />
      </div>
    </div>
  );
};
