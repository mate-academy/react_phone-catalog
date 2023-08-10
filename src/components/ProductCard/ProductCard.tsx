/* eslint-disable max-len */
import { FC, useContext } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Product } from '../../types/Product';
import { getProductPath } from '../../helpers/getProductPath';
import { FavContext } from '../../context/FavContext';
import { CartContext } from '../../context/CartContext';
import './ProductCard.scss';
import { getGridColumn } from '../../helpers/getGridColumn';
import { applyDiscount } from '../../helpers/applyDiscount';

type Props = {
  product: Product,
  index: number,
};

export const ProductCard: FC<Props> = ({ product, index }) => {
  const {
    id,
    imageUrl,
    name,
    snippet,
    price,
    discount,
    screen,
    capacity,
    ram,
  } = product;

  const { favourites, addToFav, removeFromFav } = useContext(FavContext);
  const isFavourite = favourites.find(item => item.id === id);

  const handleFavStatus = () => {
    if (isFavourite) {
      removeFromFav(id);
    } else {
      addToFav(product);
    }
  };

  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);

  const isInCart = cartItems.find(item => item.id === id);
  const handleAddToCart = () => {
    if (isInCart) {
      removeFromCart(id);
    } else {
      addToCart(product);
    }
  };

  const discountPrice = applyDiscount(product);

  return (
    <div
      className={`product-card grid__item grid__item--desktop-${getGridColumn(index)}`}
      data-cy="cardsContainer"
    >
      <Link to={`/${getProductPath(product)}`} className="product-card__link">
        <div className="product-card__image-container">
          <img
            className="product-card__image"
            src={imageUrl}
            alt={snippet}
          />
        </div>
        <div className="product-card__title">{name}</div>
      </Link>
      <div className="product-card__price-container">
        {discount ? (
          <>
            <div className="product-card__price">{`$${discountPrice}`}</div>
            <div className="product-card__price product-card__price--crossed-out">{`$${price}`}</div>
          </>
        ) : (
          <div className="product-card__price">{`$${price}`}</div>
        )}
      </div>

      <div className="product-card__spec">
        <ul className="product-card__spec-list">
          <li className="product-card__spec-name">Screen</li>
          <li className="product-card__spec-name">Capacity</li>
          <li className="product-card__spec-name">RAM</li>
        </ul>
        <ul className="product-card__spec-list">
          <li className="product-card__spec-value">{screen}</li>
          <li className="product-card__spec-value">{capacity}</li>
          <li className="product-card__spec-value">{ram}</li>
        </ul>
      </div>

      <div className="product-card__actions">
        <button
          type="button"
          className={classNames('product-card__add-to-cart', {
            'product-card__add-to-cart--active': isInCart,
          })}
          onClick={handleAddToCart}
        >
          {isInCart ? 'Added to cart' : 'Add to cart'}
        </button>
        <div className="product-card__button-container">
          <button
            type="button"
            className={classNames('product-card__add-to-fav square-button square-button--medium', {
              'square-button--active product-card__add-to-fav--active': isFavourite,
            })}
            onClick={handleFavStatus}
            aria-label="add to favourites"
            data-cy="addToFavorite"
          />
        </div>
      </div>
    </div>
  );
};
