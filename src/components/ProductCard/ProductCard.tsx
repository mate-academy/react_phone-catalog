import React, { useState } from 'react';
import classNames from 'classnames';
import { Product } from '../../Types/Product';
import './ProductCard.scss';
import favorite from '../../images/favorite.svg';
import { useCart } from '../Contexsts/CartContext';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { addToCart } = useCart();
  const [active, setActive] = useState(false);

  const handleClick = () => {
    addToCart(product.id);
    setActive(!active);
  };

  return (
    <div className="product__card" data-cy="cardsContainer">
      <div className="product__card--top">
        <img
          className="product__card--img"
          src={`_new/${product.image}`}
          alt="card"
        />
        <p className="product__card--name">{product.name}</p>
        <div className="product__card--price">
          <div className="product__card--price-total">{product.price}</div>
          <div className="product__card--price-full">{`$${product.fullPrice}`}</div>
        </div>
      </div>

      <div className="product__card--bottom">
        <div className="product__card--desc">
          <div className="product__card--desc-item">
            Screen
            <p className="product__card--desc-detail">{product.screen}</p>
          </div>
          <div className="product__card--desc-item">
            Capacity
            <p className="product__card--desc-detail">{product.capacity}</p>
          </div>
          <div className="product__card--desc-item">
            RAM
            <p className="product__card--desc-detail">{product.ram}</p>
          </div>
        </div>
      </div>

      <div className="product__card--button">
        <button
          type="button"
          className={classNames('product__card--button-cart', {
            'is-active': active,
          })}
          onClick={() => {
            handleClick();
          }}
        >
          Add to cart
        </button>
        <img src={favorite} alt="add to favorite" />
      </div>
    </div>
  );
};
