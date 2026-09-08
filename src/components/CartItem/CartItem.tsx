import './CartItem.scss';
import close from '../../images/icons/close.svg';
import closeDark from '../../images/icons/close_cart_dark.svg';
import plus from '../../images/icons/plus.svg';
import plusDark from '../../images/icons/plus_dark.svg';
import minus from '../../images/icons/minus.svg';
import minusDark from '../../images/icons/minus_dark.svg';
import minusDisabled from '../../images/icons/minus_default.svg';
import minusDisabledDark from '../../images/icons/minus_disable_dark.svg';
import { useAppDispath, useAppSelector } from '../../hooks/hooks';
import { decrement, increment, removeFromCart } from '../../features/cart';
import { UpdatedProduct } from '../../types/UpdatedProduct';
import React, { useState } from 'react';
import classNames from 'classnames';

type Props = {
  product: UpdatedProduct;
};

export const CartItem: React.FC<Props> = React.memo(({ product }) => {
  const [price, setPrice] = useState<number>(product.price * product.quantity);
  const dispatch = useAppDispath();
  const { theme } = useAppSelector(state => state.theme);

  const handlePlus = (prodId: number) => {
    dispatch(increment(prodId));
    setPrice(prev => prev + product.price);
  };

  const handleMinus = (prodId: number) => {
    if (product.quantity === 1) {
      return;
    } else {
      setPrice(prev => prev - product.price);
    }

    dispatch(decrement(prodId));
  };

  return (
    <div className="cartItem">
      <div className="cartItem__blockPhoto">
        <div
          className="cartItem__blockPhoto--close"
          onClick={() => dispatch(removeFromCart(product.id))}
        >
          <img src={theme === 'light-theme' ? close : closeDark} alt="Close" />
        </div>

        <div className="cartItem__blockPhoto--image">
          <img
            src={product.image}
            alt={product.name}
            className="cartItem__blockPhoto--image_img"
          />
        </div>

        <p className="cartItem__blockPhoto--title">{product.name}</p>
      </div>

      <div className="cartItem__blockInfo">
        <div className="count cartItem__blockInfo--count">
          <div
            className={classNames('count__button count__button-left', {
              'count__button-left-disabled': product.quantity === 1,
            })}
            onClick={() => handleMinus(product.id)}
          >
            <img
              src={
                product.quantity === 1
                  ? theme === 'light-theme'
                    ? minusDisabled
                    : minusDisabledDark
                  : theme === 'light-theme'
                    ? minus
                    : minusDark
              }
              alt="Minus"
              className="count__button_minus"
            />
          </div>

          <div className="count__info">{product.quantity}</div>

          <div className="count__button" onClick={() => handlePlus(product.id)}>
            <img
              src={theme === 'light-theme' ? plus : plusDark}
              alt="Plus"
              className="count__button_plus"
            />
          </div>
        </div>
        <div className="cartItem__blockInfo--price">{`$${price}`}</div>
      </div>
    </div>
  );
});

CartItem.displayName = 'CartItem';
