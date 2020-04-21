import React, { FC, useState, useCallback } from 'react';
import { connect } from 'react-redux';

import {
  deleteCartId as deleteCartIdStore,
  setPriceToAmount as setPriceToAmountStore,
  setQuantityToTotal as setQuantityToTotalStore,
  setCartId as setCartIdStore,
} from '../../store/ActionCreators';

import { MAIN_URL } from '../../utils/constants';

interface Props {
  phone: PhonesWithDetails;
  phonesCart: Cart;
  phoneQuantity: number;
}

interface DispatchProps {
  deleteCartId: (value: Cart) => void;
  setPriceToAmount: (value: number) => void;
  setQuantityToTotal: (value: number) => void;
  setCartId: (value: PhoneCartInfo) => void;
}

export const CartPhoneCardTemplate: FC<Props & DispatchProps> = ({
  phone,
  phonesCart,
  phoneQuantity,
  deleteCartId,
  setPriceToAmount,
  setQuantityToTotal,
  setCartId,
}) => {
  const [quantity, setQuantity] = useState(phoneQuantity);

  const decreaseQuantity = useCallback(
    () => {
      setQuantity(quantity - 1);
      setPriceToAmount(-phone.priceDiscount);
      setQuantityToTotal(-1);
      setCartId({
        id: phone.phoneId,
        quantity: quantity - 1,
      });
    },
    [phone, quantity, setPriceToAmount, setQuantityToTotal, setCartId],
  );

  const increaseQuantity = useCallback(
    () => {
      setQuantity(quantity + 1);
      setPriceToAmount(phone.priceDiscount);
      setQuantityToTotal(1);
      setCartId({
        id: phone.phoneId,
        quantity: quantity + 1,
      });
    },
    [quantity, phone, setPriceToAmount, setQuantityToTotal, setCartId],
  );

  const deletePhoneFromCart = useCallback(
    () => {
      const newCart = { ...phonesCart };

      delete newCart[phone.phoneId];

      deleteCartId(newCart);
      setPriceToAmount(-(quantity * phone.priceDiscount));
      setQuantityToTotal(-quantity);
    },
    [
      quantity,
      phone,
      phonesCart,
      deleteCartId,
      setPriceToAmount,
      setQuantityToTotal,
    ],
  );

  return (
    <div className="cart__phones-item">
      <button
        type="button"
        className="destroy cart__phones-button-delete"
        aria-label="Delete"
        onClick={deletePhoneFromCart}
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
  setCartId: setCartIdStore,
};

export const CartPhoneCard = connect(
  null, mapDispatchToProps,
)(CartPhoneCardTemplate);
