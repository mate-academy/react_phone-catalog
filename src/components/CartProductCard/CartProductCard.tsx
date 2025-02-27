import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useDispatch } from '../../hooks/hooks';
import { CartProduct } from '../../types/Product';
import './CartProductCard.scss';

type Props = {
  product: CartProduct;
};

export const CartProductCard: React.FC<Props> = React.memo(({ product }) => {
  const { name, image, quantity, price, itemId, category } = product;
  const dispatch = useDispatch();

  return (
    <div className="cart-product">
      <div className="cart-product__top">
        <div
          className="cart-product__icon"
          onClick={() => {
            dispatch({ type: 'deleteFromCart', payload: itemId });
          }}
        ></div>
        <Link
          to={`/${category}/${itemId}`}
          className="cart-product__picture"
          style={{ backgroundImage: `url(${image})` }}
        ></Link>
        <Link to={`/${category}/${itemId}`} className="cart-product__name">
          {name}
        </Link>
      </div>
      <div className="cart-product__bottom">
        <div className="cart-product__count">
          <div
            className={classNames(
              'cart-product__button cart-product__button--minus',
              { 'cart-product__button--disabled': quantity === 1 },
            )}
            onClick={() => {
              dispatch({ type: 'decreaseQuantity', payload: itemId });
            }}
          ></div>
          <div className="cart-product__quantity">{quantity}</div>
          <div
            className="cart-product__button cart-product__button--plus"
            onClick={() => {
              dispatch({ type: 'increaseQuantity', payload: itemId });
            }}
          ></div>
        </div>
        <div className="cart-product__price">{`$${price * quantity}`}</div>
      </div>
    </div>
  );
});

CartProductCard.displayName = 'CartProductCard';
