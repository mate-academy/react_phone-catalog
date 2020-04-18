import React, { FC, useState, useCallback } from 'react';
import { connect } from 'react-redux';

import {
  deleteCartId as deleteCartIdStore,
  setPriceToAmount as setPriceToAmountStore,
  setQuantityToTotal as setQuantityToTotalStore,
} from '../../store/store';

import { MAIN_URL } from '../../utils/constants';

interface Props {
  phone: PhonesWithDetails;
}

interface DispatchProps {
  deleteCartId: (value: string) => void;
  setPriceToAmount: (value: number) => void;
  setQuantityToTotal: (value: number) => void;
}

export const CartPhoneCardTemplate: FC<Props & DispatchProps> = ({
  phone, deleteCartId, setPriceToAmount, setQuantityToTotal,
}) => {
  const [quantity, setQuantity] = useState(1);

  const decreaseQuantity = useCallback(
    () => {
      setQuantity(quantity - 1);
      setPriceToAmount(-phone.priceDiscount);
      setQuantityToTotal(-1);
    },
    [phone, quantity, setPriceToAmount, setQuantityToTotal],
  );

  const increaseQuantity = useCallback(
    () => {
      setQuantity(quantity + 1);
      setPriceToAmount(phone.priceDiscount);
      setQuantityToTotal(1);
    },
    [quantity, phone, setPriceToAmount, setQuantityToTotal],
  );

  return (
    <div key={phone.id} className="cart__phones-item">
      <button
        type="button"
        className="destroy cart__phones-button-delete"
        aria-label="Delete"
        onClick={() => {
          deleteCartId(phone.phoneId);
          setPriceToAmount(-(quantity * phone.priceDiscount));
          setQuantityToTotal(-quantity);
        }}
      />
      <img
        src={`${MAIN_URL}${phone.image}`}
        alt="phone_img"
        className="cart__phones-image"
      />
      <p className="cart__phones-name">
        {phone.name}
      </p>
      <button
        type="button"
        className="cart__button-quantity button-decrease"
        onClick={decreaseQuantity}
        disabled={quantity === 1}
      >
        -
      </button>
      <span className="cart__phones-quantity">
        {quantity}
      </span>
      <button
        type="button"
        className="cart__button-quantity button-increase"
        onClick={increaseQuantity}
      >
        +
      </button>
      <p className="cart__phones-price">
        {`$${phone.priceDiscount * quantity}`}
      </p>
    </div>
  );
};

const mapDispatchToProps = {
  deleteCartId: deleteCartIdStore,
  setPriceToAmount: setPriceToAmountStore,
  setQuantityToTotal: setQuantityToTotalStore,
};

export const CartPhoneCard = connect(
  null, mapDispatchToProps,
)(CartPhoneCardTemplate);
