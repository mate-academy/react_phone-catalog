import React, { FC } from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { CartInterface } from '../../constants/types';
import './_CartThumb.scss';
import {
  deleteCart,
  increaseCart,
  decreaseCart,
} from '../../store/actionCreators';

interface Props {
  phone: CartInterface;
  deleteCart: (uniqueId: string) => void;
  increaseCart: (uniqueId: string) => void;
  decreaseCart: (uniqueId: string) => void;
}

export const CartThumbTemplate: FC<Props> = (props) => {
  const {
    id,
    amount,
    imgLink,
    price,
  } = props.phone;

  const {
    deleteCart: deleteCartTemplate,
    decreaseCart: decreaseCartTemplate,
    increaseCart: increaseCartTemplate,
  } = props;

  const handleDelete = (uniqueId: string) => {
    deleteCartTemplate(uniqueId);
  };

  const handleIncrease = (uniqueId: string) => {
    increaseCartTemplate(uniqueId);
  };

  const handleDecrease = (uniqueId: string) => {
    decreaseCartTemplate(uniqueId);
  };

  return (
    <div className="cartThumb">
      <button
        type="button"
        className="cartThumb__btn-delete"
        onClick={() => {
          handleDelete(id);
        }}
      />
      <img src={imgLink} alt="" className="cartThumb__img" />
      <Link to={`/phones/${id}`}>
        <h3 className="cartThumb__title">{id}</h3>
      </Link>
      <div className="cartThumb__controls">
        <button
          onClick={() => handleDecrease(id)}
          disabled={amount === 1}
          type="button"
          className={cx('cartThumb__btn cartThumb__btn--decrease',
            {
              'cartThumb__btn--decrease--active': amount > 1,
            })}
        />
        <span className="cartThumb__amount">{amount}</span>
        <button
          onClick={() => handleIncrease(id)}
          type="button"
          className="cartThumb__btn cartThumb__btn--increase"
        />
      </div>
      <span className="cartThumb__price">
        $
        {price * amount}
      </span>
    </div>
  );
};

const mapDispatchToProps = {
  deleteCart,
  decreaseCart,
  increaseCart,
};

export const CartThumb = connect(null, mapDispatchToProps)(CartThumbTemplate);
