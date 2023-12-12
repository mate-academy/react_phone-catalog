/* eslint-disable react/button-has-type */
import React, { useContext } from 'react';
import classNames from 'classnames';

import { Product } from '../../types/Product';
import './ProductCard.scss';
import { ProductsContext } from '../ProductsContext';

type Props = {
  product: Product,
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const {
    favorites,
    setFavorites,
    carts,
    setCarts,
  } = useContext(ProductsContext);

  const isFavorite
    = favorites.find(productCurrent => productCurrent.id === product.id);

  const isCart
    = carts.find(productCurrent => productCurrent.id === product.id);

  const labelAddCartBtn = isCart ? 'Added to cart' : 'Add to cart';

  const hableFavoriteBtn = () => {
    if (!favorites.find(productCurrent => productCurrent.id === product.id)) {
      setFavorites([...favorites, product]);
    } else {
      const newFavorites
        = favorites.filter(productCurrent => productCurrent.id !== product.id);

      setFavorites(newFavorites);
    }
  };

  const hableAddCartBtn = () => {
    if (!carts.find(productCurrent => productCurrent.id === product.id)) {
      setCarts([...carts, { ...product, quantity: 1 }]);
    } else {
      const newCarts
        = carts.filter(productCurrent => productCurrent.id !== product.id);

      setCarts(newCarts);
    }
  };

  return (
    <article className="product-cards">
      <img
        src={`./new/${product.image}`}
        alt={product.name}
        className="product-cards__img"
      />

      <div className="product-cards__header">
        <h3 className="product-cards__title">
          {product.name}
        </h3>

        <div className="product-cards__prices">
          <p className="product-cards__new-price">
            {`$${product.price}`}
          </p>

          <p className="product-cards__old-price">
            {`$${product.fullPrice}`}
          </p>
        </div>
      </div>

      <div className="product-cards__separetor" />

      <div className="product-cards__specifications">
        <div className="product-cards__specification">
          <p className="product-cards__specification-title">
            Screen
          </p>

          <p className="product-cards__specification-value">
            {product.screen}
          </p>
        </div>

        <div className="product-cards__specification">
          <p className="product-cards__specification-title">
            Capacity
          </p>

          <p className="product-cards__specification-value">
            {product.capacity}
          </p>
        </div>

        <div className="product-cards__specification">
          <p className="product-cards__specification-title">
            RAM
          </p>

          <p className="product-cards__specification-value">
            {product.ram}
          </p>
        </div>
      </div>

      <div className="product-cards__add-panel">
        <button
          onClick={hableAddCartBtn}
          className={classNames(
            'product-cards__btn-cart',
            'button button__primary',
            {
              'button__primary--active': isCart,
            },
          )}
        >
          {labelAddCartBtn}
        </button>

        <button
          onClick={hableFavoriteBtn}
          className="product-cards__btn-favorite button"
        >
          <div className={
            classNames(
              'icon',
              'icon__favorites',
              {
                'icon__favorites--active': isFavorite,
              },
            )
          }
          />
        </button>
      </div>
    </article>
  );
};
