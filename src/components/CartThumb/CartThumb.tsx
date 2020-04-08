import React, { FC } from 'react';
import { PhoneInterface } from '../../constants/types';
import './_CartThumb.scss';

interface Props {
  // amount: number;
  phone: PhoneInterface;
  // increase: () => void;
  // decerase: () => void;
}

export const CartThumb: FC<Props> = (props) => {
  const { phone } = props;

  return (
    <div className="cartThumb">
      <button type="button" className="cartThumb__btn-delete">X</button>
      <img src="" alt="" className="cartThumb__img" />
      <h3 className="cartThumb__title">{phone.name}</h3>
      <div className="cartThumb__controls">
        <button
          type="button"
          className="cartThumb__btn cartThumb__btn--decrease"
        >
          -
        </button>
        <span className="cartThumb__amount">0</span>
        <button
          type="button"
          className="cartThumb__btn cartThumb__btn--increase"
        >
          +
        </button>
      </div>
      <span className="cartThumb__price">1000</span>
    </div>
  );
};
