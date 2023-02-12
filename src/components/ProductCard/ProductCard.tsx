import React, { useContext, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.scss';
import { Product } from '../../types/Product';
import { Context } from '../../helpers/ContextProvider';

type Props = {
  product: Product,
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const {
    imageUrl,
    name,
    id,
    price,
    screen,
    capacity,
    ram,
    discount,
  } = product;

  const {
    cart,
    favorite,
    cartAdd,
    favoriteAdd,
  } = useContext(Context);

  const isInCart = cart?.some(cartProduct => cartProduct.id === product.id);
  const isInFavorite
    = favorite?.some(favProduct => favProduct.id === product.id);

  const buttons = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (buttons.current) {
      buttons.current.addEventListener('click', (event) => {
        event.preventDefault();
      });
    }
  }, []);

  const actualPrice = discount !== 0
    ? Math.round(price * ((100 - discount) / 100))
    : price;

  return (
    <Link
      to={`/product/${id}`}
      className="product-card"
      data-cy="cardsContainer"
    >
      <img
        src={`./${imageUrl}`}
        alt="product"
        className="product-card__image"
      />

      <div className="product-card__bottom">
        <h4 className="product-card__title">
          {name}
        </h4>
        <div className="product-card__price">
          <h2 className="product-card__new-price">
            {`$${actualPrice}`}
          </h2>
          {discount !== 0 && (
            <h2 className="product-card__old-price">
              {`$${price}`}
            </h2>
          )}
        </div>

        <span className="line product-card__line" />

        <div className="product-card__info">
          <span className="product-card__property">Screen</span>
          <span className="product-card__value">{screen}</span>
        </div>

        <div className="product-card__info">
          <span className="product-card__property">Capacity</span>
          <span className="product-card__value">{capacity}</span>
        </div>

        <div className="product-card__info">
          <span className="product-card__property">Ram</span>
          <span className="product-card__value">{ram}</span>
        </div>

        <div ref={buttons} className="product-card__buttons">
          {isInCart ? (
            <button
              type="button"
              className="button button--is-success product-card__cart-button"
              onClick={() => cartAdd(product)}
            >
              Added to cart
            </button>
          ) : (
            <button
              type="button"
              className="button button--is-dark product-card__cart-button"
              onClick={() => cartAdd(product)}
            >
              Add to cart
            </button>
          )}
          <button
            type="button"
            data-cy="addToFavorite"
            className="button product-card__favorite-button"
            onClick={() => favoriteAdd(product)}
          >
            {isInFavorite ? (
              <img src="./assets/favorites-active.svg" alt="favorite-icon" />
            ) : (
              <img src="./assets/favorites.svg" alt="favorite-icon" />
            )}
          </button>
        </div>
      </div>
    </Link>
  );
};
