import React, { useContext } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import './ProductCard.scss';

import {
  ReactComponent as Favourites,
} from '../../images/icons/favourites.svg';
import {
  ReactComponent as FavouritesFilled,
} from '../../images/icons/favourites_filled.svg';

import { Product } from '../../types/Product';
import { ShopContext } from '../../ShopContext';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const {
    phoneId,
    id,
    category,
    itemId,
    name,
    fullPrice,
    price,
    screen,
    capacity,
    ram,
    image,
  } = product;

  const {
    cart,
    addToCart,
    favourites,
    addToFavourites,
    removeFromFavourites,
  } = useContext(ShopContext);

  const isButtonActive = cart.filter(p => p.id === id).length > 0;
  const buttonText = isButtonActive ? 'Added to cart' : 'Add to cart';
  const isInFavourites = favourites.filter(p => p.id === id).length > 0;

  const handleFavouriteButtonClick = () => {
    if (isInFavourites) {
      removeFromFavourites(phoneId);
    } else {
      addToFavourites(phoneId);
    }
  };

  return (
    <div className="product" data-cy="cardsContainer">
      <Link
        className="product__image"
        to={`../../${category}/${itemId}`}
      >
        <img src={`new/${image}`} alt={name} />
      </Link>
      <div className="product__name--container">
        <Link className="product__name" to={`../../${category}/${itemId}`}>
          {name}
        </Link>
      </div>
      <div className="product__prices">
        <span className="product__price">
          {`$${price}`}
        </span>
        <span className="product__price product__price--old">
          {`$${fullPrice}`}
        </span>
      </div>
      <div className="product__features">
        <div className="product__feature">
          <span className="product__feature-name">Screen</span>
          <span className="product__feature-value">{screen}</span>
        </div>
        <div className="product__feature">
          <span className="product__feature-name">Capacity</span>
          <span className="product__feature-value">{capacity}</span>
        </div>
        <div className="product__feature">
          <span className="product__feature-name">RAM</span>
          <span className="product__feature-value">{ram}</span>
        </div>
      </div>
      <div className="product__actions">
        <button
          className={cn('product__buy button button--primary',
            { 'button--primary--active': isButtonActive })}
          type="button"
          onClick={() => (addToCart(phoneId))}
        >
          {buttonText}
        </button>
        <button
          className="product__fav button button__fav"
          type="button"
          onClick={handleFavouriteButtonClick}
        >
          {isInFavourites
            ? <FavouritesFilled />
            : <Favourites /> }
        </button>
      </div>
    </div>
  );
};
