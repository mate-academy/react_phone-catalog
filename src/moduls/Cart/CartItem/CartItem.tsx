/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
import { useContext, useEffect, useState } from 'react';
import cn from 'classnames';

import { Accessorie } from '../../../types/accessories';
import { Phone } from '../../../types/phone';
import { Tablet } from '../../../types/tablets';

import './CartItem.scss';
import { DispatchContext, StateContext } from '../../../context/ContextReducer';

interface Props {
  device: Phone | Tablet | Accessorie;
}

export const CartItem: React.FC<Props> = ({ device }) => {
  const { images, name, priceDiscount } = device;

  const { allPrices, totalCartItem, darkThem } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const [countCartDevice, setCountCartDevice] = useState<(Phone | Tablet | Accessorie)[]>([device]);

  const MAX_ITEM = 5;

  useEffect(() => {
    if (!totalCartItem) {
      dispatch({ type: 'incrementCartItem' });
    }

    if (!allPrices) {
      dispatch({
        type: 'addPrices',
        payload: priceDiscount,
      });
    }
  }, []);

  const handleCliclIncrement = () => {
    dispatch({ type: 'incrementCartItem' });

    dispatch({
      type: 'addPrices',
      payload: priceDiscount,
    });

    setCountCartDevice([...countCartDevice, device]);
  };

  const handleClickDecrement = () => {
    dispatch({ type: 'decrementCartItem' });

    dispatch({ type: 'decrementPrice', payload: priceDiscount });

    setCountCartDevice(countCartDevice.slice(0, countCartDevice.length - 1));
  };

  const handleClickDeleteItem = () => {
    dispatch({ type: 'decrementCartItem', payload: countCartDevice.length });

    dispatch({
      type: 'decrementPrice',
      payload: device.priceDiscount * countCartDevice.length,
    });

    dispatch({ type: 'deleteCartItem', payload: device.id });
  };

  return (
    <div className={cn('CartItem', { dark: darkThem })}>
      <div className="CartItem__top">
        <button
          onClick={handleClickDeleteItem}
          className={cn('CartItem__top__icon-close', { dark: darkThem })}
        ></button>

        <div className="CartItem__top__img">
          <img className="CartItem__img" src={`https://olehmarushchak.github.io/react_phone-catalog/${images[0]}`} alt="img" />
        </div>

        <div className="CartItem__top__name">{name}</div>
      </div>

      <div className="CartItem__bottom">
        <div className="CartItem__bottom__buttons">
          <button
            disabled={countCartDevice.length === 1}
            onClick={handleClickDecrement}
            className={cn(
              'CartItem__bottom__buttons__button CartItem__bottom__buttons__button--decrement',
              { disable: countCartDevice.length === 1, dark: darkThem },
            )}
          ></button>

          <p className="CartItem__bottom__count">{countCartDevice.length}</p>

          <button
            disabled={countCartDevice.length === MAX_ITEM}
            onClick={handleCliclIncrement}
            className={cn(
              'CartItem__bottom__buttons__button CartItem__bottom__buttons__button--increment',
              { disable: countCartDevice.length === MAX_ITEM, dark: darkThem },
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
