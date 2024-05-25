/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
import { useContext } from 'react';
import cn from 'classnames';

import { Accessorie } from '../../../types/accessories';
import { Phone } from '../../../types/phone';
import { Tablet } from '../../../types/tablets';

import './CartItem.scss';
import { DispatchContext, StateContext } from '../../../context/ContextReducer';
import { findCountId } from '../../../utils/findCountId';

interface Props {
  device: Phone | Tablet | Accessorie;
}

export const CartItem: React.FC<Props> = ({ device }) => {
  const { images, name, priceDiscount } = device;

  const { darkThem, cartPhone } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const MAX_ITEM = 5;

  const handleCliclIncrement = () => {
    dispatch({ type: 'addItemCart', payload: device });
  };

  const handleClickDecrement = () => {
    dispatch({ type: 'removeProductById', payload: device.id });
  };

  const handleClickDeleteItem = () => {
    dispatch({ type: 'deleteCartItem', payload: device.id });
  };

  const countItem = findCountId(cartPhone, device.id);

  return (
    <div className={cn('CartItem', { dark: darkThem })}>
      <div className="CartItem__top">
        <button
          onClick={handleClickDeleteItem}
          className={cn('CartItem__top__icon-close', { dark: darkThem })}
        ></button>

        <div className="CartItem__top__img">
          <img
            className="CartItem__img"
            src={`https://olehmarushchak.github.io/react_phone-catalog/${images[0]}`}
            alt="img"
          />
        </div>

        <div className="CartItem__top__name">{name}</div>
      </div>

      <div className="CartItem__bottom">
        <div className="CartItem__bottom__buttons">
          <button
            disabled={countItem === 1}
            onClick={handleClickDecrement}
            className={cn(
              'CartItem__bottom__buttons__button CartItem__bottom__buttons__button--decrement',
              { disable: countItem === 1, dark: darkThem },
            )}
          ></button>

          <p className="CartItem__bottom__count">{countItem}</p>

          <button
            disabled={countItem === MAX_ITEM}
            onClick={handleCliclIncrement}
            className={cn(
              'CartItem__bottom__buttons__button CartItem__bottom__buttons__button--increment',
              { disable: countItem === MAX_ITEM, dark: darkThem },
            )}
          ></button>
        </div>

        <p
          className={cn('CartItem__bottom__price', { dark: darkThem })}
        >{`$${priceDiscount}`}</p>
      </div>
    </div>
  );
};
