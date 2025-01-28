import React, { useContext, useEffect, useState } from 'react';
import cn from 'classnames';

import { Product } from '../../types/ProductsType';
import { Link, useSearchParams } from 'react-router-dom';
import { FavouritesContext } from '../../contexts/FavouritesContexr';
import { CartContext } from '../../contexts/CartContext';
import { CartType } from '../../types/CartType';

type Props = {
  product: Product;
  className?: string;
  handleDeleteProduct?: (el: string) => void;
};

export const Card: React.FC<Props> = ({
  product,
  className,
  handleDeleteProduct,
}) => {
  const [priceDiscount, setPriceDiscount] = useState(false);
  const [searchParams] = useSearchParams();
  const { favourites, setFavourites } = useContext(FavouritesContext);
  const { cart, setCart } = useContext(CartContext);

  const deviceCartFind = () => {
    return cart.some(
      (foundItemId: CartType) => foundItemId.itemId === product.itemId,
    );
  };

  const deviceFavouritesFind = () => {
    return favourites.some(
      (foundItemId: string) => foundItemId === product.itemId,
    );
  };

  const [isInCart, setIsInCart] = useState(deviceCartFind());
  const [isInFavourites, setIsInFavourites] = useState(deviceFavouritesFind());

  useEffect(() => {
    if (product.price && product.price !== product.fullPrice) {
      setPriceDiscount(true);
    } else {
      setPriceDiscount(false);
    }
  }, [product]);

  const handleAddToCart = (itemId: string) => {
    if (isInCart) {
      setCart((prev: CartType[]) =>
        prev.filter(cartItem => cartItem.itemId !== itemId),
      );
    } else {
      setCart((prev: CartType[]) => [...prev, { itemId, count: 1 }]);
    }

    setIsInCart(!isInCart);
  };

  const handleFavourites = (itemId: string) => {
    if (isInFavourites) {
      setFavourites((prev: string[]) =>
        prev.filter((deviceItemId: string) => deviceItemId !== itemId),
      );
      if (handleDeleteProduct) {
        handleDeleteProduct(itemId);
      }
    } else {
      setFavourites((prev: string[]) => [...prev, itemId]);
    }

    setIsInFavourites(!isInFavourites);
  };

  return (
    <div className={`card ${className}`}>
      <div className="card__block">
        <Link
          to={`../${product.category}/${product.itemId}`}
          className="card__img-block"
          state={{ search: searchParams.toString() }}
        >
          <img className="card__img" src={product.image} />
        </Link>
        <div className="card__content">
          <Link
            to={`../${product.category}/${product.itemId}`}
            className="card__title"
            state={{ search: searchParams.toString() }}
          >
            {product.name}
          </Link>
          <div className="card__price-block">
            <div className="card__price">
              ${priceDiscount ? product.price : product.fullPrice}
            </div>
            {priceDiscount && (
              <div className="card__price--discount">${product.fullPrice}</div>
            )}
          </div>
          <div className="card__line"></div>
          <div className="card__info">
            <div className="card__characteristic">
              Scren:
              <label className="card__characteristic__label">
                {product.screen}
              </label>
            </div>
            <div className="card__characteristic">
              Capacity:
              <label className="card__characteristic__label">
                {product.capacity}
              </label>
            </div>
            <div className="card__characteristic">
              RAM:
              <label className="card__characteristic__label">
                {product.ram}
              </label>
            </div>
          </div>
          <div className="card__buttons">
            <button
              className={cn('card__button-add-to-cart', {
                'card__button-add-to-cart--is-active': isInCart,
              })}
              onClick={() => {
                handleAddToCart(product.itemId);
              }}
            >
              {isInCart ? 'Added' : ' Add to cart'}
            </button>
            <button
              className="card__button-add-to-fovourites"
              onClick={() => {
                handleFavourites(product.itemId);
              }}
            >
              <div
                className={cn('icon icon--fovourites', {
                  'icon--fovourites--is-active': isInFavourites,
                })}
              ></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
