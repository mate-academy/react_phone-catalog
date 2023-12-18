/* eslint-disable react/button-has-type */
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import { Product } from '../../types/Product';
import './ProductCard.scss';
import { ProductsContext } from '../ProductsContext';
import { addProduct } from '../../helpers/addFunction/addProduct';
import { CartProduct } from '../../types/CartProduct';

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
    = favorites.find(productCurrent => (
      productCurrent.itemId === product.itemId
    ));

  const isCart
    = carts.find(productCurrent => productCurrent.id === product.id);

  const labelAddCartBtn = isCart ? 'Added to cart' : 'Add to cart';

  const hableFavoriteBtn = () => {
    addProduct<Product>(product, favorites, setFavorites);
  };

  const hableAddCartBtn = () => {
    addProduct<CartProduct>({ ...product, quantity: 1 }, carts, setCarts);
  };

  return (
    <article className="product-cards">
      <NavLink
        to={`/${product.category}/${product.phoneId}`}
      >
        <img
          src={`./new/${product.image}`}
          alt={product.name}
          className="product-cards__img"
        />
      </NavLink>

      <div className="product-cards__header">
        <NavLink
          to={`/${product.category}/${product.phoneId}`}
        >
          <h3 className="product-cards__title">
            {product.name}
          </h3>
        </NavLink>

        <div className="product-cards__prices">
          <p className="product-cards__new-price">
            {`$${product.price}`}
          </p>

          <p className="product-cards__old-price">
            {`$${product.fullPrice}`}
          </p>
        </div>
      </div>

      <div className="product-cards__separator" />

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
