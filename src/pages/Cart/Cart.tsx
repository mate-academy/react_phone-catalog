import React, { useContext, useEffect, useState } from 'react';
import { CartCard } from '../../components/CartCard';
import { CartContext } from './../../components/CartContext';

export const Cart = () => {
  const { selectedGoods } = useContext(CartContext);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  console.log(selectedGoods.length)

  useEffect(() => {
    if(!selectedGoods.length) {
      setTotalPrice(0);
    } else {
    const newTotalPrice = selectedGoods.map(good => good.price).reduce((accum, current) => accum + current);
    setTotalPrice(newTotalPrice);
    }
  }, [selectedGoods.length, selectedGoods])
  return (
    <>
      <div className="cart">

        <h1 className="cart__title">Cart</h1>

        <div className="cart__container">
          <div className="cart__products">
              {selectedGoods.map((good:Good) => {
                return (
                <CartCard good={good} key={good.id} />
                )
              }
            )}
          </div>
          <div className="cart__total">
            <div className="cart__total-data">
            <p className="cart__total-price">{`$ ${totalPrice}`}</p>
              <p className="cart__total-count">{`Total for ${selectedGoods.length} Items`}</p>
            </div>
            <div className="cart__total-btn">
              <button type="button" className="cart__buy-btn">Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
