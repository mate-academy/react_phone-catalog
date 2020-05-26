
import React from 'react';
import { Product } from '../../interfaces';
import './CartCard.scss';
import {Link} from 'react-router-dom';

export const CartCard = ({
  index,
  cart,
  setCart,
  product,
  count
}: {
  index: number;
  cart:Product[];
  product: Product;
  count: number;
  setCart:(cart:Product[]) => void
}) => {
  const { imageUrl, name } = product;

  const handleDeleteButtonClick =() => {
    setCart([...cart].filter(item => item.id !== product.id))
  }

  const price = product.price - product.price * product.discount / 100;

  const total = price * count;

  const handleCountIncrease = () => {
    setCart([...cart, product]);
  }
  const handleCountDecrease = () => {
    let temp = [...cart]
    temp.splice(cart.findIndex(item => product.id === item.id), 1)
    setCart(temp);
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
    style={{top: `${index * 144}px`}}
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

      <button
      disabled={count <= 1}
      onClick={handleCountDecrease}
      className={count <= 1
        ? "CartCard__count-button CartCard__count-button--disabled"
        : "CartCard__count-button"
      }
      >̶  </button>
  <span
  className="CartCard__count"
  >{count}</span>
      <button
      className="CartCard__count-button"
      onClick={handleCountIncrease}
      >+</button>
      <span
      className="CartCard__total"
      >{`$${total}`}</span>
    </div>
  )
}
