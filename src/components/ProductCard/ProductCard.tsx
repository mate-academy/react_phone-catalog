import classNames from 'classnames';
import React, { useContext } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Product } from '../../types/Product';
import { CartContext } from '../CartContext';
import { FavContext } from '../FavContext';
import './ProductCard.scss';

type Props = {
  product: Product,
};

export const ProductCard: React.FC<Props> = ({
  product,
}) => {
  const {
    id,
    name,
    type,
    price,
    discount,
    imageUrl,
    ram,
    screen,
    capacity,
  } = product;

  const { productId } = useParams();

  const { pathname } = useLocation();
  const showFullPath
    = pathname === '/'
    || pathname === '/favorites'
    || !productId;

  const linkAddress
    = showFullPath
      ? `../${type}s/${id}`
      : `../${id}`;

  const { favs, handleFavs } = useContext(FavContext);
  const { cart, handleCart } = useContext(CartContext);

  const currentPrice = discount > 0
    ? price * (1 - discount / 100)
    : price;

  const inFavs = favs.includes(id);
  const inCart = cart.some(item => item.id === product.id);

  return (
    <div className="product-card">
      <Link
        to={linkAddress}
        className="product-card__image-container"
      >
        <img
          src={imageUrl}
          alt="phone"
          className="product-card__image"
        />
      </Link>
      <Link
        to={linkAddress}
        className="product-card__title--link"
      >
        <h2 className="product-card__title">
          {name}
        </h2>
      </Link>
      <div className="product-card__prices">
        <div
          className="product-card__current-price"
        >
          {`$${currentPrice}`}
        </div>
        <div
          className="product-card__old-price"
        >
          {discount > 0 && `$${price}`}
        </div>
      </div>
      <div className="product-card__divider" />
      <div className="product-card__specs">
        <div className="spec">
          <p className="spec__name">
            Screen
          </p>
          <p className="spec__value">
            {screen}
          </p>
        </div>
        <div className="spec">
          <p className="spec__name">
            Capacity
          </p>
          <p className="spec__value">
            {capacity}
          </p>
        </div>
        <div className="spec">
          <p className="spec__name">
            RAM
          </p>
          <p className="spec__value">
            {ram}
          </p>
        </div>
      </div>
      <div className="product-card__buttons">
        <button
          aria-label="handleCartBtn"
          type="button"
          className={classNames(
            'product-card__button',
            'product-card__button--add-to-cart',
            {
              'product-card__button--add-to-cart_added':
                inCart,
            },
          )}
          onClick={() => handleCart(product)}
        >
          {`Add${inCart ? 'ed' : ''} to cart`}
        </button>
        <button
          aria-label="addToFavsBtn"
          type="button"
          data-cy="addToFavorite"
          className={classNames(
            'product-card__button',
            'product-card__button--add-to-favs',
            {
              'product-card__button--add-to-favs_added':
                inFavs,
            },
          )}
          onClick={() => handleFavs(id)}
        />
      </div>
    </div>
  );
};
