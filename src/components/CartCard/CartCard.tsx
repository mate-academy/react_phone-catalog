
import React from 'react';
import { Product } from '../../interfaces';
import './CartCard.scss';

export const CartCard = ({
  cart,
  setCart,
  product,
  count
}: {
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


  return (
    <div className="CartCard">
      <button
      className="CartCard__delete-button"
      onClick={handleDeleteButtonClick}
      >

      </button>
    <img
    className="CartCard__img"
    src={imageUrl}
    alt={name} />
      <p
      className="CartCard__name"
      >
        {name}
        </p>
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
