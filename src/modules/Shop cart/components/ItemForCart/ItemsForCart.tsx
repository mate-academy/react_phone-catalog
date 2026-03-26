import { useContext } from 'react';
import { CartContext } from '../../../../contexts/CartContext';
import React from 'react';
import Items from './ItemsForCart.module.scss';
import cn from 'classnames';
import { Link } from 'react-router-dom';

export const ItemsForCart: React.FC = () => {
  const { cart, removeFromCart, decreaseQuantity, increaseQuantity } =
    useContext(CartContext);

  return (
    <div className={Items.items}>
      {cart.map(item => (
        <div className={Items.items__item} key={item.itemId}>
          <div className={Items.item__content}>
            <div className={Items.item__leftSide}>
              <button
                className={Items.item__remove}
                onClick={() => removeFromCart(item.itemId)}
              ></button>
              <Link
                to={`/${item.category}/${item.itemId}`}
                className={Items.item__img}
              >
                <img
                  src={item.image}
                  alt={item.itemId}
                  className={Items.item__img}
                />
              </Link>
              <p className={Items.item__name}>{item.name}</p>
            </div>

            <div className={Items.item__RightSide}>
              <div className={Items.item__count}>
                <button
                  className={cn(Items.item__button, Items.item__button__minus, {
                    [Items.item__button__minus__disabled]: item.quantity === 1,
                  })}
                  onClick={() => {
                    decreaseQuantity(item.itemId);
                  }}
                ></button>
                <p className={Items.item__amount}>{item.quantity}</p>
                <button
                  className={cn(Items.item__button, Items.item__button__plus)}
                  onClick={() => {
                    increaseQuantity(item.itemId);
                  }}
                ></button>
              </div>
              <div className={Items.item__total}>
                ${item.price * item.quantity}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
