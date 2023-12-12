/* eslint-disable react/button-has-type */
import React, { useContext } from 'react';
import './CartCard.scss';
import classNames from 'classnames';
import { ProductsContext } from '../ProductsContext';
import { CartProduct } from '../../types/CartProduct';

type Props = {
  product: CartProduct,
};

export const CartCard: React.FC<Props> = ({ product }) => {
  const { carts, setCarts } = useContext(ProductsContext);

  const handleDeleteBtn = () => {
    const newCarts
      = carts.filter(productCurrent => productCurrent.id !== product.id);

    setCarts(newCarts);
  };

  const handleMinusBtn = () => {
    setCarts(prevCarts => {
      const updatedCarts = prevCarts.map(cartProduct => (
        cartProduct.id === product.id
          ? { ...cartProduct, quantity: cartProduct.quantity - 1 }
          : cartProduct
      ));

      return updatedCarts;
    });
  };

  const handlePlusBtn = () => {
    setCarts(prevCarts => {
      const updatedCarts = prevCarts.map(cartProduct => (
        cartProduct.id === product.id
          ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
          : cartProduct
      ));

      return updatedCarts;
    });
  };

  return (
    <article className="cart-card">
      <div className="cart-card__left-section">
        <button
          onClick={handleDeleteBtn}
          className="cart-card__delete-btn"
        >
          <div className="icon icon__close" />
        </button>

        <img
          src={`./new/${product.image}`}
          alt={product.name}
          className="cart-card__img"
        />

        <p className="cart-card__name">
          {product.name}
        </p>
      </div>

      <div className="cart-card__rigth-section">
        <div className="cart-card__count-contoller">
          <button
            className={classNames(
              'cart-card__contoller-btn',
              'button',
              { 'button--disable': product.quantity === 1 },
            )}
            onClick={handleMinusBtn}
            disabled={product.quantity === 1}
          >
            <div className="icon icon__minus" />
          </button>

          <p className="cart-card__count">
            {product.quantity}
          </p>

          <button
            className={classNames(
              'cart-card__contoller-btn',
              'button',
              // { 'button--disable': product.quantity === 1 },
            )}
            onClick={handlePlusBtn}
          // disabled={product.quantity === 1}
          >
            <div className="icon icon__plus" />
          </button>
        </div>

        <p className="cart-card__price">
          {`$${product.price}`}
        </p>
      </div>
    </article>
  );
};
