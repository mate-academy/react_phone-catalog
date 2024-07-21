import { Link } from 'react-router-dom';

import heart from '../../img/icons/heart.svg';
import heartFilled from '../../img/icons/heart-filled.svg';
import { Product } from '../../types/product';
import React from 'react';
import { useArrayContext } from '../../ArrayContext';
import classNames from 'classnames';

type Props = {
  product: Product;
  style: Record<string, string>;
  showOldPrice: boolean;
};

export const ProductCard: React.FC<Props> = ({
  product,
  style,
  showOldPrice,
}) => {
  const { favoriteProducts, cartProducts, handleLike, handleCart } =
    useArrayContext();

  return (
    <div className="product-card" style={style}>
      <Link className="product-card__link" to={`/phones/${product.itemId}`}>
        <img className="product-card__img" src={product.image} alt="" />
      </Link>
      <p className="product-card__name">{product.name}</p>
      <div className="product-card__price">
        <h3 className="product-card__new-price">${product.price}</h3>
        {showOldPrice && (
          <h3 className="product-card__old-price">${product.fullPrice}</h3>
        )}
      </div>
      <div className="product-card__underline"></div>
      <ul className="product-card__description">
        <li className="product-card__li">
          <p className="product-card__li-option">Screen</p>
          <p className="product-card__li-value">{product.screen}</p>
        </li>
        <li className="product-card__li">
          <p className="product-card__li-option">Capacity</p>
          <p className="product-card__li-value">{product.capacity}</p>
        </li>
        <li className="product-card__li">
          <p className="product-card__li-option">RAM</p>
          <p className="product-card__li-value">{product.ram}</p>
        </li>
      </ul>
      <div className="product-card__buttons">
        <button
          className={classNames('button-add-standart-size', {
            'button-add': !cartProducts.map(a => a.id).includes(product.id),
            'button-add__added': cartProducts
              .map(a => a.id)
              .includes(product.id),
          })}
          onClick={() => handleCart(product)}
        >
          {cartProducts.map(a => a.id).includes(product.id)
            ? 'Added to cart'
            : 'Add to cart'}
        </button>
        <button
          className={classNames('button-plus-size-standart-size', {
            'button-plus-size': !favoriteProducts
              .map(a => a.id)
              .includes(product.id),
            'button-plus-size__selected': favoriteProducts
              .map(a => a.id)
              .includes(product.id),
          })}
          onClick={() => handleLike(product)}
        >
          {favoriteProducts.map(a => a.id).includes(product.id) ? (
            <img className="heart" src={heartFilled} alt="" />
          ) : (
            <img className="heart" src={heart} alt="" />
          )}
        </button>
      </div>
    </div>
  );
};
