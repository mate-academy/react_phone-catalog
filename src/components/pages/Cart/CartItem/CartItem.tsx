import { useState } from 'react';
import { Button } from '../../../../helpers/Button/Button';
import './CartItem.scss';

export const CartItem = ({ product }) => {
  const [count, setCount] = useState(1);

  console.log(product);

  return (
    <div className="cart-item">
      <div className="cart-item__sub-block">
        <Button
          className="no-border cart-item__close"
          image="/icons/Close.svg"
          alt="x"
        />
        <div className="cart-item__picture">
          <img
            src={`_new/${product.image}`}
            alt={product.itemId}
            className="cart-item__image"
          />
        </div>
        <p className="cart-item__title body14">
          {product.name}
        </p>
      </div>
      <div className="cart-item__sub-block">
        <div className="cart-item__count">
          <Button
            className="minus"
            onClick={() => {
              setCount(prev => prev - 1);
            }}
            image="/icons/Minus.svg"
            alt="-"
          />
          <div className="count">
            {count}
          </div>
          <Button
            className="plus"
            onClick={() => {
              setCount(prev => prev + 1);
            }}
            // onClick={moveRight}
            image="/icons/Plus.svg"
            alt="+"
          />
        </div>
        <h2 className="cart-item__price">
          $
          {product.price}
        </h2>
      </div>
    </div>
  );
};
