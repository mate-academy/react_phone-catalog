import React, { useCallback, useState } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { ProductType } from '../../types/ProductType';
import { ProductSpecs } from '../ProductSpecs';
import {
  addFavourite,
  isFavourite,
  removeFavourite,
} from '../../api/favourites';
import { addToCart, isInCart, removeFromCart } from '../../api/cart';
import './ProductCard.scss';

type Props = {
  product: ProductType;
  wide?: boolean;
};

export const ProductCard: React.FC<Props> = React.memo(({ product, wide }) => {
  const { itemId, image, name, price, fullPrice, screen, capacity, ram } =
    product;

  const [inFavourites, setInFavourites] = useState(isFavourite(itemId));
  const [inCart, setInCart] = useState(isInCart(itemId));

  const handleFavourite = useCallback(() => {
    if (inFavourites) {
      removeFavourite(itemId);
    } else {
      addFavourite(itemId);
    }

    setInFavourites(isFavourite(itemId));
  }, [itemId, inFavourites]);

  const handleCart = useCallback(() => {
    if (inCart) {
      removeFromCart(itemId);
    } else {
      addToCart(itemId);
    }

    setInCart(isInCart(itemId));
  }, [itemId, inCart]);

  return (
    <div className={classNames('product-card', { 'product-card--wide': wide })}>
      <Link to={`/product/${itemId}`} className="product-card__link">
        <img src={image} alt={name} className="product-card__image" />
      </Link>

      <div className="product-card__container">
        <p className="product-card__title body-text">{name}</p>

        <div className="product-card__prices">
          <h3 className="product-card__price">${price}</h3>
          {fullPrice && (
            <h3 className="product-card__price--discount">${fullPrice}</h3>
          )}
        </div>

        <div className="product-card__line"></div>

        <ProductSpecs
          specs={{
            Screen: screen,
            Capacity: capacity,
            RAM: ram,
          }}
        />

        <div className={classNames('product-card__buttons')}>
          <button
            className={classNames('button--wide', {
              'button--white button--white--small-padding button--green-text':
                inCart,
            })}
            onClick={handleCart}
          >
            {inCart ? 'Added to cart' : 'Add to cart'}
          </button>
          <button className="button--white" onClick={handleFavourite}>
            <img
              className="product-card__fav"
              src={
                inFavourites
                  ? 'icons/favourite_filled.svg'
                  : 'icons/favourite.svg'
              }
              alt="Favourite icon"
            />
          </button>
        </div>
      </div>
    </div>
  );
});
