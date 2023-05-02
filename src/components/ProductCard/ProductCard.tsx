import classNames from 'classnames';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../cart-context';
import {
  ReactComponent as IconHeartActive,
} from '../../images/icons/heart_like-active.svg';
import {
  ReactComponent as IconHeart,
} from '../../images/icons/heart_like.svg';
import { Product } from '../../types/Product';
import './ProductCard.scss';

const imagesFolder = 'http://localhost:3000/';

interface Props {
  product: Product;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  const {
    addToCart,
    cartItems,
    favouritesItems,
    addToFavourites,
    removeFromFavourites,
  } = useContext(ShopContext);

  const {
    imageUrl, name, price, discount, screen, capacity, ram, id, type,
  }
    = product;

  const addedToCart = cartItems.some((cartItem) => cartItem.id === id);
  const isInFavourites = favouritesItems.some(
    (favouritesItem) => favouritesItem.id === id,
  );

  const newPrice = price * (1 - discount / 100);

  let cardLinkSection = '';

  switch (type) {
    case 'phone':
      cardLinkSection = 'phones';
      break;

    case 'tablet':
      cardLinkSection = 'tablets';
      break;

    case 'accessory':
      cardLinkSection = 'accessories';
      break;

    default:
      break;
  }

  return (
    <div className="product-card" data-cy="cardsContainer">
      <div className="product-card__container">
        <Link to={`/${cardLinkSection}/${id}`}>
          <img
            src={imagesFolder + imageUrl}
            alt={name}
            className="product-card__image"
          />
        </Link>

        <Link to={`/${cardLinkSection}/${id}`} className="product-card__name">
          {name}
        </Link>
      </div>

      <div className="product-card__container">
        <div className="product-card__price">
          <div className="product-card__new-price">{`$${newPrice}`}</div>

          {!!discount && (
            <div className="product-card__old-price">{`$${price}`}</div>
          )}
        </div>

        <div className="product-card__info">
          <div className="product-card__info-element">
            <div className="product-card__info-name">Screen</div>

            <div className="product-card__info-value">{screen}</div>
          </div>

          <div className="product-card__info-element">
            <div className="product-card__info-name">Capacity</div>

            <div className="product-card__info-value">{capacity}</div>
          </div>

          <div className="product-card__info-element">
            <div className="product-card__info-name">Ram</div>

            <div className="product-card__info-value">{ram}</div>
          </div>
        </div>

        <div className="product-card__buttons">
          <button
            className={classNames('product-card__add-to-cart', {
              'product-card__add-to-cart--is_added': addedToCart,
            })}
            type="button"
            onClick={() => addToCart(id)}
          >
            {addedToCart ? 'Added to cart' : 'Add to cart'}
          </button>

          <button
            className="product-card__add-to-favourites"
            onClick={() => {
              if (isInFavourites) {
                removeFromFavourites(id);
              } else {
                addToFavourites(id);
              }
            }}
            type="button"
          >
            {isInFavourites ? (
              <IconHeartActive
                className="product-card__add-to-favourites-icon--active"
              />
            ) : (
              <IconHeart className="product-card__add-to-favourites-icon" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
