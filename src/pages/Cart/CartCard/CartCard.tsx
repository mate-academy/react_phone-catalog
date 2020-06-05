
import React from 'react';
import { Product } from '../../../interfaces';
import './CartCard.scss';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { removeAllFromCart, addToCart, removeOneFromCart } from '../../../store/cart';

export const CartCard = ({
  index,
  product,
  count
}: {
  index: number;
  product: Product;
  count: number;
}) => {
  const { imageUrl, name } = product;
  const dispatch = useDispatch();

  const handleDeleteButtonClick = () => {
    dispatch(removeAllFromCart(product))
  }

  const price = product.price - product.price * product.discount / 100;
  const total = price * count;

  const handleCountIncrease = () => {
    dispatch(addToCart(product));
  }
  const handleCountDecrease = () => {
    dispatch(removeOneFromCart(product));
  }

  let base;

  switch (product.type) {
    case 'phone':
      base = '/phones/';
      break;
    case 'tablet':
      base = '/tablets/';
      break;
    default:
      base = '/accessories/'
  }

  return (
    <div
      className="CartCard"
      style={{ top: `${index * 144}px` }}
    >
      <button
        className="CartCard__delete-button"
        onClick={handleDeleteButtonClick}
      >
      </button>
      <img
        className="CartCard__img"
        src={imageUrl}
        alt={name} />
      <Link
        to={base + product.id}
        className="CartCard__name">
        {name}
      </Link>
      <div className="CartCard__container">
        <button
          disabled={count <= 1}
          onClick={handleCountDecrease}
          className="CartCard__count-button CartCard__count-button--minus"
        >
        </button>
        <span
          className="CartCard__count"
        >{count}</span>
        <button
          className="CartCard__count-button CartCard__count-button--plus"
          onClick={handleCountIncrease}
        ></button>
      </div>
      <span
        className="CartCard__total"
      >{`$${total}`}</span>
    </div>
  )
}
