import React, { FC } from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { CartInterface } from '../../constants/types';
import './_CartCard.scss';
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

export const CartCard: FC<Props> = (props) => {
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
    <div className="cartCard">
      <button
        type="button"
        className="cartCard__btn-delete"
        onClick={() => {
          handleDelete(id);
        }}
      />
      <img src={imgLink} alt="" className="cartCard__img" />
      <Link to={`/phones/${id}`} className="cartCard__link">
        <h3 className="cartCard__title">{id}</h3>
      </Link>
      <div className="cartCard__controls">
        <button
          onClick={() => handleDecrease(id)}
          disabled={amount === 1}
          type="button"
          className={cx('cartCard__btn cartCard__btn--decrease',
            {
              'cartCard__btn--decrease--active': amount > 1,
            })}
        />
        <span className="cartCard__amount">{amount}</span>
        <button
          onClick={() => handleIncrease(id)}
          type="button"
          className="cartCard__btn cartCard__btn--increase"
        />
      </div>
      <span className="cartCard__price">
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

export default connect(null, mapDispatchToProps)(CartCard);
