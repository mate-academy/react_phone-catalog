import React from 'react';
import { CartProps, useDeviceContext } from '../../DeviceContext/DeviceContext';
import './ShoppingCart.scss';
import classNames from 'classnames';

type Props = {
  shopCart: CartProps;
};

export const ShoppingCart: React.FC<Props> = ({ shopCart }) => {
  const { id, image, name, price, count } = shopCart;
  const { removeProductFromCart, handleIncrement, handleDecrement } =
    useDeviceContext();

  return (
    <div className="ShoppingCart">
      <div className="ShoppingCart__top">
        <button
          className="ShoppingCart__button-remove icon icon--remove"
          onClick={() => removeProductFromCart(id)}
        ></button>
        <img className="ShoppingCart__image" src={image} alt="image" />
        <p className="ShoppingCart__title body-text">{name}</p>
      </div>
      <div className="ShoppingCart__bottom">
        <div className="ShoppingCart__counter">
          <div className="ShoppingCart__counter--buttons">
            <button
              className={classNames(
                'ShoppingCart__counter--button',
                'ShoppingCart__counter--button--minus',
                'icon icon--minus',
                {
                  'icon--minus--disabled button--disabled': count === 1,
                },
              )}
              onClick={() => handleDecrement(shopCart)}
            ></button>
            <p className="ShoppingCart__counter--count">{count}</p>
            <button
              className={classNames(
                'ShoppingCart__counter--button',
                'ShoppingCart__counter--button--plus',
                'icon icon--plus',
              )}
              onClick={() => handleIncrement(shopCart)}
            ></button>
          </div>
        </div>

        <h3 className="ShoppingCart__price">{`$${price * count}`}</h3>
      </div>
    </div>
  );
};
