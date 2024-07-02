import React from 'react';
import './CartElement.scss';
import classNames from 'classnames';
import { CartItem } from '../../../../types/CartItem';
import { useAppContext } from '../../../../store/store';

type Props = {
  data: CartItem;
};

export const CartElement: React.FC<Props> = ({ data }) => {
  const { id, image, name, price, count } = data;
  const {
    methods: { removeProductFromCart, handleIncrement, handleDecrement },
  } = useAppContext();

  return (
    <div className="cart-item">
      <div className="cart-item__top">
        <button
          className="cart-item__remove icon icon--close"
          onClick={() => removeProductFromCart(id)}
        ></button>
        <img className="cart-item__image" src={image} alt="image" />
        <p className="cart-item__title">{name}</p>
      </div>
      <div className="cart-item__bottom">
        <div className="cart-item__counter">
          <div className="cart-item__counter--buttons">
            <button
              className={classNames(
                'cart-item__counter--button',
                'icon icon--minus',
                {
                  'icon--minus-disabled': count === 1,
                },
              )}
              onClick={() => handleDecrement(data)}
            ></button>
            <p className="cart-item__count">{count}</p>
            <button
              className={classNames(
                'cart-item__counter--button',
                'icon icon--plus',
              )}
              onClick={() => handleIncrement(data)}
            ></button>
          </div>
        </div>

        <h3 className="cart-item__price">{`$${price * count}`}</h3>
      </div>
    </div>
  );
};
