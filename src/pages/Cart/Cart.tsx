import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getCartGoods } from '../../store';
import { CartCard } from '../../components/CartCard';
import { Back } from './../../components/Back';

export const Cart = () => {
  const cartGoods: cartGood[] = useSelector(getCartGoods);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    if(!cartGoods.length) {
      setTotalPrice(0);
    } else {
    const newTotalPrice = cartGoods.map(good => good.price*good.count).reduce((accum, current) => accum + current);
    setTotalPrice(newTotalPrice);
    }
  }, [cartGoods.length, cartGoods])
  return (
    <>
      {cartGoods.length ? (
      <div className="cart">
        <Back />
        <h1 className="cart__title">Cart</h1>
        <div className="cart__container">
          <div className="cart__products">
              {cartGoods.map((good:cartGood) => {
                return (
                <CartCard good={good} key={good.id} />
                )
              }
            )}
          </div>
          <div className="cart__total">
            <div className="cart__total-data">
            <p className="cart__total-price">{`$ ${totalPrice}`}</p>
              <p className="cart__total-count">{`Total for ${cartGoods.length} Items`}</p>
            </div>
            <div className="cart__total-btn">
              <button className="cart__buy-btn" type="button">
                <a className="cart__buy-link" href="https://www.portmone.com.ua/r3/perevod" >
                  Checkout
                </a>
              </button>
            </div>
          </div>
        </div>
      </div>)
      : <span className="cart__empty">Cart is empty</span>}
    </>
  )
}
