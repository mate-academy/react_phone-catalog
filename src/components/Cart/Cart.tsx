import React, { Dispatch, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CartItem from './CartItem/CartItem';
import './Cart.scss';
import ButtonBack from '../button-back/ButtonBack';
import { cartItem } from '../../store/fullStore/store';
import EmptyStorage from '../EmptyStorage/EmptyStorage';
import ModalWindowCart from './ModalWindowCart/ModalWindowCart';
import { AllAction, clearCart } from '../../store/cartStore/cartStore';

const Cart = () => {
  const cartItems = useSelector(cartItem);
  const dispatch = useDispatch<Dispatch<AllAction>>();
  const [isCheckOut, setCheckOutStatus] = useState<boolean>(false);

  console.log(isCheckOut);

  return (
    <div className="cart">
      {isCheckOut && <ModalWindowCart />}
      <div className="cart__button-back">
        <ButtonBack />
      </div>
      {(cartItems.length > 0)
        ? (
          <>
            <h1 className="cart__header">
              Cart
            </h1>
            <div className="cart__information">
              <div className="cart__items-wrapper">
                {cartItems.map(item => (
                  <div className="cart__items">
                    <CartItem
                      id={item.id}
                      imgUrl={item.imageUrl}
                      name={item.name}
                      count={item.count}
                      price={item.price}
                      discount={item.discount}
                    />
                  </div>
                ))}
              </div>
              <div className="cart__checkout-wrapper">
                <div>
                  <div className="cart__checkout-price">
                    {`$${cartItems.map(item => (
                      (item.price - (item.price * (item.discount / 100))) * (item.count || 1)
                    ))
                      .reduce((total, currentValue) => (total + currentValue)) || 0}`}
                  </div>
                  <div className="cart__checkout-items">
                    {`Total for ${cartItems.length} items`}
                  </div>
                </div>
                <div className="cart__checkout-split-line" />
                <button
                  type="button"
                  className="cart__checkout-button"
                  onClick={() => {
                    setCheckOutStatus(true);
                    dispatch(clearCart());
                  }}
                >
                  Checkout
                </button>
              </div>
            </div>
          </>
        )
        : <EmptyStorage />}
    </div>
  );
};

export default Cart;
